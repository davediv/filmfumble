<script lang="ts">
	import { Star, Clock } from '@lucide/svelte';

	interface Props {
		score: number;
		round: number;
	}

	let { score, round }: Props = $props();
</script>

<div class="flex items-center justify-between px-2 sm:px-3 md:px-4">
	<div class="flex items-center gap-1.5">
		<Star class="text-muted-foreground size-4 sm:size-5" />
		<span class="text-xs font-medium sm:text-sm">Score: {score}</span>
	</div>
	<div class="flex items-center gap-1.5">
		<Clock class="text-muted-foreground size-4 sm:size-5" />
		<span class="text-xs font-medium sm:text-sm">Round {round}</span>
	</div>
</div>
