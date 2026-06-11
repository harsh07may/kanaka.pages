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

Blog posts and homepage content are managed with [Keystatic](https://keystatic.com/):

- Posts live as MDX files in `content/posts/*.mdx`.
- Homepage hero content (bio, places, books, contacts, etc.) lives in `content/hero/`.
- While running `pnpm dev`, edit content through the Keystatic admin UI at [http://localhost:3000/keystatic](http://localhost:3000/keystatic).

## Architecture

See [`CLAUDE.md`](./CLAUDE.md) for a detailed overview of the project structure, design system, and content model.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Keystatic Documentation](https://keystatic.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
