import { describe, expect, it } from 'vitest';
import { validateContact } from './validate';

describe('validateContact', () => {
	it('accepts valid input', () => {
		const result = validateContact({
			name: 'Kaan',
			email: 'kaan@example.com',
			message: 'Hello there'
		});

		expect(result).toEqual({
			valid: true,
			data: { name: 'Kaan', email: 'kaan@example.com', message: 'Hello there' }
		});
	});

	it('trims whitespace', () => {
		const result = validateContact({
			name: '  Kaan  ',
			email: '  kaan@example.com  ',
			message: '  Hello there  '
		});

		expect(result).toEqual({
			valid: true,
			data: { name: 'Kaan', email: 'kaan@example.com', message: 'Hello there' }
		});
	});

	it('rejects empty name', () => {
		const result = validateContact({ name: '', email: 'kaan@example.com', message: 'Hi' });
		expect(result.valid).toBe(false);
		if (!result.valid) expect(result.field).toBe('name');
	});

	it('rejects missing email', () => {
		const result = validateContact({ name: 'Kaan', email: '', message: 'Hi' });
		expect(result.valid).toBe(false);
		if (!result.valid) expect(result.field).toBe('email');
	});

	it('rejects email without @', () => {
		const result = validateContact({ name: 'Kaan', email: 'not-an-email', message: 'Hi' });
		expect(result.valid).toBe(false);
		if (!result.valid) expect(result.field).toBe('email');
	});

	it('rejects empty message', () => {
		const result = validateContact({ name: 'Kaan', email: 'kaan@example.com', message: '   ' });
		expect(result.valid).toBe(false);
		if (!result.valid) expect(result.field).toBe('message');
	});

	it('rejects non-string values', () => {
		const result = validateContact({ name: 123, email: null, message: undefined } as never);
		expect(result.valid).toBe(false);
	});
});
