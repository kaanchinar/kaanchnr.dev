import { describe, expect, it } from 'vitest';
import { socials } from './socials';

describe('socials data', () => {
	it('has at least one social link', () => {
		expect(socials.length).toBeGreaterThan(0);
	});

	it('each social has required fields', () => {
		for (const social of socials) {
			expect(social.name).toBeTruthy();
			expect(social.url).toMatch(/^https:\/\//);
			expect(social.icon).toBeTruthy();
		}
	});

	it('has unique social names', () => {
		const names = socials.map((s) => s.name);
		expect(new Set(names).size).toBe(names.length);
	});
});
