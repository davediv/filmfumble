<script lang="ts">
	import { tick } from 'svelte';
	import { getContentPreset } from '$lib/config/gameOptions';
	import { resultAccuracy } from '$lib/domain/results';
	import type { ShareOutcome } from '$lib/services/resultsSharing';
	import type { GameSession, RoundResult } from '$lib/types/index';

	interface Props {
		session: GameSession;
		shareText: string;
		onPlaySameSettings: () => void | Promise<void>;
		onChangeSettings: () => void | Promise<void>;
		onShare: () => Promise<ShareOutcome>;
	}

	let { session, shareText, onPlaySameSettings, onChangeSettings, onShare }: Props = $props();

	let shareState = $state<'idle' | 'working' | ShareOutcome>('idle');
	let showManualShare = $state(false);
	let manualShareText = $state<HTMLTextAreaElement>();

	const roundCount = $derived(session.history.length);
	const accuracy = $derived(resultAccuracy(session.score, roundCount));
	const reviewRounds = $derived(session.history.filter((round) => !round.correct));
	const presetLabel = $derived(getContentPreset(session.settings.contentPreset).label);
	const performanceMessage = $derived(
		roundCount === 0
			? 'No rounds completed. Your next game is ready when you are.'
			: session.score === roundCount
				? 'Perfect score! Nothing slipped past you.'
				: session.score > roundCount / 2
					? 'Strong result. Most of those terrible descriptions did not fool you.'
					: 'Those terrible descriptions got the better of you this time.'
	);
	const shareMessage = $derived(
		shareState === 'shared'
			? 'Result shared.'
			: shareState === 'copied'
				? 'Result copied to your clipboard.'
				: shareState === 'cancelled'
					? 'Sharing canceled.'
					: shareState === 'unavailable'
						? 'Select and copy the result text below.'
						: ''
	);

	function answerTitle(round: RoundResult, index: number | null): string {
		return index === null ? 'Skipped' : (round.options[index]?.title ?? 'Answer unavailable');
	}

	async function handleShare() {
		shareState = 'working';
		showManualShare = false;
		shareState = await onShare();

		if (shareState === 'unavailable') {
			showManualShare = true;
			await tick();
			manualShareText?.focus();
			manualShareText?.select();
		}
	}
</script>

<div class="flex flex-1 flex-col items-center px-4 py-8 sm:px-6 sm:py-12">
	<div class="flex w-full max-w-3xl flex-col items-center gap-7">
		<div
			class="flex flex-col items-center gap-5 text-center"
			style="animation: reveal 0.5s ease-out both"
		>
			<div class="h-px w-12 bg-gold/30"></div>

			<h1 class="font-heading text-4xl tracking-wider text-gold sm:text-5xl md:text-6xl">
				GAME OVER
			</h1>

			<div class="flex flex-col items-center gap-1">
				<p class="text-xs tracking-[0.15em] text-muted-foreground uppercase">Final Score</p>
				<p class="font-heading text-6xl text-foreground sm:text-7xl">
					{session.score}<span class="text-3xl text-muted-foreground">/{roundCount}</span>
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
					<span class="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
						Movie mix
					</span>
					<span class="text-sm text-foreground">{presetLabel}</span>
				</div>
			</div>

			<p class="max-w-sm text-sm font-light text-muted-foreground">{performanceMessage}</p>
		</div>

		<div class="flex w-full max-w-md flex-col gap-3">
			<button
				class="min-h-11 border border-gold/50 px-6 py-2.5 font-heading text-sm tracking-[0.18em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.97]"
				type="button"
				onclick={onPlaySameSettings}
			>
				PLAY SAME SETTINGS
			</button>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<button
					class="min-h-11 border border-border px-4 py-2.5 font-heading text-sm tracking-[0.14em] text-muted-foreground outline-none hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
					type="button"
					onclick={onChangeSettings}
				>
					CHANGE SETTINGS
				</button>
				<button
					class="min-h-11 border border-border px-4 py-2.5 font-heading text-sm tracking-[0.14em] text-muted-foreground outline-none hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-60"
					type="button"
					disabled={shareState === 'working'}
					aria-describedby="share-status"
					onclick={handleShare}
				>
					{shareState === 'working' ? 'SHARING…' : 'SHARE RESULT'}
				</button>
			</div>
			<p
				id="share-status"
				class="min-h-5 text-center text-xs text-muted-foreground"
				role="status"
				aria-live="polite"
			>
				{shareMessage}
			</p>
			{#if showManualShare}
				<label for="share-result-text" class="text-xs text-muted-foreground">Result text</label>
				<textarea
					bind:this={manualShareText}
					id="share-result-text"
					class="min-h-28 w-full resize-y border border-border bg-card p-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold"
					readonly
					value={shareText}
				></textarea>
			{/if}
		</div>

		<section class="w-full border-t border-border/60 pt-6" aria-labelledby="answer-review-title">
			<h2
				id="answer-review-title"
				class="text-center font-heading text-2xl tracking-wider text-foreground sm:text-3xl"
			>
				ANSWER REVIEW
			</h2>

			{#if reviewRounds.length === 0}
				<p class="mt-3 text-center text-sm text-muted-foreground">
					{roundCount === 0
						? 'No completed answers to review.'
						: 'Nothing to review — every answer was correct.'}
				</p>
			{:else}
				<details class="mt-3 border-y border-border/60" open={reviewRounds.length <= 3}>
					<summary
						class="flex min-h-11 cursor-pointer items-center justify-between gap-4 px-3 text-sm text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold"
					>
						<span>Missed or skipped answers</span>
						<span class="font-heading text-xl text-gold">{reviewRounds.length}</span>
					</summary>
					<ol class="grid gap-3 border-t border-border/60 py-3 sm:grid-cols-2">
						{#each reviewRounds as round (round.roundNumber)}
							<li class="flex flex-col gap-2 bg-card/60 p-4">
								<h3 class="font-heading text-lg tracking-wide text-gold">
									Round {round.roundNumber} · {round.skipped ? 'Skipped' : 'Incorrect'}
								</h3>
								<p class="text-sm leading-relaxed text-foreground">{round.description}</p>
								<dl class="grid gap-1 text-sm">
									<div class="flex gap-2">
										<dt class="text-muted-foreground">Your answer:</dt>
										<dd>{answerTitle(round, round.selectedIndex)}</dd>
									</div>
									<div class="flex gap-2">
										<dt class="text-muted-foreground">Correct answer:</dt>
										<dd class="text-correct">{answerTitle(round, round.correctIndex)}</dd>
									</div>
								</dl>
							</li>
						{/each}
					</ol>
				</details>
			{/if}
		</section>
	</div>
</div>
