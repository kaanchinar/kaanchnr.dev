# AGENTS.md

This file documents `kaanchnr.dev` for AI coding agents. It describes the actual state of the project as found in the repository, not a future design.

## Project overview

`kaanchnr.dev` is the personal portfolio site of Kaan Chinar, built with SvelteKit and deployed to Cloudflare Workers at the custom domain `kaanchnr.dev`. It contains:

- A single-page portfolio home (`/`) with about, experience, projects, skills, languages, and latest blog posts
- A blog (`/blog`, `/blog/[slug]`) backed by Markdown posts in `src/posts/` via mdsvex
- A contact page (`/contact`) with Cloudflare Turnstile spam protection and email delivery via Resend
- A **Better Auth** email/password demo under `/demo/better-auth/*` (scaffold, not production auth)
- Light/dark theming via CSS custom properties and a `data-theme` attribute

The original product/design plan lives in [`PLAN.md`](./PLAN.md).

## Technology stack

| Layer             | Choice                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| Framework         | SvelteKit 2 with Svelte 5 (runes mode)                                                         |
| Language          | TypeScript 6, strict mode                                                                      |
| Runtime target    | Cloudflare Workers                                                                             |
| SvelteKit adapter | `@sveltejs/adapter-cloudflare`                                                                 |
| Styling           | Tailwind CSS v4 (`@tailwindcss/vite`), with `@tailwindcss/forms` and `@tailwindcss/typography` |
| Markdown content  | `mdsvex` for `.md` and `.svx` files                                                            |
| Authentication    | Better Auth (minimal build) with Drizzle ORM adapter                                           |
| Database          | Cloudflare D1 (SQLite) + Drizzle ORM + `drizzle-kit`                                           |
| Email             | Resend (`resend`)                                                                              |
| Spam protection   | Cloudflare Turnstile (`svelte-turnstile`)                                                      |
| Icons             | `lucide-svelte`, `simple-icons`                                                                |
| Testing           | Vitest 4 + `@testing-library/svelte` + jsdom, V8 coverage                                      |
| Package manager   | Bun (`bun.lock`)                                                                               |
| Build tooling     | Vite 8, Wrangler 4                                                                             |

## Project structure

```
src/
  app.html                # HTML shell
  app.d.ts                # App-level types (Locals incl. auth/user/session, Platform env)
  hooks.server.ts         # Creates D1 db + Better Auth per request, loads session, mounts auth handler
  lib/
    index.ts              # Public $lib re-exports (empty placeholder)
    assets/               # Assets imported by components (favicon, avatar)
    components/           # Portfolio UI components
      IslandNav.svelte    # Floating navigation island
      ThemeToggle.svelte  # Light/dark theme switcher
      LiveClock.svelte    # Live local-time clock
      SocialLinks.svelte  # Social icon links (simple-icons)
      ExperienceRow.svelte
      ProjectCard.svelte
      SkillChip.svelte
      PostCard.svelte
    data/                 # Static portfolio content
      about.ts            # Name, role, bio
      experience.ts       # Work history
      projects.ts         # Project list (+ projects.test.ts)
      skills.ts           # Skill tags
      languages.ts        # Spoken languages
      socials.ts          # Social profiles (+ socials.test.ts)
    posts.ts              # Blog post loader: import.meta.glob over /src/posts/*.md
    server/               # Server-only code — never import into client files
      auth.ts             # createAuth(db) factory: Better Auth configuration
      db/
        index.ts          # createDb(D1Database) factory: drizzle-orm/d1 instance
        schema.ts         # Application schema (task table + re-export of auth schema)
        auth.schema.ts    # Generated Better Auth user/session/account/verification tables
  posts/                  # Blog posts as .md files with frontmatter (title, date, tags, excerpt)
  routes/
    +layout.svelte        # Root layout; imports layout.css, favicon, IslandNav
    layout.css            # Tailwind CSS v4 entry point + theme tokens
    +page.svelte          # Portfolio home page
    blog/
      +page.svelte        # Post list
      [slug]/+page.svelte # Individual post
    contact/
      +page.server.ts     # Form action: validate → Turnstile verify → Resend send
      +page.svelte        # Contact form with svelte-turnstile widget
      validate.ts         # Input validation (+ validate.test.ts)
      turnstile.ts        # Turnstile siteverify helper (+ turnstile.test.ts)
    demo/
      +page.svelte        # Demo index
      better-auth/
        +page.server.ts   # Protected page load + sign-out action
        +page.svelte      # Logged-in user view
        login/
          +page.server.ts # Sign-in / sign-up actions
          +page.svelte    # Login/register form

static/
  robots.txt              # Allow all crawlers
  photo*.png/webp         # Profile photo in multiple sizes/formats
```

The project follows SvelteKit's filesystem-based routing. Server-only modules are placed under `$lib/server` and must only be imported by server code (`+page.server.ts`, `hooks.server.ts`, etc.).

## Build, dev, and preview commands

Use `bun` to run scripts:

| Command                 | What it does                                                      |
| ----------------------- | ----------------------------------------------------------------- |
| `bun run dev`           | Start the Vite dev server                                         |
| `bun run build`         | Generate Wrangler types and build for Cloudflare Workers          |
| `bun run preview`       | Preview the production build locally with Wrangler on port `4173` |
| `bun run check`         | `wrangler types --check` + `svelte-kit sync` + `svelte-check`     |
| `bun run check:watch`   | Watch mode for `svelte-check`                                     |
| `bun run lint`          | `prettier --check . && eslint . && secretlint`                    |
| `bun run format`        | `prettier --write .`                                              |
| `bun run secretlint`    | Scan for leaked secrets                                           |
| `bun run test`          | Run Vitest once                                                   |
| `bun run test:watch`    | Vitest watch mode                                                 |
| `bun run test:coverage` | Vitest with V8 coverage report                                    |
| `bun run gen`           | Regenerate `worker-configuration.d.ts` from `wrangler.jsonc`      |

Build output is written to `.svelte-kit/cloudflare/`:

- `.svelte-kit/cloudflare/_worker.js` — the Cloudflare Worker entry point
- `.svelte-kit/cloudflare/_app/` — hashed static assets served through the `ASSETS` binding

`wrangler.jsonc` points `main` and `assets.directory` at this output.

## Code style and conventions

- **Prettier**: tabs, single quotes, no trailing commas, print width `100`, with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`. Svelte files use the `svelte` parser. `tailwindStylesheet` is set to `./src/routes/layout.css`.
- **ESLint**: flat config using `@eslint/js`, `typescript-eslint`, `eslint-plugin-svelte/recommended`, and Prettier compatibility. ESLint respects `.gitignore`.
- **Svelte runes mode** is forced for all project files except those inside `node_modules` (`svelte.config.js`).
- **Tailwind CSS v4** is configured entirely in CSS: `@import 'tailwindcss';` plus `@plugin` directives in `src/routes/layout.css`. There is no `tailwind.config.js`.
- **Theming**: colors are CSS custom properties (`--bg`, `--fg`, `--bg-elevated`, `--muted`, `--border`, `--accent`) exposed to Tailwind via `@theme` in `layout.css`. Dark mode is toggled with `[data-theme='dark']` on the root element (see `ThemeToggle.svelte`); use the semantic color utilities (`bg-bg`, `text-fg`, `text-muted`, etc.) instead of hardcoded colors.
- **Pre-commit hook**: Husky runs `lint-staged`, which applies secretlint to all staged files, ESLint to `*.{js,ts,svelte}`, and Prettier to most text files (`.lintstagedrc.json`).
- VS Code is configured to associate `*.css` with Tailwind and recommends the Svelte, Prettier, ESLint, and Tailwind extensions.
- Prettier ignores lock files, `static/`, and `drizzle/` (see `.prettierignore`).

## Testing

Vitest is configured in `vite.config.ts` with the `jsdom` environment and `vitest.setup.ts` (imports `@testing-library/jest-dom/vitest`). Coverage uses the V8 provider and excludes config files, `src/app.d.ts`, and `src/hooks.server.ts`.

Current tests are colocated unit tests:

- `src/lib/data/projects.test.ts`, `src/lib/data/socials.test.ts` — data integrity
- `src/routes/contact/validate.test.ts` — contact form validation
- `src/routes/contact/turnstile.test.ts` — Turnstile verification helper

Run with `bun run test`. Quality checks also include `svelte-check`, ESLint, Prettier, and secretlint.

## Database and migrations

Drizzle configuration: [`drizzle.config.ts`](./drizzle.config.ts)

- **Dialect**: SQLite
- **Schema file**: `src/lib/server/db/schema.ts`
- **Production**: Cloudflare D1, bound as `DB` in `wrangler.jsonc`; the Worker accesses it via `event.platform.env.DB` and `createDb()` (`drizzle-orm/d1`)
- **Local tooling**: `drizzle-kit` commands run against a local SQLite file `./local.db` (`better-sqlite3` is installed for this)

Database scripts:

| Command               | Purpose                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `bun run db:push`     | Push schema changes to the database                                         |
| `bun run db:generate` | Generate migration SQL files into `drizzle/`                                |
| `bun run db:migrate`  | Apply pending migrations                                                    |
| `bun run db:studio`   | Open Drizzle Studio                                                         |
| `bun run auth:schema` | Regenerate `src/lib/server/db/auth.schema.ts` from `src/lib/server/auth.ts` |

SQLite `.db` files are gitignored.

## Authentication

Authentication is handled by **Better Auth** in `src/lib/server/auth.ts`:

- `createAuth(db)` factory — the Drizzle adapter (`provider: 'sqlite'`) is injected per request
- Email/password authentication enabled
- `sveltekitCookies(getRequestEvent)` plugin installed **last**, as required by Better Auth for SvelteKit cookie support

`src/hooks.server.ts` runs on every request:

1. Creates the Drizzle db from `event.platform.env.DB` (throws if `event.platform` is unavailable).
2. Creates the Better Auth instance and attaches it to `event.locals.auth`.
3. Calls `auth.api.getSession()` and attaches `user`/`session` to `event.locals` when present.
4. Passes the request through `svelteKitHandler()` so Better Auth API routes are served.

Better Auth's default API base path is `/api/auth/*` (not customized in the config). Demo pages under `/demo/better-auth/*` show a login form, registration, and a protected page that redirects unauthenticated users to `/demo/better-auth/login`.

## Contact form

`src/routes/contact/+page.server.ts` handles submissions in three stages:

1. **Validation** (`validate.ts`) — name/email/message checks, returns `fail(400, …)` on error.
2. **Turnstile verification** (`turnstile.ts`) — POSTs the `cf-turnstile-response` token plus client IP to Cloudflare's siteverify endpoint using `TURNSTILE_SECRET`.
3. **Email delivery** — sends via Resend (`RESEND_API_KEY`, dynamic `import('resend')`) from `RESEND_FROM_EMAIL` to `RESEND_TO_EMAIL` with the submitter's address as `replyTo`.

The page's `load` passes `PUBLIC_TURNSTILE_SITE_KEY` to the client for the `svelte-turnstile` widget.

## Environment variables and secrets

The following variables are required (see `.env.example` and the generated `worker-configuration.d.ts`):

| Variable                    | Purpose                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `ORIGIN`                    | Public origin used by Better Auth                                                           |
| `BETTER_AUTH_SECRET`        | Secret key for Better Auth; use a 32-character high-entropy value in production             |
| `RESEND_API_KEY`            | Resend API key for the contact form                                                         |
| `RESEND_FROM_EMAIL`         | Sender address (default `contact@kaanchnr.dev`); non-secret, set in `wrangler.jsonc` `vars` |
| `RESEND_TO_EMAIL`           | Recipient address; non-secret, set in `wrangler.jsonc` `vars`                               |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public); set in `wrangler.jsonc` `vars`                      |
| `TURNSTILE_SECRET`          | Cloudflare Turnstile secret used server-side to verify contact form tokens                  |

Private variables are read via `$env/dynamic/private` on the server (and `$env/dynamic/public` for the `PUBLIC_`-prefixed site key). On Cloudflare they come from the Worker environment (`event.platform.env` / Wrangler secrets). `DB` (D1) and `ASSETS` (static assets) are bindings configured in `wrangler.jsonc`.

Do not commit `.env` (secretlint and lint-staged help catch leaks). `.env.example` documents the required variables.

## Deployment

- **Target**: Cloudflare Workers, custom domain `kaanchnr.dev` (`workers_dev: false`, `preview_urls: true`).
- **CI/CD**: `.github/workflows/ci.yml` runs three jobs on pushes/PRs to `main`:
  1. `lint` — `bun run lint`
  2. `test` — `bun run test`
  3. `deploy` (only on `main`, after lint + test pass) — `bun run build` then `bunx wrangler deploy` with `CLOUDFLARE_API_TOKEN` from GitHub secrets
- **Manual deploy**: `bun run build && bunx wrangler deploy`.
- **Preview**: `bun run preview` runs the Worker locally with Wrangler.
- **Secrets**: server secrets (`TURNSTILE_SECRET`, `RESEND_API_KEY`, `BETTER_AUTH_SECRET`) must be set on the Worker with `bunx wrangler secret put <NAME>`; non-secret config lives in `wrangler.jsonc` `vars`.

`wrangler.jsonc` settings:

- `compatibility_date`: `2026-06-27`
- `compatibility_flags`: `["nodejs_compat", "nodejs_als"]` — `nodejs_compat` is required because Better Auth (`@better-auth/utils`) imports `node:crypto`; without it `wrangler deploy` fails with "No such module node:crypto" (error 10021)
- `main`: `.svelte-kit/cloudflare/_worker.js`
- `assets.directory`: `.svelte-kit/cloudflare`
- `d1_databases`: `DB` binding → database `kaanchnr-dev`

## Security considerations

- Keep `BETTER_AUTH_SECRET`, `TURNSTILE_SECRET`, and `RESEND_API_KEY` secret; never expose them to the client. Only `PUBLIC_`-prefixed variables may reach client code.
- Only import server-only code (`$lib/server/*`) from server files. The SvelteKit build will reject client imports, but avoid accidental leakage.
- The `sveltekitCookies` plugin must remain the last entry in the Better Auth plugins array.
- Keep Better Auth and its dependencies up to date.
- secretlint runs in `bun run lint` and on every commit via lint-staged; do not bypass it.
- The auth demo uses plain email/password without email verification enabled; treat it as a scaffold, not a production auth flow.

## Current state and gotchas

- The portfolio (home, blog, contact) is implemented; the `/demo/better-auth/*` pages remain as an auth scaffold. `src/posts/` currently has no posts, so `/blog` renders "No posts yet."
- `worker-configuration.d.ts` is generated by `bun run gen` and is referenced by `tsconfig.json`. Regenerate it whenever `wrangler.jsonc` or environment variables change — otherwise `bun run check` fails at `wrangler types --check` with "Types at worker-configuration.d.ts are out of date."
- In a clean working tree (after `bun run gen`), `bun run check`, `bun run lint`, `bun run test`, and `bun run build` all pass.
- If you run `bun run build` first, `wrangler types` may add a `mainModule` import to `worker-configuration.d.ts` that pulls the bundled Worker into `svelte-check` and produces spurious type errors. To recover, delete `.svelte-kit/output` and `.svelte-kit/cloudflare`, rerun `bun run gen`, and then run `bun run check`.
- Blog posts are `.md` files in `src/posts/` with frontmatter matching `PostMetadata` in `src/lib/posts.ts` (`title`, `date`, `tags`, `excerpt`); the slug is derived from the filename.
