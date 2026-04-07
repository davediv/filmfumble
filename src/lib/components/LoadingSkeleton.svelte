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

<div class="flex min-h-screen flex-col px-4 py-6">
	<!-- ScoreBar skeleton -->
	<div class="flex items-center justify-between px-2">
		<div class="flex items-center gap-1.5">
			<div class="bg-muted h-4 w-4 animate-pulse rounded"></div>
			<div class="bg-muted h-4 w-16 animate-pulse rounded"></div>
		</div>
		<div class="flex items-center gap-1.5">
			<div class="bg-muted h-4 w-4 animate-pulse rounded"></div>
			<div class="bg-muted h-4 w-20 animate-pulse rounded"></div>
		</div>
	</div>

	<!-- Description skeleton -->
	<div class="my-8 flex flex-1 items-center justify-center">
		<div class="flex w-full max-w-lg flex-col items-center gap-3">
			<div class="bg-muted/50 h-8 w-3/4 animate-pulse rounded-lg"></div>
			<div class="bg-muted/50 h-8 w-2/3 animate-pulse rounded-lg"></div>
			<div class="bg-muted/50 h-8 w-1/2 animate-pulse rounded-lg"></div>
		</div>
	</div>

	<!-- Answer button placeholders -->
	<div class="grid grid-rows-4 gap-3">
		{#each [0, 1, 2, 3] as i (i)}
			<div class="bg-muted/40 border-muted/60 h-12 w-full animate-pulse rounded-md border"></div>
		{/each}
	</div>

	<!-- Humorous message -->
	<div class="mt-6 flex flex-col items-center gap-3">
		<div class="border-muted border-t-primary h-8 w-8 animate-spin rounded-full border-4"></div>
		<p class="text-muted-foreground text-center text-base italic" role="status" aria-live="polite">
			{message}
		</p>
	</div>
</div>
