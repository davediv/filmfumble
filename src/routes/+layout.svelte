<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Film } from '@lucide/svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<div class="app-shell min-h-screen">
	<header class="app-header">
		<div class="header-brand">
			<Film class="header-icon" />
			<span class="header-title">FilmFumble</span>
		</div>
	</header>

	<main class="app-main">
		{@render children()}
	</main>
</div>

<style>
	.app-shell {
		display: flex;
		flex-direction: column;
		background: radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1a 100%);
	}

	.app-header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1rem;
		background: rgba(15, 15, 26, 0.8);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.header-brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.header-icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.header-title {
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.app-main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
