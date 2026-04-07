<script lang="ts">
	interface Props {
		onStart: () => void;
	}

	let { onStart }: Props = $props();
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-8 px-6">
	<div
		class="flex flex-col items-center gap-6 text-center"
		style="animation: reveal 0.5s ease-out both"
	>
		<div class="h-px w-12 bg-gold/30"></div>

		<h1 class="font-heading text-6xl tracking-wider text-gold sm:text-7xl md:text-8xl lg:text-9xl">
			FILMFUMBLE
		</h1>

		<p
			class="max-w-xs text-sm font-light tracking-wide text-muted-foreground sm:max-w-sm sm:text-base"
		>
			Guess the movie from the world's worst description
		</p>

		<div class="h-px w-12 bg-gold/30"></div>
	</div>

	<div class="flex flex-col items-center gap-5" style="animation: reveal 0.5s ease-out 0.12s both">
		<button
			class="border border-gold/50 px-10 py-3 font-heading text-lg tracking-[0.2em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.97]"
			onclick={onStart}
		>
			START GAME
		</button>

		<p class="text-xs tracking-wide text-muted-foreground/50">No account needed — just play</p>
	</div>
</div>
