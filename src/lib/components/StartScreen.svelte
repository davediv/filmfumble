<script lang="ts">
	import {
		CONTENT_PRESETS,
		getContentPreset,
		getDefaultRoundLimit,
		getRoundLimitOptions
	} from '$lib/config/gameOptions';
	import type { GameSettings } from '$lib/types/index';

	interface Props {
		settings: GameSettings;
		onSettingsChange: (settings: GameSettings) => void;
		onStart: () => void;
	}

	let { settings, onSettingsChange, onStart }: Props = $props();

	const activePreset = $derived(getContentPreset(settings.contentPreset));
	const roundLimitOptions = $derived(getRoundLimitOptions(settings.contentPreset));
	const gameLength = $derived(
		settings.roundLimit === null ? 'Endless play' : `${settings.roundLimit} rounds`
	);

	function handlePresetChange(event: Event) {
		const preset = CONTENT_PRESETS.find(
			(option) => option.id === (event.currentTarget as HTMLSelectElement).value
		);
		if (!preset) return;

		const validRoundLimit = getRoundLimitOptions(preset.id).some(
			(option) => option.value === settings.roundLimit
		);
		onSettingsChange({
			...settings,
			contentPreset: preset.id,
			roundLimit: validRoundLimit ? settings.roundLimit : getDefaultRoundLimit(preset.id)
		});
	}

	function handleRoundLimitChange(event: Event) {
		const value = (event.currentTarget as HTMLSelectElement).value;
		const roundLimit = value === 'endless' ? null : Number(value);
		if (roundLimit === null || Number.isInteger(roundLimit)) {
			onSettingsChange({ ...settings, roundLimit });
		}
	}
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

	<details
		class="w-full max-w-sm border-y border-border/50 py-2"
		style="animation: reveal 0.5s ease-out 0.08s both"
	>
		<summary
			class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-2 text-xs tracking-[0.12em] text-muted-foreground uppercase marker:content-none"
		>
			<span>Movie mix</span>
			<span class="text-gold">{activePreset.label}</span>
		</summary>

		<div class="flex flex-col gap-2 px-2 pt-3 pb-2">
			<label for="content-preset" class="text-xs text-muted-foreground"
				>Choose your movie pool</label
			>
			<select
				id="content-preset"
				class="min-h-11 w-full border border-border bg-card px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold"
				value={settings.contentPreset}
				onchange={handlePresetChange}
			>
				{#each CONTENT_PRESETS as preset (preset.id)}
					<option value={preset.id}>{preset.label} · {preset.availableMovies} movies</option>
				{/each}
			</select>
			<p class="text-xs leading-relaxed text-muted-foreground">{activePreset.description}</p>

			<label for="round-limit" class="mt-2 text-xs text-muted-foreground">Game length</label>
			<select
				id="round-limit"
				class="min-h-11 w-full border border-border bg-card px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold"
				value={settings.roundLimit === null ? 'endless' : String(settings.roundLimit)}
				onchange={handleRoundLimitChange}
			>
				{#each roundLimitOptions as option (option.value)}
					<option value={option.value === null ? 'endless' : String(option.value)}>
						{option.label}
					</option>
				{/each}
			</select>
		</div>
	</details>

	<div class="flex flex-col items-center gap-5" style="animation: reveal 0.5s ease-out 0.12s both">
		<button
			class="border border-gold/50 px-10 py-3 font-heading text-lg tracking-[0.2em] text-gold transition-colors duration-200 outline-none hover:bg-gold hover:text-background focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.97]"
			onclick={onStart}
		>
			START GAME
		</button>

		<p class="text-xs tracking-wide text-muted-foreground/50">
			{gameLength} · 4 choices · no account
		</p>
	</div>
</div>
