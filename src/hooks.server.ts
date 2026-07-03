import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { createDb } from '$lib/server/db';
import { createAuth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	if (!event.platform) {
		throw new Error('Platform environment is not available');
	}

	const db = createDb(event.platform.env.DB);
	const auth = createAuth(db);

	event.locals.auth = auth;

	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
