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

<div class="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
	<!-- Score skeleton -->
	<div class="flex items-center justify-between px-1">
		<div class="h-5 w-10 animate-pulse rounded-sm bg-muted/60"></div>
		<div class="h-5 w-14 animate-pulse rounded-sm bg-muted/60"></div>
	</div>

	<!-- Description skeleton -->
	<div class="my-8 flex flex-1 items-center justify-center">
		<div class="flex w-full max-w-md flex-col items-center gap-3">
			<div class="h-5 w-3/4 animate-pulse rounded-sm bg-muted/40"></div>
			<div class="h-5 w-2/3 animate-pulse rounded-sm bg-muted/40"></div>
		</div>
	</div>

	<!-- Answer skeleton -->
	<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
		{#each [0, 1, 2, 3] as i (i)}
			<div class="h-12 animate-pulse rounded-sm border border-border/30 bg-card/20 sm:h-14"></div>
		{/each}
	</div>

	<!-- Spinner + message -->
	<div class="mt-6 flex flex-col items-center gap-3">
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
