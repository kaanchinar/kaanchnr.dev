<script lang="ts">
	import {
		siKubernetes,
		siTerraform,
		siAnsible,
		siArgo,
		siHelm,
		siGo,
		siDotnet,
		siGitlab,
		siPrometheus,
		siGrafana,
		siVault,
		siGithubactions,
		siDocker,
		siPostgresql,
		siTypescript,
		siNextdotjs
	} from 'simple-icons';
	import type { Skill } from '$lib/data/skills';

	interface Props {
		skill: Skill;
	}

	let { skill }: Props = $props();

	const iconMap: Record<string, typeof siKubernetes> = {
		kubernetes: siKubernetes,
		terraform: siTerraform,
		ansible: siAnsible,
		argo: siArgo,
		helm: siHelm,
		go: siGo,
		dotnet: siDotnet,
		gitlab: siGitlab,
		nextjs: siNextdotjs,
		prometheus: siPrometheus,
		grafana: siGrafana,
		vault: siVault,
		githubactions: siGithubactions,
		docker: siDocker,
		postgresql: siPostgresql,
		typescript: siTypescript
	};

	const icon = $derived(iconMap[skill.icon]);
</script>

<span
	class="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-2.5 py-1 text-xs font-medium text-fg"
>
	{#if icon}
		<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
			<path d={icon.path} />
		</svg>
	{/if}
	{skill.name}
</span>
