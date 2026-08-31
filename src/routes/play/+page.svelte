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
		requestRound as markRoundLoading,
		skipCurrentRound
	} from '$lib/domain/gameSession';
	import {
		requestRound,
		takePrefetchedRound,
		type RoundFetchResult,
		type RoundRequestInput
	} from '$lib/services/roundClient';
	import {
		clearGameSession,
		loadGameSession,
		saveGameSession,
		saveGameSettings
	} from '$lib/services/sessionPersistence';
	import type { ClueReportReason, GameSession } from '$lib/types/index';

	let session = $state<GameSession>(createGameSession());
	let ready = $state(false);
	let allowNavigation = false;
	let preloadedRound = $state<RoundFetchResult | null>(null);
	let preloadedRoundPromise: Promise<RoundFetchResult> | null = null;

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

	function roundRequestInput(): RoundRequestInput {
		return {
			usedMovieIds: session.usedMovieIds,
			contentPreset: session.settings.contentPreset
		};
	}

	function fetchRoundResult(): Promise<RoundFetchResult> {
		const input = roundRequestInput();
		return takePrefetchedRound(input) ?? requestRound(input);
	}

	function preloadRound() {
		const request = fetchRoundResult();

		preloadedRound = null;
		preloadedRoundPromise = request;
		void request.then((result) => {
			if (preloadedRoundPromise === request) preloadedRound = result;
		});
	}

	async function showResults(nextSession: GameSession) {
		setSession(nextSession);
		allowNavigation = true;
		await goto(resolve('/results'));
	}

	async function applyRoundFetchResult(result: RoundFetchResult) {
		if (!result.ok) {
			setSession(failGameSession(session, result.errorType));
			return;
		}

		if (result.data.status === 'complete') {
			if (session.settings.roundLimit === null && session.history.length > 0) {
				setSession(restartContentCycle(session));
				await fetchRound();
				return;
			}

			await showResults(completeGameSession(session));
			return;
		}

		if (session.usedMovieIds.includes(result.data.movieId)) {
			setSession(failGameSession(session, 'invalid-response'));
			return;
		}

		setSession(receiveRound(session, result.data));
	}

	async function fetchRound() {
		setSession(markRoundLoading(session));
		await applyRoundFetchResult(await fetchRoundResult());
	}

	function handleAnswer(index: number) {
		const answeredSession = answerCurrentRound(session, index);
		if (answeredSession === session) return;

		setSession(answeredSession);
		if (!hasReachedRoundLimit(session)) preloadRound();
	}

	function handleSkip() {
		const skippedSession = skipCurrentRound(session);
		if (skippedSession === session) return;

		setSession(skippedSession);
		if (!hasReachedRoundLimit(session)) preloadRound();
	}

	async function handleReport(reason: ClueReportReason): Promise<boolean> {
		try {
			const response = await fetch('/api/report', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					sessionId: session.id,
					roundNumber: session.roundNumber,
					clueId: session.currentRound.clueId,
					movieId: session.currentRound.movieId,
					reason
				})
			});
			return response.ok;
		} catch {
			return false;
		}
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
		const nextRound = preloadedRound ?? (pendingRound ? await pendingRound : null);
		preloadedRound = null;
		preloadedRoundPromise = null;

		if (nextRound) {
			await applyRoundFetchResult(nextRound);
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
		onSkip={handleSkip}
		onEndGame={handleEndGame}
		feedback={session.phase === 'feedback'
			? {
					outcome: session.history.at(-1)?.skipped
						? 'skipped'
						: session.selectedIndex === session.currentRound.correctIndex
							? 'correct'
							: 'incorrect',
					correctTitle:
						session.currentRound.correctIndex !== null
							? (session.currentRound.options[session.currentRound.correctIndex]?.title ?? '')
							: '',
					isFinalRound: hasReachedRoundLimit(session),
					onNext: handleNext,
					onReport: handleReport
				}
			: null}
	/>
{/if}
