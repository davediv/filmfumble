<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		correct: boolean;
		correctTitle: string;
		isFinalRound: boolean;
		onNext: () => void | Promise<void>;
	}

	let { correct, correctTitle, isFinalRound, onNext }: Props = $props();
	let heading: HTMLHeadingElement;

	const CONFETTI_COLORS = ['#d4a017', '#eab308', '#f59e0b', '#fbbf24', '#b8860b'];

	onMount(() => heading.focus({ preventScroll: true }));
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
				: 'text-incorrect'}"
		>
			{correct ? 'CORRECT' : 'WRONG'}
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
