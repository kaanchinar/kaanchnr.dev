<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		timezone: string;
	}

	let { timezone }: Props = $props();
	let time = $state('');

	function update() {
		const now = new Date();
		time = now.toLocaleTimeString('en-US', {
			timeZone: timezone,
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	onMount(() => {
		update();
		const interval = setInterval(update, 1000 * 60);
		return () => clearInterval(interval);
	});
</script>

<span class="tabular-nums">{time}</span>
