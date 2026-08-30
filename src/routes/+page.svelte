<script lang="ts">
	import StartScreen from '$lib/components/StartScreen.svelte';
	import GameRound from '$lib/components/GameRound.svelte';
	import FeedbackOverlay from '$lib/components/FeedbackOverlay.svelte';
	import LoadingSkeleton from '$lib/components/LoadingSkeleton.svelte';
	import type { ApiResponse, GameSession } from '$lib/types/index';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import ScoreSummary from '$lib/components/ScoreSummary.svelte';
	import {
		answerCurrentRound,
		beginGameSession,
		completeGameSession,
		createGameSession,
		failGameSession,
		prepareNextRound,
		receiveRound,
		requestRound
	} from '$lib/domain/gameSession';

	let session = $state<GameSession>(createGameSession());
	let preloadedRound = $state<ApiResponse | null>(null);
	let preloadedRoundPromise: Promise<ApiResponse | null> | null = null;

	function fetchRoundApi(): Promise<Response> {
		return fetch('/api/round', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ usedMovieIds: session.usedMovieIds })
		});
	}

	function preloadRound() {
		const request = fetchRoundApi()
			.then(async (res) => (res.ok ? ((await res.json()) as ApiResponse) : null))
			.catch(() => null);

		preloadedRound = null;
		preloadedRoundPromise = request;
		void request.then((data) => {
			if (preloadedRoundPromise === request) {
				preloadedRound = data;
			}
		});
	}

	function resetState() {
		session = createGameSession(session.settings);
		preloadedRound = null;
		preloadedRoundPromise = null;
	}

	async function startGame() {
		session = beginGameSession(session.settings);
		preloadedRound = null;
		preloadedRoundPromise = null;
		await fetchRound();
	}

	function applyRoundData(data: ApiResponse) {
		session = receiveRound(session, data);
	}

	async function fetchRound() {
		session = requestRound(session);
		try {
			const res = await fetchRoundApi();

			if (!res.ok) {
				if (res.status === 503) {
					session = completeGameSession(session);
					return;
				}
				throw new Error(`API error: ${res.status}`);
			}

			const data = (await res.json()) as ApiResponse;
			applyRoundData(data);
		} catch {
			session = failGameSession(session, 'network');
		}
	}

	function handleAnswer(index: number) {
		const answeredSession = answerCurrentRound(session, index);
		if (answeredSession === session) return;

		session = answeredSession;
		preloadRound();
	}

	async function handleNext() {
		const nextSession = prepareNextRound(session);
		if (nextSession === session) return;
		session = nextSession;

		const pendingRound = preloadedRoundPromise;
		if (!preloadedRound && pendingRound) {
			preloadedRound = await pendingRound;
		}

		const nextRound = preloadedRound;
		preloadedRound = null;
		preloadedRoundPromise = null;

		if (nextRound && !session.usedMovieIds.includes(nextRound.movieId)) {
			applyRoundData(nextRound);
			return;
		}

		await fetchRound();
	}

	function handlePlayAgain() {
		resetState();
	}
</script>

<svelte:head>
	<title>FilmFumble — Guess Movies from Terrible Descriptions</title>
	<meta
		name="description"
		content="AI generates hilariously bad movie descriptions. Can you guess the film? A free browser party game."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="FilmFumble — Guess Movies from Terrible Descriptions" />
	<meta
		property="og:description"
		content="AI generates hilariously bad movie descriptions. Can you guess the film? A free browser party game."
	/>
	<meta property="og:site_name" content="FilmFumble" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="FilmFumble — Guess Movies from Terrible Descriptions" />
	<meta
		name="twitter:description"
		content="AI generates hilariously bad movie descriptions. Can you guess the film? A free browser party game."
	/>
</svelte:head>

{#if session.phase === 'start'}
	<StartScreen onStart={startGame} />
{:else if session.phase === 'loading'}
	<LoadingSkeleton />
{:else if session.phase === 'error' && session.errorType}
	<ErrorState errorType={session.errorType} onRetry={fetchRound} onPlayAgain={handlePlayAgain} />
{:else if session.phase === 'playing' || session.phase === 'feedback'}
	<GameRound
		roundData={session.currentRound}
		score={session.score}
		roundNumber={session.roundNumber}
		selectedIndex={session.selectedIndex}
		onAnswer={handleAnswer}
	/>
	{#if session.phase === 'feedback'}
		<FeedbackOverlay
			correct={session.selectedIndex === session.currentRound.correctIndex}
			correctTitle={session.currentRound.correctIndex !== null
				? (session.currentRound.options[session.currentRound.correctIndex]?.title ?? '')
				: ''}
			onNext={handleNext}
		/>
	{/if}
{:else if session.phase === 'ended'}
	<ScoreSummary
		score={session.score}
		roundNumber={session.roundNumber}
		onPlayAgain={handlePlayAgain}
	/>
{/if}
