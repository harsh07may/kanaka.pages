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

- `src/app/` — App Router pages and layouts. `layout.tsx` applies global fonts and `globals.css`. `page.tsx` is the home page.
- `src/lib/posts.ts` — Data layer. Currently uses an in-memory `mockPosts` array. Exports `getPosts()`, `getPost(slug)`, and `getRelatedPosts(slug, limit)`. This is the layer to replace when adding a real CMS or markdown file system.
- `src/lib/types.ts` — Shared TypeScript interfaces. `Post` has a `color` discriminated union (`'yellow' | 'red' | 'blue'`) used to drive per-card theming.

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
