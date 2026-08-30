<script lang="ts">
	import { onMount } from 'svelte';
	import type { ClueReportReason } from '$lib/types/index';

	interface Props {
		outcome: 'correct' | 'incorrect' | 'skipped';
		correctTitle: string;
		isFinalRound: boolean;
		onNext: () => void | Promise<void>;
		onReport: (reason: ClueReportReason) => Promise<boolean>;
	}

	let { outcome, correctTitle, isFinalRound, onNext, onReport }: Props = $props();
	let heading: HTMLHeadingElement;
	let showReportForm = $state(false);
	let reportReason = $state<ClueReportReason>('inaccurate');
	let reportState = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');

	const CONFETTI_COLORS = ['#d4a017', '#eab308', '#f59e0b', '#fbbf24', '#b8860b'];
	const correct = $derived(outcome === 'correct');
	const headingText = $derived(
		outcome === 'correct' ? 'CORRECT' : outcome === 'skipped' ? 'SKIPPED' : 'WRONG'
	);

	onMount(() => heading.focus({ preventScroll: true }));

	async function submitReport() {
		reportState = 'sending';
		reportState = (await onReport(reportReason)) ? 'sent' : 'error';
	}
</script>

{#if correct}
	<div class="confetti-container" aria-hidden="true">
		{#each Array(25).keys() as i (i)}
			<div
				class="confetti-piece"
				style="--delay: {Math.random() * 0.5}s; --x: {Math.random() *
					100}vw; --rotation: {Math.random() * 360}deg; --color: {CONFETTI_COLORS[
					Math.floor(Math.random() * CONFETTI_COLORS.length)
				]};"
			></div>
		{/each}
	</div>
{/if}

<section
	class="mt-4 border-y border-border/60 bg-card/70 px-4 py-4"
	aria-labelledby="round-feedback-title"
>
	<div class="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
		<h2
			bind:this={heading}
			id="round-feedback-title"
			tabindex="-1"
			class="font-heading text-3xl tracking-wider outline-none sm:text-4xl {correct
				? 'text-correct'
				: outcome === 'skipped'
					? 'text-gold'
					: 'text-incorrect'}"
		>
			{headingText}
		</h2>

		<p class="text-sm text-muted-foreground">
			{correct ? 'It was' : 'The answer was'}
			<span class="font-medium text-gold">{correctTitle}</span>
		</p>

		<button
			class="mt-1 min-h-11 border border-gold/50 px-8 py-2.5 font-heading text-sm tracking-[0.2em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.97]"
			type="button"
			onclick={onNext}
		>
			{isFinalRound ? 'SEE RESULTS' : 'NEXT ROUND'}
		</button>

		{#if reportState === 'sent'}
			<p class="text-xs text-correct" role="status">Thanks — this clue was reported.</p>
		{:else if showReportForm}
			<div class="mt-1 flex w-full max-w-sm flex-col gap-2 border-t border-border/60 pt-3">
				<label for="report-reason" class="text-xs text-muted-foreground">What was wrong?</label>
				<select
					id="report-reason"
					class="min-h-11 border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold"
					value={reportReason}
					onchange={(event) =>
						(reportReason = (event.currentTarget as HTMLSelectElement).value as ClueReportReason)}
				>
					<option value="inaccurate">The clue is inaccurate</option>
					<option value="ambiguous">The clue is ambiguous</option>
					<option value="reveals-answer">It reveals the answer</option>
					<option value="offensive">It is inappropriate</option>
				</select>
				<button
					class="min-h-11 border border-border px-4 text-xs tracking-[0.12em] text-muted-foreground uppercase outline-none hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
					type="button"
					disabled={reportState === 'sending'}
					onclick={submitReport}
				>
					{reportState === 'sending' ? 'SENDING…' : 'SUBMIT REPORT'}
				</button>
				{#if reportState === 'error'}
					<p class="text-xs text-incorrect" role="status">Report failed. Please try again.</p>
				{/if}
			</div>
		{:else}
			<button
				class="min-h-11 px-3 text-xs text-muted-foreground underline decoration-border underline-offset-4 outline-none hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
				type="button"
				onclick={() => (showReportForm = true)}
			>
				Report this clue
			</button>
		{/if}
	</div>
</section>

<style>
	.confetti-container {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 51;
		overflow: hidden;
	}

	.confetti-piece {
		position: absolute;
		top: -10px;
		left: var(--x);
		width: 8px;
		height: 8px;
		background-color: var(--color);
		opacity: 0.9;
		animation: confetti-fall 1.4s ease-out var(--delay) forwards;
		transform: rotate(var(--rotation));
	}

	@media (prefers-reduced-motion: reduce) {
		.confetti-container {
			display: none;
		}
	}
</style>
