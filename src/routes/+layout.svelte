<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Josefin+Sans:wght@300;400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<header
		class="sticky top-0 z-10 flex items-center justify-center border-b border-gold/15 bg-background/80 px-4 py-3 backdrop-blur-md"
	>
		<span class="font-heading text-base tracking-[0.25em] text-gold/70">FILMFUMBLE</span>
	</header>

	<main class="flex flex-1 flex-col">
		{@render children()}
	</main>
</div>
