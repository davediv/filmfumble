<script lang="ts">
	import { goto, preloadCode } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import { beginGameSession, DEFAULT_GAME_SETTINGS } from '$lib/domain/gameSession';
	import { prefetchRound } from '$lib/services/roundClient';
	import {
		loadGameSession,
		loadGameSettings,
		saveGameSession,
		saveGameSettings
	} from '$lib/services/sessionPersistence';
	import type { GameSession, GameSettings } from '$lib/types/index';

	let settings = $state<GameSettings>({ ...DEFAULT_GAME_SETTINGS });
	let canResume = $state(false);
	let resumableSession: GameSession | null = null;

	onMount(() => {
		settings = loadGameSettings(window.sessionStorage) ?? { ...DEFAULT_GAME_SETTINGS };
		const savedSession = loadGameSession(window.sessionStorage);
		resumableSession =
			savedSession && !['start', 'ended'].includes(savedSession.phase) ? savedSession : null;
		canResume = Boolean(resumableSession);

		const warmPlayRoute = () => {
			void preloadCode(resolve('/play')).catch(() => {
				// Navigation retries normally if opportunistic preloading fails.
			});
		};

		if (typeof window.requestIdleCallback === 'function') {
			const idleId = window.requestIdleCallback(warmPlayRoute, { timeout: 2000 });
			return () => window.cancelIdleCallback(idleId);
		}

		const timeoutId = window.setTimeout(warmPlayRoute, 1000);
		return () => window.clearTimeout(timeoutId);
	});

	function handleSettingsChange(nextSettings: GameSettings) {
		settings = nextSettings;
		saveGameSettings(window.sessionStorage, settings);
	}

	async function startGame() {
		const session = beginGameSession(settings);
		saveGameSettings(window.sessionStorage, settings);
		saveGameSession(window.sessionStorage, session);
		void prefetchRound({
			usedMovieIds: session.usedMovieIds,
			contentPreset: session.settings.contentPreset
		});
		await goto(resolve('/play'));
	}

	async function resumeGame() {
		if (resumableSession?.phase === 'loading') {
			void prefetchRound({
				usedMovieIds: resumableSession.usedMovieIds,
				contentPreset: resumableSession.settings.contentPreset
			});
		}
		await goto(resolve('/play'));
	}
</script>

<svelte:head>
	<title>FilmFumble — Guess Movies from Terrible Descriptions</title>
	<meta
		name="description"
		content="Guess movies from hilariously bad descriptions in a quick, free solo browser trivia game."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:title" content="FilmFumble — Guess Movies from Terrible Descriptions" />
	<meta
		property="og:description"
		content="Guess movies from hilariously bad descriptions in a quick, free solo browser trivia game."
	/>
	<meta property="og:site_name" content="FilmFumble" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="FilmFumble — Guess Movies from Terrible Descriptions" />
	<meta
		name="twitter:description"
		content="Guess movies from hilariously bad descriptions in a quick, free solo browser trivia game."
	/>
</svelte:head>

<StartScreen
	{settings}
	{canResume}
	onSettingsChange={handleSettingsChange}
	onStart={startGame}
	onResume={resumeGame}
/>
