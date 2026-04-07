<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Check, X } from '@lucide/svelte';

	interface Props {
		correct: boolean;
		correctTitle: string;
		onNext: () => void;
	}

	let { correct, correctTitle, onNext }: Props = $props();

	const resultLabel = $derived(correct ? 'It was:' : 'The correct answer was:');
</script>

{#if correct}
	<div class="confetti-container" aria-hidden="true">
		{#each Array(50).keys() as i (i)}
			<div
				class="confetti-piece"
				style="--delay: {Math.random() * 0.5}s; --x: {Math.random() *
					100}vw; --rotation: {Math.random() * 360}deg; --color: {[
					'#22c55e',
					'#eab308',
					'#3b82f6',
					'#ec4899',
					'#f97316'
				][Math.floor(Math.random() * 5)]};"
			></div>
		{/each}
	</div>
{/if}

<div
	class="bg-background/95 fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6 backdrop-blur-sm"
	role="dialog"
	aria-modal="true"
	aria-labelledby="feedback-title"
>
	<div class="flex flex-col items-center gap-3 text-center">
		{#if correct}
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 sm:h-16 sm:w-16"
			>
				<Check class="size-7 text-green-500 sm:size-8" strokeWidth={2.5} />
			</div>
			<h2
				id="feedback-title"
				class="text-xl font-bold text-green-600 sm:text-2xl md:text-3xl dark:text-green-400"
			>
				Correct!
			</h2>
		{:else}
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 sm:h-16 sm:w-16"
			>
				<X class="size-7 text-red-500 sm:size-8" strokeWidth={2.5} />
			</div>
			<h2
				id="feedback-title"
				class="text-xl font-bold text-red-600 sm:text-2xl md:text-3xl dark:text-red-400"
			>
				Wrong!
			</h2>
		{/if}

		<div class="mt-2 flex flex-col items-center gap-1">
			<p class="text-muted-foreground text-xs sm:text-sm">
				{resultLabel}
			</p>
			<p class="text-lg font-semibold sm:text-xl">{correctTitle}</p>
		</div>
	</div>

	<div class="mt-4">
		<Button size="lg" onclick={onNext}>Next Round</Button>
	</div>
</div>

<style>
	.confetti-container {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 49;
		overflow: hidden;
	}

	.confetti-piece {
		position: absolute;
		top: -10px;
		left: var(--x);
		width: 10px;
		height: 10px;
		background-color: var(--color);
		opacity: 0.8;
		border-radius: 2px;
		animation: confetti-fall 1.4s ease-out var(--delay) forwards;
		transform: rotate(var(--rotation));
	}

	@keyframes confetti-fall {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 0.8;
		}
		100% {
			transform: translateY(100vh) rotate(720deg);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.confetti-container {
			display: none;
		}
	}
</style>
