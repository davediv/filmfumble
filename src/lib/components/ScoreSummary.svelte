<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Film, Trophy, Target, RotateCcw } from '@lucide/svelte';

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
	class="bg-background/95 fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6 backdrop-blur-sm"
	role="dialog"
	aria-modal="true"
	aria-labelledby="summary-title"
>
	<div class="flex flex-col items-center gap-5 text-center">
		<!-- Icon -->
		<div class="bg-primary flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20">
			<Film class="text-primary-foreground size-10 sm:size-12" />
		</div>

		<!-- Title -->
		<h2 id="summary-title" class="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
			Game Over!
		</h2>

		<!-- Score display -->
		<div class="flex flex-col items-center gap-1">
			<p class="text-muted-foreground text-sm">You scored</p>
			<p class="text-5xl font-bold sm:text-6xl md:text-7xl">
				{score}<span class="text-muted-foreground text-2xl sm:text-3xl">/{roundNumber}</span>
			</p>
		</div>

		<!-- Stats row -->
		<div class="bg-muted/50 flex items-center gap-6 rounded-xl px-5 py-3 sm:gap-8">
			<!-- Accuracy -->
			<div class="flex flex-col items-center gap-1">
				<div class="text-muted-foreground flex items-center gap-1.5">
					<Target class="size-3.5" strokeWidth={2} />
					<span class="text-xs font-medium tracking-wide uppercase">Accuracy</span>
				</div>
				<p class="text-xl font-bold sm:text-2xl">{accuracy}%</p>
			</div>

			<!-- Divider -->
			<div class="bg-border h-8 w-px"></div>

			<!-- Correct answers -->
			<div class="flex flex-col items-center gap-1">
				<div class="text-muted-foreground flex items-center gap-1.5">
					<Trophy class="size-3.5" strokeWidth={2} />
					<span class="text-xs font-medium tracking-wide uppercase">Correct</span>
				</div>
				<p class="text-xl font-bold sm:text-2xl">{score}</p>
			</div>
		</div>

		<!-- Performance message -->
		<p class="text-muted-foreground px-4 text-sm sm:text-base">
			{performanceMessage}
		</p>

		<!-- Play Again -->
		<div class="mt-2 flex flex-col items-center gap-3">
			<Button size="lg" class="min-w-48 gap-2 sm:min-w-56" onclick={onPlayAgain}>
				<RotateCcw class="size-4" />
				Play Again
			</Button>
			<p class="text-muted-foreground/70 text-xs">No account required. Just play.</p>
		</div>
	</div>
</div>
