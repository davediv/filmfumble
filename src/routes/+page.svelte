<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import { beginGameSession, DEFAULT_GAME_SETTINGS } from '$lib/domain/gameSession';
	import {
		loadGameSession,
		loadGameSettings,
		saveGameSession,
		saveGameSettings
	} from '$lib/services/sessionPersistence';
	import type { GameSettings } from '$lib/types/index';

	let settings = $state<GameSettings>({ ...DEFAULT_GAME_SETTINGS });
	let canResume = $state(false);

	onMount(() => {
		settings = loadGameSettings(window.sessionStorage) ?? { ...DEFAULT_GAME_SETTINGS };
		const savedSession = loadGameSession(window.sessionStorage);
		canResume = Boolean(savedSession && !['start', 'ended'].includes(savedSession.phase));
	});

	function handleSettingsChange(nextSettings: GameSettings) {
		settings = nextSettings;
		saveGameSettings(window.sessionStorage, settings);
	}

	async function startGame() {
		const session = beginGameSession(settings);
		saveGameSettings(window.sessionStorage, settings);
		saveGameSession(window.sessionStorage, session);
		await goto(resolve('/play'));
	}

	async function resumeGame() {
		await goto(resolve('/play'));
	}
</script>

<svelte:head>
	<title>FilmFumble — Guess Movies from Terrible Descriptions</title>
	<meta
		name="description"
		content="AI generates hilariously bad movie descriptions. Can you guess the film? A free browser party game."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:title" content="FilmFumble — Guess Movies from Terrible Descriptions" />
	<meta
		property="og:description"
		content="AI generates hilariously bad movie descriptions. Can you guess the film? A free browser party game."
	/>
	<meta property="og:site_name" content="FilmFumble" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="FilmFumble — Guess Movies from Terrible Descriptions" />
	<meta
		name="twitter:description"
		content="AI generates hilariously bad movie descriptions. Can you guess the film? A free browser party game."
	/>
</svelte:head>

<StartScreen
	{settings}
	{canResume}
	onSettingsChange={handleSettingsChange}
	onStart={startGame}
	onResume={resumeGame}
/>
