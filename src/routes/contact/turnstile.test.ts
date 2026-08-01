import { afterEach, describe, expect, it, vi } from 'vitest';
import { verifyTurnstile } from './turnstile';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function mockFetch(payload: unknown, ok = true) {
	return vi.fn().mockResolvedValue({ ok, json: () => Promise.resolve(payload) });
}

describe('verifyTurnstile', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('returns false without calling fetch when the token is missing', async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);

		expect(await verifyTurnstile(null, 'secret')).toBe(false);
		expect(await verifyTurnstile(undefined, 'secret')).toBe(false);
		expect(await verifyTurnstile('', 'secret')).toBe(false);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('returns true when Cloudflare verifies the token', async () => {
		const fetchMock = mockFetch({ success: true, 'error-codes': [] });
		vi.stubGlobal('fetch', fetchMock);

		expect(await verifyTurnstile('valid-token', 'secret', '203.0.113.1')).toBe(true);

		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe(SITEVERIFY_URL);
		expect(init.method).toBe('POST');
		expect(init.headers).toEqual({ 'content-type': 'application/x-www-form-urlencoded' });
		expect(init.body.toString()).toBe(
			new URLSearchParams({
				secret: 'secret',
				response: 'valid-token',
				remoteip: '203.0.113.1'
			}).toString()
		);
	});

	it('omits remoteip when no client address is provided', async () => {
		const fetchMock = mockFetch({ success: true, 'error-codes': [] });
		vi.stubGlobal('fetch', fetchMock);

		await verifyTurnstile('valid-token', 'secret');

		const body = fetchMock.mock.calls[0][1].body.toString();
		expect(body).toBe(
			new URLSearchParams({ secret: 'secret', response: 'valid-token' }).toString()
		);
	});

	it('returns false when Cloudflare rejects the token', async () => {
		vi.stubGlobal(
			'fetch',
			mockFetch({ success: false, 'error-codes': ['invalid-input-response'] })
		);

		expect(await verifyTurnstile('bad-token', 'secret')).toBe(false);
	});

	it('fails closed when siteverify returns a non-2xx status', async () => {
		vi.stubGlobal('fetch', mockFetch({}, false));

		expect(await verifyTurnstile('token', 'secret')).toBe(false);
	});

	it('fails closed when the request throws', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

		expect(await verifyTurnstile('token', 'secret')).toBe(false);
	});
});
