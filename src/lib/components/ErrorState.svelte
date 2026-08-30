<script lang="ts">
	import type { ErrorType } from '$lib/types/index';

	interface Props {
		errorType: ErrorType;
		onRetry: () => void;
		onPlayAgain: () => void;
	}

	let { errorType, onRetry, onPlayAgain }: Props = $props();

	const messages: Record<ErrorType, { title: string; body: string }> = {
		offline: {
			title: "You're Offline",
			body: 'Reconnect to the internet, then try this round again. Your score is safely saved.'
		},
		service: {
			title: 'Service Unavailable',
			body: 'The game could not load the next round. Your progress is saved, so it is safe to retry.'
		},
		content: {
			title: 'Clue Unavailable',
			body: 'That movie pool could not provide a reviewed clue. Try again or choose another movie mix.'
		},
		'invalid-response': {
			title: 'Game Data Changed',
			body: 'The saved round no longer matches this version of the game. Start over to continue safely.'
		}
	};

	let { title, body } = $derived(messages[errorType]);
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-6 px-6">
	<div class="flex flex-col items-center gap-4 text-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="size-8 text-gold/50"
			aria-hidden="true"
		>
			<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
			<path d="M12 9v4" />
			<path d="M12 17h.01" />
		</svg>

		<h2 class="font-heading text-2xl tracking-wider sm:text-3xl md:text-4xl">{title}</h2>
		<p class="max-w-xs text-sm font-light text-muted-foreground">{body}</p>
	</div>

	<div class="flex flex-col gap-3">
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
	</div>
</div>
