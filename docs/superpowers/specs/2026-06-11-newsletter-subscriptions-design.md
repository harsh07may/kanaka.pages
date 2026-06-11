# Newsletter Subscriptions — Design

## Goal

Enable the existing `/newsletter` page (currently a UI mockup) to actually
collect subscriber emails, store them in the database, and let the admin
view the list of subscribers. Sending campaign emails when a new post goes
live is explicitly out of scope for this phase.

## Database

Add a `subscribers` table to `src/lib/db/schema.ts`, following the existing
`posts`/`hero_content` conventions (text `id` primary key, `drizzle-orm/pg-core`):

```ts
export const subscribers = pgTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SubscriberRow = typeof subscribers.$inferSelect;
export type NewSubscriberRow = typeof subscribers.$inferInsert;
```

A unique constraint on `email` is the dedupe mechanism — duplicate
submissions are caught and surfaced as a friendly "already subscribed"
message rather than an error.

After updating the schema, run `pnpm db:generate` to create the migration,
then `pnpm db:push` to apply it.

## Subscription Flow

### Server action — `src/app/newsletter/actions.ts`

```ts
"use server";

type SubscribeResult =
  | { status: "ok" }
  | { status: "duplicate" }
  | { status: "invalid" };

export async function subscribe(email: string): Promise<SubscribeResult>
```

- Trims and lowercases the input email.
- Validates with a basic email regex; returns `{ status: "invalid" }` on
  failure (no DB call).
- Inserts `{ id: crypto.randomUUID(), email }` into `subscribers`.
- Catches the unique-constraint violation (Postgres error code `23505`) and
  returns `{ status: "duplicate" }`.
- Returns `{ status: "ok" }` on successful insert.

### Newsletter page — `src/app/newsletter/page.tsx`

- Remove the "* UI Mockup - Email Subscriptions Coming Soon! *" banner.
- Extract the form into a small client component (e.g.
  `src/app/newsletter/SubscribeForm.tsx`) that:
  - Calls the `subscribe` server action on submit.
  - Shows inline, brutalist-styled feedback based on the result:
    - `ok` → "You're on the list!"
    - `duplicate` → "You're already subscribed!"
    - `invalid` → "That doesn't look like a valid email."
  - Disables the submit button while the action is pending.
  - Clears the input on success.
- The rest of the page (layout, decorative elements, back button) stays
  unchanged.

## Admin Subscriber List

New page: `src/app/admin/(protected)/subscribers/page.tsx`

- Server component, protected via the existing `requireAuth` from
  `src/app/admin/(protected)/actions.ts` (same pattern as the posts list
  page).
- Queries all rows from `subscribers`, ordered by `createdAt` descending.
- Displays:
  - Total subscriber count.
  - A simple table/list of email + subscribed-on date.
- Add a nav link to this page from the admin dashboard
  (`src/app/admin/(protected)/page.tsx`), styled consistently with existing
  admin nav links.

## Out of Scope

- Sending any emails (transactional or campaign) — no email provider is
  integrated in this phase.
- Any "notify subscribers on publish" hook or pending-notification tracking.
- Unsubscribe flow (no emails are sent, so there's nothing to unsubscribe
  from yet).
