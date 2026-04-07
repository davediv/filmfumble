<script lang="ts">
	interface Props {
		score: number;
		round: number;
	}

	let { score, round }: Props = $props();
</script>

<div class="flex items-center justify-between px-1">
	<div class="flex items-baseline gap-1.5">
		<span class="font-heading text-xl text-gold">{score}</span>
		<span class="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">pts</span>
	</div>
	<div class="flex items-baseline gap-1.5">
		<span class="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">round</span>
		<span class="font-heading text-xl text-foreground">{round}</span>
	</div>
</div>
