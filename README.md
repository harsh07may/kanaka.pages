# kanaka.pages

A bold, interactive personal blog built with **Next.js 16** (App Router) and a custom **Raw Impact** neobrutalist design system on Tailwind CSS v4.

## Getting Started

This project uses [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev          # Start the development server
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

Other commands:

```bash
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run Biome linter (biome check)
pnpm format       # Auto-format with Biome (biome format --write)
```

## Content

Blog posts and homepage content are managed through a custom admin panel backed by PostgreSQL (Drizzle ORM):

- Posts and the homepage hero content (bio, places, books, contacts, etc.) are stored in the database, not in files.
- Edit content at [http://localhost:3000/admin](http://localhost:3000/admin) (password-protected). A small `⚡` link in the site footer also leads here.
- Hero content has its own editor at `/admin/hero`.
- Set up the database with `pnpm db:push` (see `.env.example` for required environment variables), then optionally run `pnpm db:seed-hero` to seed hero content from the legacy JSON files in `content/hero/`.

## Architecture

See [`CLAUDE.md`](./CLAUDE.md) for a detailed overview of the project structure, design system, and content model.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Keystatic Documentation](https://keystatic.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
