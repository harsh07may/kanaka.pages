# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run Biome linter (biome check)
pnpm format       # Auto-format with Biome (biome format --write)
```

No test suite is configured yet.

## Architecture

This is a **Next.js 16 App Router** personal blog project ("kanaka.pages") with a neobrutalism design aesthetic.

- `src/app/` — App Router pages and layouts:
  - `page.tsx` — home page (hero section + article grid)
  - `blogs/page.tsx` — searchable index of all posts
  - `posts/[slug]/page.tsx` — individual post view, statically generated (`dynamicParams = false`)
  - `about/`, `contact/`, `newsletter/`, `privacy/` — static content pages
  - `admin/login/` — admin login page and `login`/`logout` server actions, session-cookie based auth (`iron-session`)
  - `admin/(protected)/` — password-protected admin panel: `page.tsx` lists/deletes posts, `posts/new/` and `posts/[id]/edit/` create and edit posts via `PostForm` + MDX editor, `hero/` edits the homepage hero content, `actions.ts` holds the shared `createPost`/`updatePost`/`deletePost`/`requireAuth` server actions
  - `api/admin/upload/route.ts` — authenticated image upload endpoint (Vercel Blob)
  - `rss.xml/route.ts`, `sitemap.ts`, `robots.ts` — generated SEO/feed routes
  - `layout.tsx` applies global fonts and `globals.css`; `template.tsx` wraps pages in a `framer-motion` fade/slide transition
- `src/lib/posts.ts` — Data layer for blog posts. Reads/writes the `posts` table (PostgreSQL via Drizzle ORM). Exports `getPostSlugs()`, `getPosts()`, `getPostBySlug(slug)`, `getPostById(id)`, and `getRelatedPosts(slug, limit)`.
- `src/lib/mdx-loader.tsx` — Renders a post's MDX body via `next-mdx-remote/rsc` using the shared `mdxComponents` map.
- `src/lib/hero.ts` — Reads the homepage hero data (character bio, "where I live", places to go, brain dump, books, contacts) from the `hero_content` table, falling back to built-in defaults (`HERO_DEFAULTS`) when a section hasn't been saved yet.
- `src/lib/db/` — Drizzle ORM setup: `schema.ts` defines the `posts` and `hero_content` tables, `index.ts` creates the `db` client from `POSTGRES_URL`.
- `src/lib/types.ts` — Shared TypeScript interfaces. `Post` has a `color` discriminated union (`'yellow' | 'red' | 'blue'`) used to drive per-card theming.
- `src/mdx-components.tsx` — Custom styled HTML element renderers for MDX (headings, blockquotes, code blocks, images, etc.) plus custom components `Callout` and `ImageGrid` (`src/components/mdx/`).
- `src/components/` — UI components: `Navigation`, `Footer`, `HeroSection`, `ArticleGrid`/`ArticleCard`, `BlogSearch`, `PostHeader`, `RelatedPosts`, `AuthorCard`, `ShareButtons`, `NotebookModal`, `BackgroundShapes`, `PageTransition`. `src/components/admin/` holds `PostForm` and the MDX editor used by the admin panel.

## Content Management

Content is managed via a **custom admin panel** at `/admin` (password-protected, session cookie via `iron-session`), backed by **PostgreSQL** (Drizzle ORM). The Footer has a small `⚡` link that opens `/admin`.

- **Posts** — stored in the `posts` table (`src/lib/db/schema.ts`). Fields: `title`, `date`, `excerpt`, `color`, `tags`, `image`, `author`, `authorRole`, `authorBio`, `authorImage`, `content` (MDX). Edited via `/admin` using the `PostForm` MDX editor; supports the custom `Callout` and `ImageGrid` components.
- **Hero content** — stored in the `hero_content` table, one JSON row per section (`character`, `where-i-live`, `places-to-go`, `brain-dump`, `books`, `contacts`). Edited via `/admin/hero`. Run `pnpm db:seed-hero` once to seed the table from the legacy JSON files in `content/hero/`.
- Run `pnpm db:push` to sync the Drizzle schema to your Postgres database. See `.env.example` for required environment variables (`POSTGRES_URL`, `SESSION_SECRET`, `ADMIN_PASSWORD_HASH`, `BLOB_READ_WRITE_TOKEN`).

## Design System

The project uses a custom **Raw Impact** neobrutalist design system built on Tailwind CSS v4.

**Tailwind custom tokens** (`tailwind.config.ts`):
- Colors: Material Design-style semantic tokens (`primary`, `secondary`, `tertiary`, `surface`, etc.) plus `ink` (#000) and `canvas` (#fff)
- Shadows: `shadow-brutal` (4px), `shadow-brutal-lg` (5px), `shadow-brutal-hover` (6px)
- Fonts: `font-sans` → Hanken Grotesk, `font-mono` → JetBrains Mono

**Utility classes** added via Tailwind plugin:
- `.brutal-border` — 4px solid black border
- `.brutal-shadow` / `.brutal-shadow-lg` — hard offset box shadows
- `.brutal-hover` — scale + shadow bump on hover
- `.brutal-active` — translate + shadow removal on click

## Tooling Notes

- **Package manager**: pnpm
- **Linter/formatter**: Biome (not ESLint/Prettier). Config in `biome.json` — 2-space indents, import organization enabled.
- **Path alias**: `@/*` maps to `src/*`
- **Fonts**: Loaded via `next/font/google` in `src/app/fonts.ts` and applied as CSS variables (`--font-hanken-grotesk`, `--font-jetbrains-mono`) on `<html>`.
- **CSS**: Tailwind v4 via PostCSS. `globals.css` imports preflight and utilities, then defines base typography scales using `clamp()`.

## Agent Configuration

`.claude/` is the single source of truth for Claude Code configuration (skills, settings) in this repo. Do not reintroduce a separate `.agents/` directory — keep all skills and agent settings under `.claude/`.
