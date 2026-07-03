<script lang="ts">
	import avatar from '$lib/assets/avatar.svg';
	import { about } from '$lib/data/about';
	import { experience } from '$lib/data/experience';
	import { projects } from '$lib/data/projects';
	import { skills } from '$lib/data/skills';
	import { languages } from '$lib/data/languages';
	import { getPosts } from '$lib/posts';
	import LiveClock from '$lib/components/LiveClock.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import ExperienceRow from '$lib/components/ExperienceRow.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SkillChip from '$lib/components/SkillChip.svelte';
	import PostCard from '$lib/components/PostCard.svelte';

	const latestPosts = getPosts().slice(0, 2);
	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<title>{about.name} — {about.role}</title>
	<meta name="description" content={about.bio} />
</svelte:head>

<section class="mb-12 flex flex-col items-start gap-5">
	<img src={avatar} alt="" class="h-20 w-20 rounded-full border border-border" />
	<div class="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-fg">{about.name}</h1>
			<p class="text-sm text-muted">{about.role}</p>
			<p class="mt-1 text-sm text-muted">
				{about.location} · <LiveClock timezone={about.timezone} />
			</p>
		</div>
		<ThemeToggle />
	</div>
	<SocialLinks />
	<p class="max-w-lg text-base leading-relaxed text-fg">{about.bio}</p>
</section>

<section class="mb-12">
	<h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">Experience</h2>
	<div class="space-y-6">
		{#each experience as job (job.company)}
			<ExperienceRow {job} />
		{/each}
	</div>
</section>

{#if latestPosts.length > 0}
	<section class="mb-12">
		<div class="mb-4 flex items-baseline justify-between">
			<h2 class="text-sm font-semibold uppercase tracking-wide text-muted">Latest posts</h2>
			<a href="/blog" class="text-sm text-muted hover:text-fg hover:underline">View archives</a>
		</div>
		<div class="space-y-3">
			{#each latestPosts as post (post.slug)}
				<PostCard {post} />
			{/each}
		</div>
	</section>
{/if}

<section class="mb-12">
	<h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">Projects</h2>
	<div class="grid gap-3 sm:grid-cols-2">
		{#each projects as project (project.name)}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<section class="mb-12">
	<h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">Skills</h2>
	<div class="flex flex-wrap gap-2">
		{#each skills as skill (skill.name)}
			<SkillChip {skill} />
		{/each}
	</div>
</section>

<section class="mb-12">
	<h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">Languages</h2>
	<ul class="space-y-1 text-sm text-fg">
		{#each languages as language (language.name)}
			<li class="flex justify-between border-b border-border py-2 last:border-0">
				<span>{language.name}</span>
				<span class="text-muted">{language.level}</span>
			</li>
		{/each}
	</ul>
</section>

<footer class="border-t border-border pt-8">
	<SocialLinks />
	<p class="mt-4 text-xs text-muted">© {currentYear} {about.name}</p>
</footer>
