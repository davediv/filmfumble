<script lang="ts">
	import type { RoundData } from '$lib/types/index';
	import ScoreBar from './ScoreBar.svelte';
	import AnswerButton from './AnswerButton.svelte';

	interface Props {
		roundData: RoundData;
		score: number;
		roundNumber: number;
		selectedIndex: number | null;
		onAnswer: (index: number) => void;
	}

	let { roundData, score, roundNumber, selectedIndex, onAnswer }: Props = $props();

	const revealCorrect = $derived(selectedIndex !== null);
</script>

<div class="flex min-h-screen flex-col px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8">
	<ScoreBar {score} round={roundNumber} />

	<div class="my-6 flex flex-1 items-center justify-center sm:my-8">
		<p
			class="px-2 text-center text-lg leading-relaxed font-medium sm:text-xl md:text-2xl lg:text-3xl"
			role="status"
			aria-live="polite"
		>
			{roundData.description}
		</p>
	</div>

	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
		{#each roundData.options as option, i (i)}
			{@const isCorrect = i === roundData.correctIndex}
			{@const isSelected = i === selectedIndex}
			<AnswerButton
				title={option}
				state={revealCorrect
					? isCorrect
						? 'correct'
						: isSelected
							? 'incorrect'
							: 'default'
					: 'default'}
				disabled={selectedIndex !== null}
				onclick={() => onAnswer(i)}
			/>
		{/each}
	</div>
</div>
