interface SiteVerifyResponse {
	success: boolean;
	'error-codes'?: string[];
}

export async function verifyTurnstile(
	token: unknown,
	secret: string,
	remoteip?: string
): Promise<boolean> {
	if (!token || typeof token !== 'string') return false;

	const body = new URLSearchParams({ secret, response: token });
	if (remoteip) body.set('remoteip', remoteip);

	let data: SiteVerifyResponse;
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body
		});
		if (!response.ok) return false;
		data = await response.json();
	} catch {
		// Network error or non-JSON body from siteverify — fail closed.
		return false;
	}

	return data.success === true;
}
