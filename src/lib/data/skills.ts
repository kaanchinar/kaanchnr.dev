export type SkillCategory = 'Infra' | 'Languages' | 'Tools' | 'Observability' | 'Backend';

export interface Skill {
	name: string;
	icon: string;
	category: SkillCategory;
}

export const skills: Skill[] = [
	{ name: 'Kubernetes', icon: 'kubernetes', category: 'Infra' },
	{ name: 'Terraform', icon: 'terraform', category: 'Infra' },
	{ name: 'Ansible', icon: 'ansible', category: 'Infra' },
	{ name: 'ArgoCD', icon: 'argo', category: 'Infra' },
	{ name: 'Helm', icon: 'helm', category: 'Infra' },
	{ name: 'Go', icon: 'go', category: 'Languages' },
	{ name: '.NET', icon: 'dotnet', category: 'Languages' },
	{ name: 'Next.js', icon: 'nextjs', category: 'Languages' },
	{ name: 'Prometheus', icon: 'prometheus', category: 'Observability' },
	{ name: 'Grafana', icon: 'grafana', category: 'Observability' },
	{ name: 'Vault', icon: 'vault', category: 'Tools' },
	{ name: 'GitHub Actions', icon: 'githubactions', category: 'Tools' },
	{ name: 'Docker', icon: 'docker', category: 'Tools' },
	{ name: 'PostgreSQL', icon: 'postgresql', category: 'Backend' },
	{ name: 'GitLab', icon: 'gitlab', category: 'Infra' },
	{ name: 'TypeScript', icon: 'typescript', category: 'Languages' }
];
