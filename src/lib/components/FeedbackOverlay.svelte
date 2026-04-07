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

<div
	class="bg-background/95 fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6 backdrop-blur-sm"
	role="dialog"
	aria-modal="true"
	aria-labelledby="feedback-title"
>
	<div class="flex flex-col items-center gap-3 text-center">
		{#if correct}
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
				<Check class="size-8 text-green-500" strokeWidth={2.5} />
			</div>
			<h2 id="feedback-title" class="text-2xl font-bold text-green-600 dark:text-green-400">
				Correct!
			</h2>
		{:else}
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
				<X class="size-8 text-red-500" strokeWidth={2.5} />
			</div>
			<h2 id="feedback-title" class="text-2xl font-bold text-red-600 dark:text-red-400">Wrong!</h2>
		{/if}

		<div class="mt-2 flex flex-col items-center gap-1">
			<p class="text-muted-foreground text-sm">
				{resultLabel}
			</p>
			<p class="text-xl font-semibold">{correctTitle}</p>
		</div>
	</div>

	<div class="mt-4">
		<Button size="lg" onclick={onNext}>Next Round</Button>
	</div>
</div>
