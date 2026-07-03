<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import type { Project } from '$lib/data/projects';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
	const href = $derived(project.liveUrl ?? project.repoUrl ?? '#');
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="group flex flex-col rounded-lg border border-border bg-bg-elevated p-4 transition-colors hover:border-muted"
>
	<div class="mb-2 flex items-start justify-between">
		<h3 class="font-semibold text-fg">{project.name}</h3>
		{#if project.featured}
			<span class="rounded-full bg-fg px-2 py-0.5 text-[10px] font-medium text-bg">Featured</span>
		{/if}
	</div>
	<p class="mb-3 text-sm text-muted">{project.description}</p>
	<div class="mt-auto flex flex-wrap gap-1.5">
		{#each project.tech as tech (tech)}
			<span class="rounded bg-border px-1.5 py-0.5 text-[10px] font-medium text-fg">{tech}</span>
		{/each}
	</div>
	{#if href !== '#'}
		<ArrowUpRight
			size={16}
			class="mt-3 text-muted opacity-0 transition-opacity group-hover:opacity-100"
		/>
	{/if}
</a>
