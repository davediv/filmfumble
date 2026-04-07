<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';

	type ButtonState = 'default' | 'correct' | 'incorrect' | 'disabled';

	interface Props {
		title: string;
		state?: ButtonState;
		disabled?: boolean;
		onclick: () => void;
	}

	let { title, state = 'default', disabled = false, onclick }: Props = $props();

	const isDisabled = $derived(disabled || state === 'disabled');

	const stateClass = $derived(
		state === 'correct'
			? 'border-green-500 bg-green-500/20 text-green-700 dark:text-green-400'
			: state === 'incorrect'
				? 'border-red-500 bg-red-500/20 text-red-700 dark:text-red-400'
				: ''
	);
</script>

<Button
	variant="outline"
	class={cn(
		'min-h-12 w-full text-sm font-normal transition-all duration-200 sm:min-h-14 sm:text-base',
		stateClass,
		state === 'incorrect' && 'animate-shake'
	)}
	disabled={isDisabled}
	{onclick}
>
	{title}
</Button>

<style>
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-4px);
		}
		20%,
		40%,
		60%,
		80% {
			transform: translateX(4px);
		}
	}

	.animate-shake {
		animation: shake 0.5s ease-in-out;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-shake {
			animation: none;
		}
	}
</style>
