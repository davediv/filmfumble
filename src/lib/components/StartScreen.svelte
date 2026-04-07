<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Film } from '@lucide/svelte';

	interface Props {
		onStart: () => void;
	}

	let { onStart }: Props = $props();
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center gap-5 px-4 sm:gap-6 sm:px-6 md:px-8"
>
	<div class="flex flex-col items-center gap-3 px-2 text-center">
		<div class="bg-primary flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20">
			<Film class="text-primary-foreground size-10 sm:size-12" />
		</div>

		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">FilmFumble</h1>
		<p class="text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md">
			Guess the movie from the world's worst description
		</p>
	</div>

	<div class="flex flex-col items-center gap-4">
		<Button size="lg" class="min-w-48 sm:min-w-56" onclick={onStart}>Start Game</Button>
		<p class="text-muted-foreground text-xs">No account required. Just play.</p>
	</div>

	<div class="absolute bottom-8 text-center">
		<p class="text-muted-foreground/60 text-xs">
			AI-generated descriptions. Guaranteed to be terrible.
		</p>
	</div>
</div>
