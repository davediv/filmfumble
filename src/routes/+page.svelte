<script lang="ts">
	import StartScreen from '$lib/components/StartScreen.svelte';
	import GameRound from '$lib/components/GameRound.svelte';
	import FeedbackOverlay from '$lib/components/FeedbackOverlay.svelte';
	import LoadingSkeleton from '$lib/components/LoadingSkeleton.svelte';
	import type { RoundData, ErrorType, ApiResponse } from '$lib/types/index';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import ScoreSummary from '$lib/components/ScoreSummary.svelte';

	type Phase = 'start' | 'loading' | 'playing' | 'feedback' | 'ended' | 'error';

	let phase = $state<Phase>('start');
	let score = $state(0);
	let roundNumber = $state(0);
	let usedMovieIds = $state<string[]>([]);
	let selectedIndex = $state<number | null>(null);
	let roundData = $state<RoundData>({ description: '', options: [], correctIndex: null });
	let errorType = $state<ErrorType | null>(null);
	let preloadedRound = $state<ApiResponse | null>(null);

	function fetchRoundApi(): Promise<Response> {
		return fetch('/api/round', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ usedMovieIds })
		});
	}

	async function preloadRound() {
		try {
			const res = await fetchRoundApi();
			if (res.ok) {
				preloadedRound = (await res.json()) as ApiResponse;
			}
		} catch {
			// Swallow — handleNext will fall back to fetchRound
		}
	}

	function resetState() {
		score = 0;
		roundNumber = 0;
		usedMovieIds = [];
		selectedIndex = null;
		roundData = { description: '', options: [], correctIndex: null };
		errorType = null;
		preloadedRound = null;
	}

	async function startGame() {
		resetState();
		phase = 'loading';
		roundNumber = 1;
		await fetchRound();
	}

	function applyRoundData(data: ApiResponse) {
		roundData = {
			description: data.description,
			options: data.options,
			correctIndex: data.correctIndex
		};
		usedMovieIds = [...usedMovieIds, data.movieId];
		phase = 'playing';
		selectedIndex = null;
	}

	async function fetchRound() {
		errorType = null;
		phase = 'loading';
		try {
			const res = await fetchRoundApi();

			if (!res.ok) {
				if (res.status === 503) {
					roundNumber = Math.max(0, roundNumber - 1);
					errorType = 'exhausted';
					phase = 'ended';
					return;
				}
				throw new Error(`API error: ${res.status}`);
			}

			const data = (await res.json()) as ApiResponse;
			applyRoundData(data);
		} catch {
			errorType = 'network';
			phase = 'error';
		}
	}

	function handleAnswer(index: number) {
		if (phase !== 'playing') return;
		selectedIndex = index;
		if (index === roundData.correctIndex) {
			score += 1;
		}
		phase = 'feedback';
		preloadRound();
	}

	async function handleNext() {
		if (preloadedRound && !usedMovieIds.includes(preloadedRound.movieId)) {
			roundNumber += 1;
			errorType = null;
			applyRoundData(preloadedRound);
			preloadedRound = null;
		} else {
			preloadedRound = null;
			roundNumber += 1;
			await fetchRound();
		}
	}

	function handlePlayAgain() {
		resetState();
		phase = 'start';
	}
</script>

<svelte:head>
	<title>FilmFumble</title>
	<meta name="description" content="Guess the movie from the world's worst description" />
</svelte:head>

{#if phase === 'start'}
	<StartScreen onStart={startGame} />
{:else if phase === 'loading'}
	<LoadingSkeleton />
{:else if phase === 'error' && errorType}
	<ErrorState {errorType} onRetry={fetchRound} onPlayAgain={handlePlayAgain} />
{:else if phase === 'playing' || phase === 'feedback'}
	<GameRound {roundData} {score} {roundNumber} {selectedIndex} onAnswer={handleAnswer} />
	{#if phase === 'feedback'}
		<FeedbackOverlay
			correct={selectedIndex === roundData.correctIndex}
			correctTitle={roundData.correctIndex !== null
				? (roundData.options[roundData.correctIndex] ?? '')
				: ''}
			onNext={handleNext}
		/>
	{/if}
{:else if phase === 'ended'}
	<ScoreSummary {score} {roundNumber} onPlayAgain={handlePlayAgain} />
{/if}
