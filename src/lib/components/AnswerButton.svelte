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

	const isDisabled = disabled || state === 'disabled';

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
	class={cn('min-h-12 w-full text-base font-normal', stateClass)}
	disabled={isDisabled}
	{onclick}
>
	{title}
</Button>
