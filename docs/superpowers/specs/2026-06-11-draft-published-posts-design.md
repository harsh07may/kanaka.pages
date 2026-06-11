# Draft / Published Posts

## Problem

Posts are currently always public the moment they're saved. The admin needs a
way to write a post over time and only make it visible on the public site
once it's ready, while still being able to view it (logged in) before that
point.

## Design

### Schema

Add a `status` column to `posts` (`src/lib/db/schema.ts`):

```ts
status: text("status", { enum: ["draft", "published"] })
  .notNull()
  .default("draft"),
```

**Migration:** `pnpm db:push` will add the column with default `'draft'`. Since
all existing rows must remain publicly visible, run a one-time
`UPDATE posts SET status = 'published'` against existing rows immediately
after the push (before any new draft posts are created).

### Data layer (`src/lib/posts.ts`)

- `getPosts()`, `getPostSlugs()`, `getRelatedPosts()` — add
  `where(eq(posts.status, "published"))` (or combine with existing `where`
  clauses via `and(...)`). These back the home page, blogs index, sitemap,
  RSS feed, and related-posts sidebar — all public-facing surfaces that must
  never show drafts.
- New `getAllPosts()` — same as current `getPosts()` but with no status
  filter. Used only by the admin posts list.
- `getPostBySlug` and `getPostById` — unchanged, no status filter. They
  return the post regardless of status; visibility is enforced at the page
  level (see below).

### Post page (`src/app/posts/[slug]/page.tsx`)

After fetching the post:

```ts
if (post.status === "draft") {
  const session = await getSession();
  if (!session.isLoggedIn) notFound();
}
```

- `generateStaticParams` continues to use `getPostSlugs()` (published only),
  so draft posts are never statically generated. `dynamicParams = true`
  already allows on-demand rendering for slugs outside the static set, so a
  draft post renders dynamically when an admin requests it.
- When `post.status === "draft"` and the viewer is logged in, render the page
  normally with a small "Draft" badge near the title (in `PostHeader` or
  inline on the page) so the admin knows it isn't public yet.

### Admin UI

- `PostForm` (`src/components/admin/PostForm.tsx`): add a `status`
  `<select>` (Draft / Published) next to the existing Color select.
  - New posts default to `draft`.
  - Edits preserve `initialPost.status`.
- `readPostFields` (`src/app/admin/(protected)/actions.ts`): read and include
  `status` from the form data.
- Admin posts list (`src/app/admin/(protected)/page.tsx`):
  - Switch from `getPosts()` to `getAllPosts()` so drafts are visible to the
    admin.
  - Show a small status badge (Draft / Published) next to each post's
    title/date.
  - Add a "View" link to `/posts/[slug]` for every post (works for drafts
    too, since the admin is logged in).

### Types

- `src/lib/types.ts`: add `status: 'draft' | 'published'` to the `Post`
  interface.
- `src/lib/posts.ts`: `rowToPost` includes `status: row.status as
  Post["status"]`.

## Out of scope

- No Next.js Draft Mode, no separate preview route/page, no preview-only
  cookies. Drafts are viewed via their normal `/posts/[slug]` URL while
  logged in.
- No scheduling, no "draft history"/versioning.
