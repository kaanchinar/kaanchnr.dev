<script lang="ts">
	import { siGithub, siInstagram, siX } from 'simple-icons';
	import Link from 'lucide-svelte/icons/link';
	import { socials } from '$lib/data/socials';
</script>

<div class="flex items-center gap-2">
	{#each socials as social (social.name)}
		<a
			href={social.url}
			target="_blank"
			rel="noopener noreferrer"
			class="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-muted hover:text-fg"
			aria-label={social.name}
		>
			{#if social.icon === 'github'}
				<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path d={siGithub.path} />
				</svg>
			{:else if social.icon === 'x'}
				<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path d={siX.path} />
				</svg>
			{:else if social.icon === 'instagram'}
				<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path d={siInstagram.path} />
				</svg>
			{:else}
				<Link size={16} />
			{/if}
		</a>
	{/each}
</div>
