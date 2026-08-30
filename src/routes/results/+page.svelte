<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import LoadingSkeleton from '$lib/components/LoadingSkeleton.svelte';
	import ScoreSummary from '$lib/components/ScoreSummary.svelte';
	import {
		clearGameSession,
		loadGameSession,
		saveGameSettings
	} from '$lib/services/sessionPersistence';
	import type { GameSession } from '$lib/types/index';

	let session = $state<GameSession | null>(null);

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
	});

	async function handlePlayAgain() {
		if (!session) return;
		saveGameSettings(window.sessionStorage, session.settings);
		clearGameSession(window.sessionStorage);
		await goto(resolve('/'));
	}
</script>

<svelte:head>
	<title>Results — FilmFumble</title>
</svelte:head>

{#if session}
	<ScoreSummary
		score={session.score}
		roundNumber={session.roundNumber}
		onPlayAgain={handlePlayAgain}
	/>
{:else}
	<LoadingSkeleton />
{/if}
