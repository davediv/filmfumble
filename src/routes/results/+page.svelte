<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import LoadingSkeleton from '$lib/components/LoadingSkeleton.svelte';
	import ScoreSummary from '$lib/components/ScoreSummary.svelte';
	import { beginGameSession } from '$lib/domain/gameSession';
	import { buildResultsShareText } from '$lib/domain/results';
	import { shareResultsText, type ShareOutcome } from '$lib/services/resultsSharing';
	import {
		clearGameSession,
		loadGameSession,
		saveGameSession,
		saveGameSettings
	} from '$lib/services/sessionPersistence';
	import type { GameSession } from '$lib/types/index';

	let session = $state<GameSession | null>(null);
	let shareText = $state('');

	onMount(() => {
		const restored = loadGameSession(window.sessionStorage);
		if (!restored) {
			void goto(resolve('/'));
			return;
		}
		if (restored.phase !== 'ended') {
			void goto(resolve('/play'));
			return;
		}

		session = restored;
		shareText = buildResultsShareText(
			restored,
			new URL(resolve('/'), window.location.origin).toString()
		);
	});

	async function handlePlaySameSettings() {
		if (!session) return;
		const nextSession = beginGameSession(session.settings);
		saveGameSettings(window.sessionStorage, session.settings);
		saveGameSession(window.sessionStorage, nextSession);
		await goto(resolve('/play'));
	}

	async function handleChangeSettings() {
		if (!session) return;
		saveGameSettings(window.sessionStorage, session.settings);
		clearGameSession(window.sessionStorage);
		await goto(resolve('/'));
	}

	async function handleShare(): Promise<ShareOutcome> {
		return shareResultsText(shareText, {
			share: typeof navigator.share === 'function' ? (data) => navigator.share(data) : undefined,
			copy:
				typeof navigator.clipboard?.writeText === 'function'
					? (text) => navigator.clipboard.writeText(text)
					: undefined
		});
	}
</script>

<svelte:head>
	<title>Results — FilmFumble</title>
</svelte:head>

{#if session}
	<ScoreSummary
		{session}
		{shareText}
		onPlaySameSettings={handlePlaySameSettings}
		onChangeSettings={handleChangeSettings}
		onShare={handleShare}
	/>
{:else}
	<LoadingSkeleton />
{/if}
