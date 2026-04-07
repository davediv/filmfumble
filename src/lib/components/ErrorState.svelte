<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { RefreshCw, RotateCcw, AlertTriangle } from '@lucide/svelte';
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
			body: "That's impressive. You've burned through every movie in our library. Your film instincts are terrifying."
		},
		generic: {
			title: 'Something Went Wrong',
			body: "We've encountered an error our writers couldn't have prepared for. Even the outtakes are gone."
		}
	};

	const icons: Record<ErrorType, typeof AlertTriangle> = {
		network: RefreshCw,
		exhausted: AlertTriangle,
		generic: AlertTriangle
	};

	let { title, body } = $derived(messages[errorType]);
	let Icon = $derived(icons[errorType]);
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-6 px-4 sm:gap-8 sm:px-6">
	<div class="flex flex-col items-center gap-4 text-center">
		<div
			class="bg-destructive/10 flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
		>
			<Icon class="text-destructive size-8 sm:size-10" />
		</div>

		<h2 class="text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
		<p class="text-muted-foreground max-w-xs text-base sm:max-w-sm sm:text-lg">{body}</p>
	</div>

	<div class="flex flex-col gap-3">
		{#if errorType === 'exhausted'}
			<Button size="lg" onclick={onPlayAgain}>
				<RotateCcw class="mr-2 size-4" />
				Play Again
			</Button>
		{:else}
			<Button size="lg" onclick={onRetry}>
				<RefreshCw class="mr-2 size-4" />
				Try Again
			</Button>
			<Button size="lg" variant="outline" onclick={onPlayAgain}>
				<RotateCcw class="mr-2 size-4" />
				Play Again
			</Button>
		{/if}
	</div>
</div>
