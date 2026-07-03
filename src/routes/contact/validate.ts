export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export function validateContact(data: {
	name: unknown;
	email: unknown;
	message: unknown;
}):
	| { valid: true; data: ContactFormData }
	| { valid: false; field: keyof ContactFormData; error: string } {
	if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
		return { valid: false, field: 'name', error: 'Name is required.' };
	}
	if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
		return { valid: false, field: 'email', error: 'A valid email is required.' };
	}
	if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
		return { valid: false, field: 'message', error: 'Message is required.' };
	}

	return {
		valid: true,
		data: {
			name: data.name.trim(),
			email: data.email.trim(),
			message: data.message.trim()
		}
	};
}
