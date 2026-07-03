# Portfolio Site Prompt — SvelteKit, Monochrome Minimalist (inspired by siadialiga.com)

Use this as a build prompt (for yourself, Claude Code, or any AI coding assistant) to build your SvelteKit portfolio.

## 1. Design Philosophy

- Monochrome, minimalist, developer-portfolio aesthetic. No loud colors — grayscale palette with a single accent used sparingly (or none at all).
- Generous whitespace, small/medium type scale, thin borders/dividers instead of heavy card shadows.
- Feels like a well-typeset document/CLI tool rather than a "marketing landing page."
- Content-first: no hero illustrations, no gradients, no stock photography.
- Everything above the fold should read like a professional bio card, not a hero banner.

## 2. Theming

- Support three theme modes: **System / Light / Dark**, toggled via a small segmented control (three pill buttons: System, Light, Dark) usually placed near the top-right or inside the profile card.
- Respect `prefers-color-scheme` when in "System" mode.
- Store the user's choice in `localStorage` and hydrate without flash-of-wrong-theme (inline script in `app.html` that sets a `data-theme` attribute on `<html>` before hydration).
- Colors: near-black / near-white backgrounds, gray-scale text hierarchy (e.g. `#0a0a0a` / `#fafafa` backgrounds, grays for secondary text, a neutral border color like `#e5e5e5` / `#262626`).

## 3. Global Layout

Single-column, centered content container (max-width ~640–720px), consistent vertical rhythm between sections. Top of page:

- Circular avatar image.
- Full name (large, bold).
- One-line role/title (e.g. "Software Engineer", "DevOps Engineer").
- Location line with a **live local clock** next to it (e.g. "Baku, Azerbaijan · 14:32 (GMT+4)") — updates client-side every second/minute.
- Theme toggle (System/Light/Dark segmented control).
- Row of social links as small icon buttons (GitHub, LinkedIn, X/Twitter, etc.) — clicking one **copies the link and shows a "Copied!" toast/tooltip** rather than navigating away directly (or copies email if it's a contact icon).
- Short 2–3 sentence bio/summary paragraph.

## 4. Navbar — Island Style (your addition)

Since this is a multi-page SvelteKit site (not a single-page scroller like the reference), add a **floating "island" navbar**:

- A pill-shaped, floating nav bar (rounded-full, subtle border + backdrop-blur, slight shadow), fixed at the top-center (or bottom-center, mobile-app style) of the viewport.
- Three items only: **Home**, **Blog**, **Contact**.
- Active route gets a highlighted pill/background behind the label (animated sliding indicator is a nice touch, e.g. using a Svelte transition or a simple `translateX` on the active pill).
- Compact height (~44–52px), small icon + label or label-only, monochrome styling matching the rest of the site (no color accent unless you want one small accent for the active state).
- Sticky/fixed so it's visible while scrolling, with a slight opacity/blur backdrop so content scrolls underneath it.
- On mobile, keep the same island centered near the bottom or top — do not collapse into a hamburger menu; the whole point is it stays a small persistent island.

Routes:

- **Home** → `/` — the profile/bio/experience/projects/skills page (same content model as section 3 & 5).
- **Blog** → `/blog` — list of posts; `/blog/[slug]` for individual posts.
- **Contact** → `/contact` — a contact form (see section 7).

## 5. Home Page Sections (in order)

1. **Profile header** (section 3 above).
2. **Bio paragraph.**
3. **Experience** — timeline-style list, each entry:
   - Company/client name (bold).
   - Year (right-aligned or as a small label).
   - Tags line: role type · engagement type · tech stack (e.g. "Infrastructure · Internship · Kubernetes, Ansible, Terraform").
   - Bolded sub-heading for the specific engagement/project.
   - Bullet list of 2–4 accomplishments, concise, past tense, results-oriented.
4. **Blog preview** — show latest 1–2 posts as cards (title, date, tag/category, short excerpt), with a "View archives" link to `/blog`.
5. **Projects** — responsive grid of cards, each:
   - Project name, optional "Featured" badge for standout projects.
   - Tech stack tag(s).
   - One-line description.
   - Whole card links out to the GitHub repo (or live demo).
6. **GitHub Activity** — embed a GitHub contribution graph (e.g. via an image API like `ghchart.rshah.org/<username>` or a small self-fetching component using the GitHub API) — keep it monochrome to match the theme.
7. **Skills** — flat list/wrap of skill "chips" (no proficiency bars, just tags), grouped loosely if you want (Infra/DevOps, Backend, Languages, Tools).
8. **Languages** — simple list: language name + proficiency level (Native / B2 / etc.).
9. **Footer** — repeat social icon row + "© [year] [Your Name]".

## 6. Blog — Markdown-based, No CMS

- Use **mdsvex** (SvelteKit + Markdown, lets you write Svelte components inside `.md` files) or plain Markdown parsed with a library like `marked`/`remark` if you don't need embedded components. mdsvex is the more idiomatic SvelteKit choice.
- Store posts as files in the repo, e.g. `src/posts/*.md`, with frontmatter:
  ```md
  ---
  title: 'New Portfolio: My First Blog Post'
  date: '2026-04-19'
  tags: ['Portfolio']
  excerpt: 'This is the first blog post on my new portfolio...'
  ---
  ```
- At build time, use `import.meta.glob` to read all posts, parse frontmatter, sort by date, and generate:
  - `/blog` — list page (title, date, tag, excerpt, same card styling as the home preview).
  - `/blog/[slug]` — full post page rendered from Markdown, styled with a `prose`-like typography scale (headings, code blocks, blockquotes) matching the monochrome theme.
- No database, no admin panel — new post = new `.md` file + git commit + redeploy.
- Optional nice-to-haves: reading time estimate, simple tag filter on `/blog`, RSS feed route (`/blog/rss.xml`) generated at build time.

## 7. Contact Page

- Since there's no backend CMS, keep the contact form lightweight:
  - Simple form (Name, Email, Message) styled consistently with the rest of the site (thin borders, no heavy shadows).
  - Submit via a form-handling service (e.g. Formspree, Resend, or a small SvelteKit `+page.server.ts` action that emails you) — pick based on whether you want zero backend (Formspree) or full control (server action + email API).
  - Show a simple success/error state inline after submit (no page reload, use `use:enhance` if using SvelteKit form actions).
  - Optionally include your email/socials again below the form as a fallback.

## 8. Tech Stack Summary

- **Framework:** SvelteKit
- **Content:** mdsvex for blog posts (Markdown + frontmatter, no CMS)
- **Styling:** Tailwind CSS (matches the utility-driven, minimal aesthetic) or plain CSS with custom properties for theming — either works, Tailwind will be faster to match spacing/typography precisely
- **Theme persistence:** `localStorage` + inline `app.html` script to avoid flash of unstyled theme
- **Icons:** a lightweight icon set (e.g. `lucide-svelte`) for social/nav icons
- **Deployment:** static-friendly (adapter-static or adapter-auto), since there's no CMS/database — this can be a fully static site rebuilt on each git push

## 9. Content Architecture — Data vs. Code (Functional Logic)

This is the most important structural decision on the site. Do **not** hardcode Experience/Projects/Skills/Languages as raw markup in `+page.svelte`. Split content into two buckets:

### 9.1 Structured, list-like data → typed data files

Experience, Projects, Skills, Languages, and Social links are arrays of objects with a fixed shape — treat them as data, not markup. Put them under `src/lib/data/`:

```
src/lib/data/
  experience.ts
  projects.ts
  skills.ts
  languages.ts
  socials.ts
```

Example `src/lib/data/projects.ts`:

```ts
export interface Project {
	name: string;
	description: string;
	tech: string[];
	repoUrl: string;
	liveUrl?: string;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		name: 'ScienceHub.az',
		description: 'Academic paper sharing platform.',
		tech: ['Next.js', 'PostgreSQL', 'tRPC'],
		repoUrl: 'https://github.com/you/sciencehub',
		featured: true
	}
	// ...
];
```

`+page.svelte` stays declarative:

```svelte
<script>
	import { projects } from '$lib/data/projects';
</script>

{#each projects as project}
	<ProjectCard {project} />
{/each}
```

Benefits: type safety (TS flags missing fields), one place to edit content, and clean separation between _data_ (what's there) and _presentation_ (`ProjectCard.svelte`, `ExperienceRow.svelte` control how it looks). Adding a new job or project later is a one-array edit — the page layout and styling never need to change.

### 9.2 Long-form prose → Markdown (mdsvex)

Reserve Markdown for content whose length/structure varies per entry and benefits from rich formatting (headings, code blocks, blockquotes) — this is **only the blog** (see Section 6). Don't use Markdown+frontmatter for Experience/Projects entries; it's overkill for "name, year, 3 bullets" and loses you type-checking and easy sorting/filtering that a plain array gives you for free.

The bio/about paragraph is just a short string — either inline in the page or a one-off export in `src/lib/data/about.ts`. Not worth a system for 2–3 sentences.

### 9.3 Full logic map

```
src/lib/data/            → structured content (experience, projects, skills, socials, about)
src/lib/components/      → presentational components (ProjectCard, ExperienceRow, SkillChip, IslandNav, ThemeToggle)
src/lib/assets/          → project screenshots (optional), avatar image
src/posts/*.md           → blog posts (mdsvex, frontmatter)
src/routes/+page.svelte  → imports data arrays, renders sections via {#each}
src/routes/blog/         → reads posts via import.meta.glob, list + [slug] pages
src/routes/contact/      → form (+page.server.ts action or Formspree)
```

### 9.4 Skills — icon/logo handling

Do not hand-source or hand-draw brand logos. Use an existing icon package that ships tech-brand SVGs:

- **`simple-icons`** (recommended) — huge brand-icon library covering Kubernetes, Go, .NET, Terraform, Grafana, Prometheus, ArgoCD, Vault, Helm, etc. Icons are single-path SVGs, so setting `fill: currentColor` makes every icon automatically inherit your text color and theme (light/dark) for free — this is the best fit for a monochrome design.
- Alternative: `devicon` — broader dev-tool coverage but many icons are multi-color by default; only use their "plain"/single-color variants if you go this route, or they'll clash with the grayscale aesthetic.

Each skill entry stores an icon slug that maps to the simple-icons name:

```ts
export interface Skill {
	name: string;
	icon: string; // simple-icons slug, e.g. 'kubernetes', 'go', 'dotnet'
	category: 'Infra' | 'Languages' | 'Tools' | 'Observability';
}

export const skills: Skill[] = [
	{ name: 'Kubernetes', icon: 'kubernetes', category: 'Infra' },
	{ name: 'Go', icon: 'go', category: 'Languages' },
	{ name: '.NET', icon: 'dotnet', category: 'Languages' }
];
```

A single `SkillChip.svelte` component looks up the icon by slug, renders it at a fixed small size (e.g. 16–20px) with `currentColor` fill, next to the skill name — no per-skill custom markup needed, and new skills are a one-line data addition.

## 10. Things to Deliberately Change from the Reference

- Replace single-page anchor navigation with real routes (`/`, `/blog`, `/blog/[slug]`, `/contact`) behind the island navbar.
- Your content: DevOps/backend experience (Gluon, DOST DIC), ScienceHub.az, homelab k3s cluster, Go/​.NET projects, skills list (Kubernetes, ArgoCD, Terraform, Go, .NET, etc.) in place of the reference's frontend-focused content.
- Add the floating island navbar (not present in the reference, which is single-page).
