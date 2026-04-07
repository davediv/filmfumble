<script lang="ts">
	interface Props {
		score: number;
		roundNumber: number;
		onPlayAgain: () => void;
	}

	let { score, roundNumber, onPlayAgain }: Props = $props();

	const accuracy = $derived(roundNumber > 0 ? Math.round((score / roundNumber) * 100) : 0);

	const performanceMessage = $derived(
		score === roundNumber
			? 'Perfect score! The AI has nothing on you.'
			: score > roundNumber / 2
				? 'Not bad! Some terrible descriptions fool the best.'
				: "The AI's terrible descriptions got the better of you."
	);
</script>

<div
	class="flex flex-1 flex-col items-center justify-center gap-6 px-6"
	style="animation: reveal 0.5s ease-out both"
>
	<div class="flex flex-col items-center gap-5 text-center">
		<div class="h-px w-12 bg-gold/30"></div>

		<h2 class="font-heading text-4xl tracking-wider text-gold sm:text-5xl md:text-6xl">
			GAME OVER
		</h2>

		<div class="flex flex-col items-center gap-1">
			<p class="text-xs tracking-[0.15em] text-muted-foreground uppercase">Final Score</p>
			<p class="font-heading text-6xl text-foreground sm:text-7xl">
				{score}<span class="text-3xl text-muted-foreground">/{roundNumber}</span>
			</p>
		</div>

		<div class="flex items-center gap-6 border-y border-border/40 py-3">
			<div class="flex flex-col items-center gap-0.5">
				<span class="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
					Accuracy
				</span>
				<span class="font-heading text-2xl text-gold">{accuracy}%</span>
			</div>
			<div class="h-6 w-px bg-border/40"></div>
			<div class="flex flex-col items-center gap-0.5">
				<span class="text-[10px] tracking-[0.15em] text-muted-foreground uppercase"> Rounds </span>
				<span class="font-heading text-2xl text-foreground">{roundNumber}</span>
			</div>
		</div>

		<p class="max-w-xs text-sm font-light text-muted-foreground">{performanceMessage}</p>

		<div class="h-px w-12 bg-gold/30"></div>

		<button
			class="border border-gold/50 px-8 py-2.5 font-heading text-sm tracking-[0.2em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.97]"
			onclick={onPlayAgain}
		>
			PLAY AGAIN
		</button>

		<p class="text-xs tracking-wide text-muted-foreground/40">No account needed — just play</p>
	</div>
</div>
