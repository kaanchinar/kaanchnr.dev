import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';
import { validateContact } from './validate';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const message = data.get('message');

		const validation = validateContact({ name, email, message });

		if (!validation.valid) {
			return fail(400, { name, email, message, error: validation.error });
		}

		if (!env.RESEND_API_KEY) {
			return fail(500, { name, email, message, error: 'Email service is not configured.' });
		}

		const { Resend } = await import('resend');
		const resend = new Resend(env.RESEND_API_KEY);

		const { error } = await resend.emails.send({
			from: env.RESEND_FROM_EMAIL ?? 'contact@kaanchnr.dev',
			to: env.RESEND_TO_EMAIL ?? 'chinarkaan@gmail.com',
			replyTo: validation.data.email,
			subject: `Contact form: ${validation.data.name}`,
			html: `<p><strong>From:</strong> ${validation.data.name} &lt;${validation.data.email}&gt;</p><p><strong>Message:</strong></p><p>${validation.data.message.replace(/\n/g, '<br>')}</p>`
		});

		if (error) {
			return fail(500, {
				name,
				email,
				message,
				error: 'Failed to send message. Please try again.'
			});
		}

		return { success: true };
	}
} satisfies Actions;
