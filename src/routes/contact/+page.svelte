<script lang="ts">
	import { enhance } from '$app/forms';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	let { form } = $props();
	let pending = $state(false);
</script>

<svelte:head>
	<title>Contact — Kaan Chinar</title>
	<meta name="description" content="Get in touch with Kaan Chinar." />
</svelte:head>

<h1 class="mb-2 text-2xl font-bold tracking-tight text-fg">Contact</h1>
<p class="mb-8 text-muted">Have a question or a project in mind? Send a message.</p>

{#if form?.success}
	<div class="mb-6 rounded-lg border border-border bg-bg-elevated p-4 text-sm text-fg">
		Thanks for reaching out. I will get back to you soon.
	</div>
{:else}
	<form
		method="POST"
		class="space-y-4"
		use:enhance={() => {
			pending = true;
			return async ({ update }) => {
				pending = false;
				await update();
			};
		}}
	>
		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-fg">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				required
				value={form?.name ?? ''}
				class="w-full rounded-md border-border bg-bg-elevated text-fg shadow-sm focus:border-fg focus:ring-fg"
			/>
		</div>
		<div>
			<label for="email" class="mb-1 block text-sm font-medium text-fg">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				required
				value={form?.email ?? ''}
				class="w-full rounded-md border-border bg-bg-elevated text-fg shadow-sm focus:border-fg focus:ring-fg"
			/>
		</div>
		<div>
			<label for="message" class="mb-1 block text-sm font-medium text-fg">Message</label>
			<textarea
				id="message"
				name="message"
				rows="5"
				required
				class="w-full rounded-md border-border bg-bg-elevated text-fg shadow-sm focus:border-fg focus:ring-fg"
				>{form?.message ?? ''}</textarea
			>
		</div>
		{#if form?.error}
			<p class="text-sm text-red-600 dark:text-red-400">{form.error}</p>
		{/if}
		<button
			type="submit"
			disabled={pending}
			class="inline-flex items-center rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90 disabled:opacity-50"
		>
			{pending ? 'Sending…' : 'Send message'}
		</button>
	</form>
{/if}

<div class="mt-12 border-t border-border pt-8">
	<p class="mb-4 text-sm text-muted">Or find me elsewhere:</p>
	<SocialLinks />
</div>
