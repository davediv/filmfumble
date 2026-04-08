<script lang="ts">
	import { cn, posterUrl } from '$lib/utils';

	type ButtonState = 'default' | 'correct' | 'incorrect' | 'disabled';

	interface Props {
		title: string;
		posterPath: string | null;
		index: number;
		buttonState?: ButtonState;
		disabled?: boolean;
		onclick: () => void;
	}

	let { title, posterPath, index, buttonState = 'default', disabled = false, onclick }: Props =
		$props();

	const label = $derived(String.fromCharCode(65 + index));
	const isDisabled = $derived(disabled || buttonState === 'disabled');

	let imgFailed = $state(false);

	$effect(() => {
		posterPath;
		imgFailed = false;
	});

	const showPoster = $derived(posterPath && !imgFailed);
</script>

<button
	class={cn(
		'flex w-full items-center gap-3 border px-4 py-3.5 text-left transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:pointer-events-none sm:py-4',
		buttonState === 'correct'
			? 'border-correct/60 bg-correct/10'
			: buttonState === 'incorrect'
				? 'animate-shake border-incorrect/60 bg-incorrect/10'
				: 'border-border/60 bg-card/40 hover:border-gold/30 hover:bg-card/70',
		isDisabled && buttonState === 'default' && 'opacity-40'
	)}
	disabled={isDisabled}
	{onclick}
>
	<span
		class={cn(
			'font-heading text-lg transition-colors duration-150 sm:text-xl',
			buttonState === 'correct'
				? 'text-correct'
				: buttonState === 'incorrect'
					? 'text-incorrect'
					: 'text-gold/40'
		)}
	>
		{label}
	</span>

	<div
		class="flex h-[60px] w-[40px] flex-shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white/5 sm:h-[84px] sm:w-[56px]"
	>
		{#if showPoster}
			<img
				src={posterUrl(posterPath!)}
				alt=""
				loading="lazy"
				class="h-full w-full object-cover"
				onerror={() => (imgFailed = true)}
			/>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-5 w-5 text-gold/20 sm:h-6 sm:w-6"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<path d="M7 3v18" />
				<path d="M17 3v18" />
				<path d="M3 7h4" />
				<path d="M3 12h18" />
				<path d="M3 17h4" />
				<path d="M17 7h4" />
				<path d="M17 17h4" />
			</svg>
		{/if}
	</div>

	<span class="text-sm font-light sm:text-base">{title}</span>
</button>

<style>
	:global(.animate-shake) {
		animation: shake 0.5s ease-in-out;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.animate-shake) {
			animation: none;
		}
	}
</style>
