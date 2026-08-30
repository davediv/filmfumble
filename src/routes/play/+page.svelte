<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import GameRound from '$lib/components/GameRound.svelte';
	import LoadingSkeleton from '$lib/components/LoadingSkeleton.svelte';
	import {
		answerCurrentRound,
		completeGameSession,
		createGameSession,
		failGameSession,
		hasReachedRoundLimit,
		prepareNextRound,
		receiveRound,
		restartContentCycle,
		requestRound
	} from '$lib/domain/gameSession';
	import {
		clearGameSession,
		loadGameSession,
		saveGameSession,
		saveGameSettings
	} from '$lib/services/sessionPersistence';
	import type { ApiResponse, GameSession } from '$lib/types/index';

	let session = $state<GameSession>(createGameSession());
	let ready = $state(false);
	let allowNavigation = false;
	let preloadedRound = $state<ApiResponse | null>(null);
	let preloadedRoundPromise: Promise<ApiResponse | null> | null = null;

	function hasActiveProgress(): boolean {
		return ready && !['start', 'ended'].includes(session.phase) && session.roundNumber > 0;
	}

	function setSession(nextSession: GameSession) {
		session = nextSession;
		saveGameSession(window.sessionStorage, session);
	}

	beforeNavigate(({ to, cancel }) => {
		if (allowNavigation || !hasActiveProgress() || to?.url.pathname === resolve('/results')) return;
		if (!window.confirm('Leave this game? Your progress is saved and can be resumed.')) cancel();
	});

	onMount(() => {
		const restored = loadGameSession(window.sessionStorage);
		if (!restored) {
			allowNavigation = true;
			void goto(resolve('/'));
			return;
		}
		if (restored.phase === 'ended') {
			allowNavigation = true;
			void goto(resolve('/results'));
			return;
		}

		session = restored;
		ready = true;
		if (session.phase === 'loading') void fetchRound();

		function protectUnload(event: BeforeUnloadEvent) {
			if (!hasActiveProgress()) return;
			event.preventDefault();
		}

		window.addEventListener('beforeunload', protectUnload);
		return () => window.removeEventListener('beforeunload', protectUnload);
	});

	function fetchRoundApi(): Promise<Response> {
		return fetch('/api/round', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				usedMovieIds: session.usedMovieIds,
				contentPreset: session.settings.contentPreset
			})
		});
	}

	function preloadRound() {
		const request = fetchRoundApi()
			.then(async (response) => (response.ok ? ((await response.json()) as ApiResponse) : null))
			.catch(() => null);

		preloadedRound = null;
		preloadedRoundPromise = request;
		void request.then((data) => {
			if (preloadedRoundPromise === request) preloadedRound = data;
		});
	}

	async function showResults(nextSession: GameSession) {
		setSession(nextSession);
		allowNavigation = true;
		await goto(resolve('/results'));
	}

	async function fetchRound() {
		setSession(requestRound(session));
		try {
			const response = await fetchRoundApi();

			if (!response.ok) {
				if (response.status === 503) {
					if (session.settings.roundLimit === null && session.history.length > 0) {
						setSession(restartContentCycle(session));
						await fetchRound();
						return;
					}
					await showResults(completeGameSession(session));
					return;
				}
				throw new Error(`API error: ${response.status}`);
			}

			setSession(receiveRound(session, (await response.json()) as ApiResponse));
		} catch {
			setSession(failGameSession(session, 'network'));
		}
	}

	function handleAnswer(index: number) {
		const answeredSession = answerCurrentRound(session, index);
		if (answeredSession === session) return;

		setSession(answeredSession);
		if (!hasReachedRoundLimit(session)) preloadRound();
	}

	async function handleNext() {
		const nextSession = prepareNextRound(session);
		if (nextSession === session) return;
		if (nextSession.phase === 'ended') {
			preloadedRound = null;
			preloadedRoundPromise = null;
			await showResults(nextSession);
			return;
		}
		setSession(nextSession);

		const pendingRound = preloadedRoundPromise;
		if (!preloadedRound && pendingRound) preloadedRound = await pendingRound;

		const nextRound = preloadedRound;
		preloadedRound = null;
		preloadedRoundPromise = null;

		if (nextRound && !session.usedMovieIds.includes(nextRound.movieId)) {
			setSession(receiveRound(session, nextRound));
			return;
		}

		await fetchRound();
	}

	async function handleEndGame() {
		if (!window.confirm('End this game and see your results?')) return;
		preloadedRound = null;
		preloadedRoundPromise = null;
		await showResults(completeGameSession(session));
	}

	async function handleStartOver() {
		if (!window.confirm('Start over? Your current score will be cleared.')) return;
		saveGameSettings(window.sessionStorage, session.settings);
		clearGameSession(window.sessionStorage);
		allowNavigation = true;
		await goto(resolve('/'));
	}
</script>

<svelte:head>
	<title>Playing — FilmFumble</title>
</svelte:head>

{#if !ready || session.phase === 'loading'}
	<LoadingSkeleton />
{:else if session.phase === 'error' && session.errorType}
	<ErrorState errorType={session.errorType} onRetry={fetchRound} onPlayAgain={handleStartOver} />
{:else if session.phase === 'playing' || session.phase === 'feedback'}
	<GameRound
		roundData={session.currentRound}
		score={session.score}
		roundNumber={session.roundNumber}
		roundLimit={session.settings.roundLimit}
		selectedIndex={session.selectedIndex}
		onAnswer={handleAnswer}
		onEndGame={handleEndGame}
		feedback={session.phase === 'feedback'
			? {
					correct: session.selectedIndex === session.currentRound.correctIndex,
					correctTitle:
						session.currentRound.correctIndex !== null
							? (session.currentRound.options[session.currentRound.correctIndex]?.title ?? '')
							: '',
					isFinalRound: hasReachedRoundLimit(session),
					onNext: handleNext
				}
			: null}
	/>
{/if}
