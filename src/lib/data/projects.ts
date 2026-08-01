export interface Project {
	name: string;
	description: string;
	tech: string[];
	repoUrl?: string;
	liveUrl?: string;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		name: 'latex-renderer',
		description:
			'Self-hosted platform for editing and compiling LaTeX documents in real time, with a SignalR compile-preview loop, Tectonic engine, and S3-compatible storage.',
		tech: ['C#', 'ASP.NET Core', 'SignalR', 'PostgreSQL', 'Tectonic', 'Docker'],
		repoUrl: 'https://github.com/kaanchinar/latex-renderer'
	},
	{
		name: 'LibraryManagement',
		description:
			'REST API for managing a library catalog and circulation, built with Clean Architecture, MediatR/CQRS, FluentValidation, and full xUnit test coverage.',
		tech: ['C#', 'ASP.NET Core', 'PostgreSQL', 'MediatR', 'Docker'],
		repoUrl: 'https://github.com/kaanchinar/LibraryManagement'
	},
	{
		name: 'todo-api-go',
		description:
			'Production-ready REST API built in Go using Chi framework with clean architecture, middleware, and full CI/CD pipeline.',
		tech: ['Go', 'Chi', 'PostgreSQL', 'CI/CD'],
		repoUrl: 'https://github.com/kaanchinar/todo-api-go',
		featured: true
	},
	{
		name: 'url-shortener',
		description:
			'Scalable URL shortening service with efficient hashing and routing logic, PostgreSQL persistence, and Docker Compose containerization.',
		tech: ['Go', 'PostgreSQL', 'Docker'],
		repoUrl: 'https://github.com/kaanchinar/url-shortener'
	},
	{
		name: 'Repart',
		description:
			'Full-stack marketplace platform for second-hand phone trading with escrow system, admin panel, moderation workflow, and 2FA via WhatsApp/SMS OTP.',
		tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Twilio'],
		repoUrl: 'https://github.com/kaanchinar/repart'
	},
	{
		name: 'PetpetAPI',
		description:
			'REST API for a pet shop e-commerce platform built with C# and .NET Core, demonstrating API design patterns with Entity Framework.',
		tech: ['C#', '.NET Core', 'Entity Framework'],
		repoUrl: 'https://github.com/kaanchinar/PetpetAPI'
	},
	{
		name: 'mdtobb',
		description:
			'Open-source Markdown to Bulletin Board Code (BBCode) converter published under the MIT License.',
		tech: ['JavaScript'],
		repoUrl: 'https://github.com/kaanchinar/mdtobb'
	},
	{
		name: 'kyocera-ma-ppd',
		description:
			'Open-source PPD files and software for Kyocera printers on Arch Linux, solving real hardware compatibility issues.',
		tech: ['Shell', 'Arch Linux'],
		repoUrl: 'https://github.com/kaanchinar/kyocera-ma-ppd'
	}
];
