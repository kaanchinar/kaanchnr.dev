<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'system' | 'light' | 'dark';

	const options: Theme[] = ['system', 'light', 'dark'];
	let current: Theme = $state('system');

	function apply(theme: Theme) {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const resolved = theme === 'dark' || (theme === 'system' && prefersDark) ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', resolved);
		localStorage.setItem('theme', theme);
		current = theme;
	}

	onMount(() => {
		const stored = localStorage.getItem('theme') as Theme | null;
		current = stored ?? 'system';
	});
</script>

<div class="inline-flex rounded-full border border-border bg-bg-elevated p-1 shadow-sm">
	{#each options as option (option)}
		<button
			type="button"
			class="px-2.5 py-1 text-xs font-medium transition-colors rounded-full {current === option
				? 'bg-fg text-bg'
				: 'text-muted hover:text-fg'}"
			onclick={() => apply(option)}
			aria-pressed={current === option}
		>
			{option.charAt(0).toUpperCase() + option.slice(1)}
		</button>
	{/each}
</div>
