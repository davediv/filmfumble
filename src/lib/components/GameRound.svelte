<script lang="ts">
	import type { RoundData } from '$lib/types/index';
	import ScoreBar from './ScoreBar.svelte';
	import AnswerButton from './AnswerButton.svelte';

	interface Props {
		roundData: RoundData;
		score: number;
		roundNumber: number;
		selectedIndex: number | null;
		correctIndex: number | null;
		onAnswer: (index: number) => void;
	}

	let { roundData, score, roundNumber, selectedIndex, correctIndex, onAnswer }: Props = $props();

	const revealCorrect = selectedIndex !== null;
</script>

<div class="flex min-h-screen flex-col px-4 py-6">
	<ScoreBar {score} round={roundNumber} />

	<div class="my-8 flex flex-1 items-center justify-center">
		<p class="text-center text-2xl leading-relaxed font-medium" role="status" aria-live="polite">
			{roundData.description}
		</p>
	</div>

	<div class="grid grid-rows-4 gap-3">
		{#each roundData.options as option, i (i)}
			{@const isCorrect = i === correctIndex}
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
