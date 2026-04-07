<script lang="ts">
	import { AlertTriangle } from '@lucide/svelte';
	import type { ErrorType } from '$lib/types/index';

	interface Props {
		errorType: ErrorType;
		onRetry: () => void;
		onPlayAgain: () => void;
	}

	let { errorType, onRetry, onPlayAgain }: Props = $props();

	const messages: Record<ErrorType, { title: string; body: string }> = {
		network: {
			title: 'Connection Lost',
			body: 'Even our description generator gave up. The AI just needs a moment to recollect itself.'
		},
		exhausted: {
			title: "You've Seen Them All",
			body: "That's impressive. You've burned through every movie in our library."
		},
		generic: {
			title: 'Something Went Wrong',
			body: "We've encountered an error our writers couldn't have prepared for."
		}
	};

	let { title, body } = $derived(messages[errorType]);
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-6 px-6">
	<div class="flex flex-col items-center gap-4 text-center">
		<AlertTriangle class="size-8 text-gold/50" />

		<h2 class="font-heading text-2xl tracking-wider sm:text-3xl md:text-4xl">{title}</h2>
		<p class="max-w-xs text-sm font-light text-muted-foreground">{body}</p>
	</div>

	<div class="flex flex-col gap-3">
		{#if errorType === 'exhausted'}
			<button
				class="border border-gold/50 px-8 py-2.5 font-heading text-sm tracking-[0.2em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.97]"
				onclick={onPlayAgain}
			>
				PLAY AGAIN
			</button>
		{:else}
			<button
				class="border border-gold/50 px-8 py-2.5 font-heading text-sm tracking-[0.2em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.97]"
				onclick={onRetry}
			>
				TRY AGAIN
			</button>
			<button
				class="border border-border/60 px-8 py-2.5 font-heading text-sm tracking-[0.2em] text-muted-foreground transition-colors duration-200 outline-none hover:border-gold/30 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.97]"
				onclick={onPlayAgain}
			>
				START OVER
			</button>
		{/if}
	</div>
</div>
