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
	let correctIndex = $state<number | null>(null);
	let currentDescription = $state('');
	let currentOptions = $state<string[]>([]);
	let errorType = $state<ErrorType | null>(null);
	let preloadedRound = $state<ApiResponse | null>(null);

	async function preloadRound() {
		try {
			const res = await fetch('/api/round', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ usedMovieIds })
			});
			if (res.ok) {
				preloadedRound = (await res.json()) as ApiResponse;
			}
		} catch {
			// Swallow — handleNext will fall back to fetchRound
		}
	}

	async function startGame() {
		phase = 'loading';
		roundNumber = 1;
		score = 0;
		usedMovieIds = [];
		preloadedRound = null;
		await fetchRound();
	}

	function applyRoundData(data: ApiResponse) {
		currentDescription = data.description;
		currentOptions = data.options;
		correctIndex = data.correctIndex;
		usedMovieIds = [...usedMovieIds, data.movieId];
		phase = 'playing';
		selectedIndex = null;
	}

	async function fetchRound() {
		errorType = null;
		try {
			const res = await fetch('/api/round', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ usedMovieIds })
			});

			if (!res.ok) {
				if (res.status === 503) {
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
		if (index === correctIndex) {
			score += 1;
		}
		phase = 'feedback';
		preloadRound();
	}

	async function handleNext() {
		roundNumber += 1;
		if (preloadedRound && !usedMovieIds.includes(preloadedRound.movieId)) {
			errorType = null;
			applyRoundData(preloadedRound);
			preloadedRound = null;
		} else {
			preloadedRound = null;
			phase = 'loading';
			await fetchRound();
		}
	}

	function handlePlayAgain() {
		phase = 'start';
		errorType = null;
		score = 0;
		roundNumber = 0;
		usedMovieIds = [];
		preloadedRound = null;
	}

	const roundData = $derived<RoundData>({
		description: currentDescription,
		options: currentOptions,
		correctIndex
	});
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
{:else if phase === 'playing'}
	<GameRound
		{roundData}
		{score}
		{roundNumber}
		{selectedIndex}
		{correctIndex}
		onAnswer={handleAnswer}
	/>
{:else if phase === 'feedback'}
	<GameRound {roundData} {score} {roundNumber} {selectedIndex} {correctIndex} onAnswer={() => {}} />
	<FeedbackOverlay
		correct={selectedIndex === correctIndex}
		correctTitle={correctIndex !== null ? (currentOptions[correctIndex] ?? '') : ''}
		onNext={handleNext}
	/>
{:else if phase === 'ended'}
	<ScoreSummary {score} {roundNumber} onPlayAgain={handlePlayAgain} />
{/if}
