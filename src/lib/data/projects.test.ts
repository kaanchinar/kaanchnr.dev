import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects data', () => {
	it('has at least one project', () => {
		expect(projects.length).toBeGreaterThan(0);
	});

	it('each project has required fields', () => {
		for (const project of projects) {
			expect(project.name).toBeTruthy();
			expect(project.description).toBeTruthy();
			expect(Array.isArray(project.tech)).toBe(true);
			expect(project.tech.length).toBeGreaterThan(0);
		}
	});

	it('each project links to a GitHub repo when a repoUrl is provided', () => {
		for (const project of projects) {
			if (project.repoUrl) {
				expect(project.repoUrl).toMatch(/^https:\/\/github\.com\//);
			}
		}
	});

	it('has at most one featured project', () => {
		const featured = projects.filter((p) => p.featured);
		expect(featured.length).toBeLessThanOrEqual(1);
	});
});
