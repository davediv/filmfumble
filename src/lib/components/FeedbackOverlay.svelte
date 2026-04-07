<script lang="ts">
	interface Props {
		correct: boolean;
		correctTitle: string;
		onNext: () => void;
	}

	let { correct, correctTitle, onNext }: Props = $props();

	const CONFETTI_COLORS = ['#d4a017', '#eab308', '#f59e0b', '#fbbf24', '#b8860b'];
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

<div
	class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/95 px-6 backdrop-blur-sm"
	style="animation: fade-in 0.2s ease-out both"
	role="dialog"
	aria-modal="true"
	aria-labelledby="feedback-title"
>
	<div class="flex flex-col items-center gap-4 text-center">
		<h2
			id="feedback-title"
			class="font-heading text-4xl tracking-wider sm:text-5xl md:text-6xl {correct
				? 'text-correct'
				: 'text-incorrect'}"
		>
			{correct ? 'CORRECT' : 'WRONG'}
		</h2>

		<div class="mt-1 flex flex-col items-center gap-1">
			<p class="text-xs tracking-[0.15em] text-muted-foreground uppercase">
				{correct ? 'It was:' : 'The answer was:'}
			</p>
			<p class="text-lg font-medium text-gold sm:text-xl">{correctTitle}</p>
		</div>
	</div>

	<button
		class="mt-4 border border-gold/50 px-8 py-2.5 font-heading text-sm tracking-[0.2em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.97]"
		onclick={onNext}
	>
		NEXT ROUND
	</button>
</div>

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
