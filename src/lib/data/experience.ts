export interface Experience {
	company: string;
	year: string;
	role: string;
	engagement: string;
	stack: string[];
	project: string;
	highlights: string[];
}

export const experience: Experience[] = [
	{
		company: 'Gluon',
		year: 'December 2025 — Present',
		role: 'DevOps Engineer',
		engagement: 'Full-time',
		stack: ['Kubernetes', 'Helm', 'GitLab CI/CD', 'Terraform', 'ArgoCD', 'Ansible', 'GitOps'],
		project: 'Gluon smart app',
		highlights: [
			'Built GitOps-driven deployment pipelines reducing release friction across teams.',
			'Maintained Kubernetes clusters and infrastructure-as-code for production workloads.',
			'Automated secret rotation and certificate management with Vault and cert-manager.',
			'Built end-to-end GitLab CI/CD pipelines (lint, build, test, security scan, deploy) from scratch, reducing deployment time and manual errors',
			'Implemented Identity Provider (IdP) and Single Sign-On (SSO) integration for secure authentication across services.'
		]
	},
	{
		company: 'DOST DIC',
		year: 'February 2026 - June 2026',
		role: 'DevOps Engineer',
		engagement: 'Internship',
		stack: ['Kubernetes', 'Helm', 'Terraform', 'Ansible', 'ArgoCD', 'Docker', 'GitHub Actions'],
		project: 'Infrastructure Department',
		highlights: [
			'Deployed and managed Kubernetes clusters for production and staging environments.',
			'Developed Ansible playbooks to automate server configuration and infrastructure provisioning.',
			'Implemented Infrastructure as Code (IaC) principles using Terraform to manage cloud resources.',
			'Administered Linux VMs, handled monitoring setup, and performed root cause analysis for production issues.',
			'Deployed containerized backend services using Docker and Docker Compose.'
		]
	},
	{
		company: 'Sciencehub.az',
		year: 'January 2025 - February 2025',
		role: 'Full-stack Engineer',
		engagement: 'Full-time',
		stack: ['Node.js', 'Express', 'PostgreSQL', 'TypeScript', 'Next.js', 'Docker', 'Dokploy'],
		project: '',
		highlights: [
			'Built CI/CD pipeline from scratch and optimized build time.',
			'Containerized full-stack application (Next.js + Express) using Docker.',
			'Configured production deployment environment using Dokploy.',
			'Migrated API architecture from REST to tRPC for improved type safety and performance.'
		]
	}
];
