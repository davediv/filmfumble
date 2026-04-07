<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Film } from '@lucide/svelte';

	interface Props {
		onStart: () => void;
	}

	let { onStart }: Props = $props();
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
	<div class="flex flex-col items-center gap-3 text-center">
		<div class="bg-primary flex h-20 w-20 items-center justify-center rounded-2xl">
			<Film class="text-primary-foreground size-12" />
		</div>

		<h1 class="text-4xl font-bold tracking-tight">FilmFumble</h1>
		<p class="text-muted-foreground max-w-xs">Guess the movie from the world's worst description</p>
	</div>

	<div class="flex flex-col items-center gap-4">
		<Button size="lg" class="min-w-48" onclick={onStart}>Start Game</Button>
		<p class="text-muted-foreground text-xs">No account required. Just play.</p>
	</div>

	<div class="absolute bottom-8 text-center">
		<p class="text-muted-foreground/60 text-xs">
			AI-generated descriptions. Guaranteed to be terrible.
		</p>
	</div>
</div>
