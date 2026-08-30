<script lang="ts">
	import type { ClueReportReason, RoundData } from '$lib/types/index';
	import ScoreBar from './ScoreBar.svelte';
	import AnswerButton from './AnswerButton.svelte';
	import RoundFeedback from './RoundFeedback.svelte';

	interface FeedbackData {
		outcome: 'correct' | 'incorrect' | 'skipped';
		correctTitle: string;
		isFinalRound: boolean;
		onNext: () => void | Promise<void>;
		onReport: (reason: ClueReportReason) => Promise<boolean>;
	}

	interface Props {
		roundData: RoundData;
		score: number;
		roundNumber: number;
		roundLimit: number | null;
		selectedIndex: number | null;
		onAnswer: (index: number) => void;
		onSkip: () => void;
		onEndGame: () => void;
		feedback: FeedbackData | null;
	}

	let {
		roundData,
		score,
		roundNumber,
		roundLimit,
		selectedIndex,
		onAnswer,
		onSkip,
		onEndGame,
		feedback
	}: Props = $props();

	const revealCorrect = $derived(feedback !== null);
</script>

<div class="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
	<ScoreBar {score} round={roundNumber} {roundLimit} {onEndGame} />

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

	<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
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
				disabled={revealCorrect}
				onclick={() => onAnswer(i)}
			/>
		{/each}
	</div>

	{#if !feedback}
		<button
			class="mx-auto mt-3 min-h-11 px-4 text-xs tracking-[0.12em] text-muted-foreground uppercase outline-none hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
			type="button"
			onclick={onSkip}
		>
			Skip this clue
		</button>
	{/if}

	{#if feedback}
		<RoundFeedback {...feedback} />
	{/if}
</div>
