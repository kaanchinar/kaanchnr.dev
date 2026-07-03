<script lang="ts">
	import type { Post } from '$lib/posts';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();
</script>

<a
	href="/blog/{post.slug}"
	class="group block rounded-lg border border-border bg-bg-elevated p-4 transition-colors hover:border-muted"
>
	<div class="mb-2 flex items-center gap-2 text-xs text-muted">
		<time datetime={post.date}
			>{new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</time
		>
		{#each post.tags as tag (tag)}
			<span class="rounded bg-border px-1.5 py-0.5 text-[10px] font-medium text-fg">{tag}</span>
		{/each}
	</div>
	<h3 class="mb-1 font-semibold text-fg group-hover:underline">{post.title}</h3>
	<p class="text-sm text-muted">{post.excerpt}</p>
</a>
