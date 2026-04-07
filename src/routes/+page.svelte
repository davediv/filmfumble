<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import GameRound from '$lib/components/GameRound.svelte';
	import FeedbackOverlay from '$lib/components/FeedbackOverlay.svelte';
	import type { RoundData } from '$lib/types/index';

	interface ApiResponse {
		description: string;
		options: string[];
		correctIndex: number;
		movieId: string;
		usedFallback: boolean;
		error?: string;
	}

	type Phase = 'start' | 'loading' | 'playing' | 'feedback' | 'ended';

	let phase = $state<Phase>('start');
	let score = $state(0);
	let roundNumber = $state(0);
	let usedMovieIds = $state<string[]>([]);
	let selectedIndex = $state<number | null>(null);
	let correctIndex = $state<number | null>(null);
	let currentDescription = $state('');
	let currentOptions = $state<string[]>([]);
	let errorMessage = $state('');

	async function startGame() {
		phase = 'loading';
		roundNumber = 1;
		score = 0;
		usedMovieIds = [];
		await fetchRound();
	}

	async function fetchRound() {
		errorMessage = '';
		try {
			const res = await fetch('/api/round', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ usedMovieIds })
			});

			if (!res.ok) {
				if (res.status === 503) {
					const data = (await res.json()) as { error?: string };
					errorMessage = data.error ?? 'All movies used!';
					phase = 'ended';
					return;
				}
				throw new Error(`API error: ${res.status}`);
			}

			const data = (await res.json()) as ApiResponse;
			currentDescription = data.description;
			currentOptions = data.options;
			correctIndex = data.correctIndex;
			usedMovieIds = [...usedMovieIds, data.movieId];
			phase = 'playing';
			selectedIndex = null;
		} catch (err) {
			console.error('[page] fetchRound error:', err);
			errorMessage = 'The AI took a coffee break. Try again.';
			phase = 'start';
		}
	}

	function handleAnswer(index: number) {
		if (phase !== 'playing') return;
		selectedIndex = index;
		if (index === correctIndex) {
			score += 1;
		}
		phase = 'feedback';
	}

	async function handleNext() {
		roundNumber += 1;
		phase = 'loading';
		await fetchRound();
	}

	function handlePlayAgain() {
		phase = 'start';
		errorMessage = '';
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
	<div class="flex min-h-screen flex-col items-center justify-center gap-4">
		<div class="flex flex-col items-center gap-3">
			<div class="border-muted border-t-primary h-10 w-10 animate-spin rounded-full border-4"></div>
			<p class="text-muted-foreground">The AI is conjuring something terrible...</p>
		</div>
		{#if errorMessage}
			<p class="text-destructive text-sm">{errorMessage}</p>
		{/if}
	</div>
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
	<div class="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
		<div class="flex flex-col items-center gap-4 text-center">
			<h2 class="text-3xl font-bold">Game Over!</h2>
			<p class="text-muted-foreground">You scored</p>
			<p class="text-6xl font-bold">
				{score}<span class="text-muted-foreground text-2xl">/{roundNumber}</span>
			</p>
			<p class="text-muted-foreground text-sm">
				{#if score === roundNumber}
					Perfect score! The AI has nothing on you.
				{:else if score > roundNumber / 2}
					Not bad! Some terrible descriptions fool the best.
				{:else}
					The AI's terrible descriptions got the better of you.
				{/if}
			</p>
		</div>
		<div class="flex flex-col gap-3">
			<Button size="lg" onclick={handlePlayAgain}>Play Again</Button>
		</div>
	</div>
{/if}
