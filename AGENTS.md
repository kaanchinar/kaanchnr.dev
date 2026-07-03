# AGENTS.md

This file documents `kaanchnr.dev` for AI coding agents. It describes the actual state of the project as found in the repository, not a future design.

## Project overview

`kaanchnr.dev` is a personal portfolio site scaffolded with the Svelte CLI (`sv`). At the moment it contains the generated SvelteKit starter pages plus a small **Better Auth** email/password demo. A detailed product/design plan for the portfolio lives in [`PLAN.md`](./PLAN.md) but has **not yet been implemented**.

## Technology stack

| Layer             | Choice                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| Framework         | SvelteKit 2 with Svelte 5                                                                      |
| Language          | TypeScript 6, strict mode                                                                      |
| Runtime target    | Cloudflare Workers                                                                             |
| SvelteKit adapter | `@sveltejs/adapter-cloudflare`                                                                 |
| Styling           | Tailwind CSS v4 (`@tailwindcss/vite`), with `@tailwindcss/forms` and `@tailwindcss/typography` |
| Markdown content  | `mdsvex` for `.md` and `.svx` files                                                            |
| Authentication    | Better Auth (minimal build) with Drizzle ORM adapter                                           |
| Database          | SQLite via libSQL (`@libsql/client`) + Drizzle ORM + `drizzle-kit`                             |
| Package manager   | Bun (`bun.lock`)                                                                               |
| Build tooling     | Vite 8, Wrangler 4                                                                             |

## Project structure

```
src/
  app.html                # HTML shell
  app.d.ts                # App-level types (Locals, Platform env)
  hooks.server.ts         # Global server hook: loads session, mounts Better Auth handler
  lib/
    index.ts              # Public $lib re-exports (empty placeholder)
    assets/               # Assets imported by components (favicon, etc.)
    server/               # Server-only code — never import into client files
      auth.ts             # Better Auth configuration
      db/
        index.ts          # libSQL client + Drizzle ORM instance
        schema.ts         # Application schema (task table + re-export of auth schema)
        auth.schema.ts    # Better Auth user/session/account/verification tables
  routes/
    +layout.svelte        # Root layout; imports layout.css and favicon
    layout.css            # Tailwind CSS v4 entry point
    +page.svelte          # Home page placeholder
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
```

The project follows SvelteKit's filesystem-based routing. Server-only modules are placed under `$lib/server` and must only be imported by server code (`+page.server.ts`, `hooks.server.ts`, etc.).

## Build, dev, and preview commands

Use `bun` to run scripts:

| Command               | What it does                                                      |
| --------------------- | ----------------------------------------------------------------- |
| `bun run dev`         | Start the Vite dev server                                         |
| `bun run build`       | Generate Wrangler types and build for Cloudflare Workers          |
| `bun run preview`     | Preview the production build locally with Wrangler on port `4173` |
| `bun run check`       | `wrangler types --check` + `svelte-kit sync` + `svelte-check`     |
| `bun run check:watch` | Watch mode for `svelte-check`                                     |
| `bun run lint`        | `prettier --check . && eslint .`                                  |
| `bun run format`      | `prettier --write .`                                              |
| `bun run gen`         | Regenerate `worker-configuration.d.ts` from `wrangler.jsonc`      |

Build output is written to `.svelte-kit/cloudflare/`:

- `.svelte-kit/cloudflare/_worker.js` — the Cloudflare Worker entry point
- `.svelte-kit/cloudflare/_app/` — hashed static assets served through the `ASSETS` binding

`wrangler.jsonc` points `main` and `assets.directory` at this output.

## Code style and conventions

- **Prettier**: tabs, single quotes, no trailing commas, print width `100`, with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`. Svelte files use the `svelte` parser. `tailwindStylesheet` is set to `./src/routes/layout.css`.
- **ESLint**: flat config using `@eslint/js`, `typescript-eslint`, `eslint-plugin-svelte/recommended`, and Prettier compatibility. ESLint respects `.gitignore`.
- **Svelte runes mode** is forced for all project files except those inside `node_modules` (`vite.config.ts`).
- **Tailwind CSS v4** is configured entirely in CSS: `@import 'tailwindcss';` plus `@plugin` directives in `src/routes/layout.css`. There is no `tailwind.config.js`.
- VS Code is configured to associate `*.css` with Tailwind and recommends the Svelte, Prettier, ESLint, and Tailwind extensions.
- Prettier ignores lock files, `static/`, and `drizzle/` (see `.prettierignore`).

## Testing

There is no test framework configured and no tests in the repository. Quality checks are limited to `svelte-check`, ESLint, and Prettier.

## Database and migrations

Drizzle configuration: [`drizzle.config.ts`](./drizzle.config.ts)

- **Dialect**: SQLite
- **Schema file**: `src/lib/server/db/schema.ts`
- **Client**: `@libsql/client` wrapped by `drizzle-orm/libsql`

Database scripts:

| Command               | Purpose                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `bun run db:push`     | Push schema changes to the database                                         |
| `bun run db:generate` | Generate migration SQL files                                                |
| `bun run db:migrate`  | Apply pending migrations                                                    |
| `bun run db:studio`   | Open Drizzle Studio                                                         |
| `bun run auth:schema` | Regenerate `src/lib/server/db/auth.schema.ts` from `src/lib/server/auth.ts` |

Current local development uses `DATABASE_URL=file:local.db` (documented in `.env.example`). SQLite `.db` files are gitignored, but `local.db` exists in the working directory.

## Authentication

Authentication is handled by **Better Auth** in `src/lib/server/auth.ts`:

- Drizzle ORM adapter (`provider: 'sqlite'`)
- Email/password authentication enabled
- `sveltekitCookies(getRequestEvent)` plugin installed **last**, as required by Better Auth for SvelteKit cookie support

`src/hooks.server.ts`:

1. Calls `auth.api.getSession()` on every request.
2. Attaches `user` and `session` to `event.locals`.
3. Passes the request through `svelteKitHandler()` so Better Auth API routes are served.

Better Auth's default API base path is `/api/auth/*` (not customized in the config). Demo pages under `/demo/better-auth/*` show a login form, registration, and a protected page that redirects unauthenticated users to `/demo/better-auth/login`.

## Environment variables and secrets

The following variables are required (see `.env.example` and the generated `worker-configuration.d.ts`):

| Variable             | Purpose                                                                         |
| -------------------- | ------------------------------------------------------------------------------- |
| `DATABASE_URL`       | libSQL database URL, e.g. `file:local.db` locally or `libsql://…` in production |
| `ORIGIN`             | Public origin used by Better Auth                                               |
| `BETTER_AUTH_SECRET` | Secret key for Better Auth; use a 32-character high-entropy value in production |

These are read via `$env/dynamic/private` on the server. On Cloudflare they come from the Worker environment (`event.platform.env` / Wrangler secrets). `ASSETS` is the static-assets binding generated automatically by the Cloudflare adapter.

Do not commit `.env`. `.env.example` documents the required variables.

## Deployment

- **Target**: Cloudflare Workers.
- **Build**: `bun run build` produces the Worker bundle and static assets.
- **Preview**: `bun run preview` runs the Worker locally with Wrangler.
- **Deploy**: `bunx wrangler deploy` (uses `wrangler.jsonc`). There are no GitHub Actions or other CI/CD workflows in the repository.

`wrangler.jsonc` settings:

- `compatibility_date`: `2026-06-27`
- `compatibility_flags`: `["nodejs_als"]`
- `main`: `.svelte-kit/cloudflare/_worker.js`
- `assets.directory`: `.svelte-kit/cloudflare`

## Security considerations

- Keep `BETTER_AUTH_SECRET` secret and high-entropy; never expose it to the client.
- Only import server-only code (`$lib/server/*`) from server files. The SvelteKit build will reject client imports, but avoid accidental leakage.
- The `sveltekitCookies` plugin must remain the last entry in the Better Auth plugins array.
- Keep Better Auth and its dependencies up to date.
- The current demo uses plain email/password without email verification enabled; treat it as a scaffold, not a production auth flow.

## Current state and gotchas

- The project is still the starter scaffold plus a Better Auth demo. The portfolio design and content described in `PLAN.md` are not yet built.
- `worker-configuration.d.ts` is generated by `bun run gen` and is referenced by `tsconfig.json`. Regenerate it whenever `wrangler.jsonc` or environment variables change.
- `bun run lint` currently reports Prettier formatting warnings in `PLAN.md` and `src/lib/server/db/auth.schema.ts`. Run `bun run format` to fix them.
- In a clean working tree, `bun run check` passes and `bun run build` passes. If you run `bun run build` first, `wrangler types` may add a `mainModule` import to `worker-configuration.d.ts` that pulls the bundled Worker into `svelte-check` and produces spurious type errors. To recover, delete `.svelte-kit/output` and `.svelte-kit/cloudflare`, rerun `bun run gen`, and then run `bun run check`.
- There are no automated tests.
