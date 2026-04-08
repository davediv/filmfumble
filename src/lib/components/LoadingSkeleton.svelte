<script lang="ts">
	import { onMount } from 'svelte';

	const messages = [
		'Our AI is writing something terrible...',
		'Cooking up the worst description imaginable...',
		'Asking a film student for their worst take...',
		'Consulting the DBESG (Deliberately Bad Expert Group)...',
		'Training on a diet of Wikipedia plot holes...',
		'Asking a toddler to describe a movie plot...',
		'Mixing metaphors until they explode...',
		'Bribing a film critic to be unhelpful...',
		'Feeding caffeine to a sleep-deprived screenwriter...',
		'Reverse-engineering bad reviews into worse descriptions...'
	];

	let messageIndex = $state(0);
	let message = $derived(messages[messageIndex]);

	onMount(() => {
		const interval = setInterval(() => {
			messageIndex = (messageIndex + 1) % messages.length;
		}, 2500);
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-1 items-center justify-center px-4 py-4 sm:px-5 sm:py-5">
	<div class="flex flex-col items-center gap-3">
		<div class="size-6 animate-spin rounded-full border-2 border-gold/20 border-t-gold"></div>
		<p
			class="text-center text-sm font-light text-muted-foreground italic"
			role="status"
			aria-live="polite"
		>
			{message}
		</p>
	</div>
</div>
