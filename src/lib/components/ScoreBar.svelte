<script lang="ts">
	interface Props {
		score: number;
		round: number;
		roundLimit: number | null;
		onEndGame: () => void;
	}

	let { score, round, roundLimit, onEndGame }: Props = $props();
</script>

<div class="mx-auto flex w-full max-w-3xl items-center justify-between px-1">
	<div class="flex items-baseline gap-1.5">
		<span class="font-heading text-xl text-gold">{score}</span>
		<span class="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">pts</span>
	</div>
	<div class="flex items-baseline gap-1.5">
		<span class="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">round</span>
		<span class="font-heading text-xl text-foreground">
			{round}<span class="text-sm text-muted-foreground">/{roundLimit ?? '∞'}</span>
		</span>
	</div>
	<button
		class="min-h-11 px-2 text-[10px] tracking-[0.15em] text-muted-foreground uppercase outline-none hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
		type="button"
		onclick={onEndGame}
	>
		End game
	</button>
</div>
