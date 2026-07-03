<script lang="ts">
	import { getPosts } from '$lib/posts';
	import PostCard from '$lib/components/PostCard.svelte';

	const posts = getPosts();
</script>

<svelte:head>
	<title>Blog — Kaan Chinar</title>
	<meta
		name="description"
		content="Notes on infrastructure, backend engineering, and side projects."
	/>
</svelte:head>

<h1 class="mb-6 text-2xl font-bold tracking-tight text-fg">Blog</h1>

{#if posts.length === 0}
	<p class="text-muted">No posts yet.</p>
{:else}
	<div class="space-y-3">
		{#each posts as post (post.slug)}
			<PostCard {post} />
		{/each}
	</div>
{/if}
