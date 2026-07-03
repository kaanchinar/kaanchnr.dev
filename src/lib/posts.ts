import type { ComponentType, SvelteComponent } from 'svelte';

export interface Post {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	excerpt: string;
	content: ComponentType<SvelteComponent>;
}

export interface PostMetadata {
	title: string;
	date: string;
	tags: string[];
	excerpt: string;
}

interface PostModule {
	metadata: PostMetadata;
	default: ComponentType<SvelteComponent>;
}

const modules = import.meta.glob<PostModule>('/src/posts/*.md', { eager: true });

export function getPosts(): Post[] {
	return Object.entries(modules)
		.map(([path, module]) => {
			const slug = path.replace('/src/posts/', '').replace('.md', '');
			return {
				slug,
				...module.metadata,
				content: module.default
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
	return getPosts().find((post) => post.slug === slug);
}
