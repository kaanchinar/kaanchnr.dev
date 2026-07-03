<script lang="ts">
	import type { Experience } from '$lib/data/experience';

	interface Props {
		job: Experience;
	}

	let { job }: Props = $props();
</script>

<div class="grid gap-1 border-b border-border pb-6 last:border-0 last:pb-0">
	<div class="flex items-baseline justify-between gap-4">
		<h3 class="font-semibold text-fg">{job.company}</h3>
		<span class="text-xs text-muted">{job.year}</span>
	</div>
	<p class="text-sm text-muted">
		{job.role} · {job.engagement} · {job.stack.join(', ')}
	</p>
	<p class="mt-1 text-sm font-medium text-fg">{job.project}</p>
	<ul class="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
		{#each job.highlights as highlight (highlight)}
			<li>{highlight}</li>
		{/each}
	</ul>
</div>
