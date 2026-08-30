<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="preload"
		href="/fonts/bebas-neue-latin.441b026d.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<header
		class="sticky top-0 z-10 flex items-center justify-center border-b border-gold/15 bg-background/80 px-4 py-3 backdrop-blur-md"
	>
		<a
			href={resolve('/')}
			class="flex min-h-11 items-center px-2 font-heading text-base tracking-[0.25em] text-gold/70 outline-none hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
			aria-label="FilmFumble home"
		>
			FILMFUMBLE
		</a>
	</header>

	<main class="flex flex-1 flex-col">
		{@render children()}
	</main>
</div>
