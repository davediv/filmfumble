<script lang="ts">
	import { cn } from '$lib/utils';

	type ButtonState = 'default' | 'correct' | 'incorrect' | 'disabled';

	interface Props {
		title: string;
		index: number;
		state?: ButtonState;
		disabled?: boolean;
		onclick: () => void;
	}

	let { title, index, state = 'default', disabled = false, onclick }: Props = $props();

	const label = $derived(String.fromCharCode(65 + index));
	const isDisabled = $derived(disabled || state === 'disabled');
</script>

<button
	class={cn(
		'flex w-full items-center gap-3 border px-4 py-3.5 text-left transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:pointer-events-none sm:py-4',
		state === 'correct'
			? 'border-correct/60 bg-correct/10'
			: state === 'incorrect'
				? 'animate-shake border-incorrect/60 bg-incorrect/10'
				: 'border-border/60 bg-card/40 hover:border-gold/30 hover:bg-card/70',
		isDisabled && state === 'default' && 'opacity-40'
	)}
	disabled={isDisabled}
	{onclick}
>
	<span
		class={cn(
			'font-heading text-lg transition-colors duration-150 sm:text-xl',
			state === 'correct'
				? 'text-correct'
				: state === 'incorrect'
					? 'text-incorrect'
					: 'text-gold/40'
		)}
	>
		{label}
	</span>
	<span class="text-sm font-light sm:text-base">{title}</span>
</button>

<style>
	:global(.animate-shake) {
		animation: shake 0.5s ease-in-out;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.animate-shake) {
			animation: none;
		}
	}
</style>
