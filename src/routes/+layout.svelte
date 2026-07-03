<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import IslandNav from '$lib/components/IslandNav.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<IslandNav />

<main class="mx-auto max-w-2xl px-6 pb-24 pt-24">
	{@render children()}
</main>
