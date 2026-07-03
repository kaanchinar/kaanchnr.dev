<script lang="ts">
	import { page } from '$app/state';
	import { getPost } from '$lib/posts';
	import { ArrowLeft } from 'lucide-svelte';

	const slug = $derived(page.params.slug ?? '');
	const post = $derived(getPost(slug));
	const Content = $derived(post?.content);
</script>

<svelte:head>
	<title>{post?.title ?? 'Not found'} — Kaan Chinar</title>
	<meta name="description" content={post?.excerpt ?? ''} />
</svelte:head>

{#if post && Content}
	<a href="/blog" class="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
		<ArrowLeft size={14} />
		Back to archives
	</a>

	<article class="prose prose-neutral dark:prose-invert max-w-none">
		<header class="not-prose mb-8">
			<h1 class="text-2xl font-bold tracking-tight text-fg">{post.title}</h1>
			<div class="mt-2 flex items-center gap-2 text-sm text-muted">
				<time datetime={post.date}
					>{new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</time
				>
				{#each post.tags as tag (tag)}
					<span class="rounded bg-border px-2 py-0.5 text-xs font-medium text-fg">{tag}</span>
				{/each}
			</div>
		</header>

		<Content />
	</article>
{:else}
	<div class="text-center">
		<h1 class="text-2xl font-bold text-fg">Post not found</h1>
		<p class="mt-2 text-muted">The post you are looking for does not exist.</p>
		<a href="/blog" class="mt-4 inline-block text-sm text-muted hover:text-fg hover:underline">
			View all posts
		</a>
	</div>
{/if}
