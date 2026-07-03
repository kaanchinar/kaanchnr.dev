<script lang="ts">
	import { page } from '$app/state';
	import { House, BookOpen, Mail } from 'lucide-svelte';

	const items = [
		{ href: '/', label: 'Home', icon: House },
		{ href: '/blog', label: 'Blog', icon: BookOpen },
		{ href: '/contact', label: 'Contact', icon: Mail }
	];
</script>

<nav
	class="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-border bg-bg-elevated/80 px-2 py-1.5 shadow-sm backdrop-blur-md"
>
	<ul class="flex items-center gap-1">
		{#each items as item (item.href)}
			{@const Icon = item.icon}
			{@const active = page.url.pathname === item.href}
			<li>
				<a
					href={item.href}
					class="group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors {active
						? 'text-fg'
						: 'text-muted hover:text-fg'}"
				>
					{#if active}
						<span class="absolute inset-0 rounded-full bg-border"></span>
					{/if}
					<span class="relative flex items-center gap-1.5">
						<Icon size={14} />
						{item.label}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
