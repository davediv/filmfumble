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

<div class="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
	<ScoreBar {score} round={roundNumber} />

	<div class="my-6 flex flex-1 items-center justify-center sm:my-8">
		<div class="max-w-2xl px-4">
			<div class="mx-auto mb-4 h-px w-8 bg-gold/20"></div>
			<p
				class="text-center text-lg leading-relaxed font-light tracking-wide sm:text-xl md:text-2xl"
				role="status"
				aria-live="polite"
			>
				{roundData.description}
			</p>
			<div class="mx-auto mt-4 h-px w-8 bg-gold/20"></div>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
		{#each roundData.options as option, i (i)}
			{@const isCorrect = i === roundData.correctIndex}
			{@const isSelected = i === selectedIndex}
			<AnswerButton
				title={option.title}
				posterPath={option.posterPath}
				index={i}
				buttonState={revealCorrect
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
