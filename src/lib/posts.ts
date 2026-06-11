import { desc, eq, ne } from "drizzle-orm";
import { cache } from "react";
import { db } from "./db";
import { type PostRow, posts } from "./db/schema";
import type { Post } from "./types";

function rowToPost(row: PostRow): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    tags: row.tags,
    image: row.image,
    excerpt: row.excerpt,
    author: row.author,
    authorRole: row.authorRole,
    authorBio: row.authorBio,
    authorImage: row.authorImage ?? undefined,
    color: row.color as Post["color"],
  };
}

export async function getPostSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: posts.slug }).from(posts);
  return rows.map((r) => r.slug);
}

export async function getPosts(): Promise<Post[]> {
  const rows = await db.select().from(posts).orderBy(desc(posts.date));
  return rows.map(rowToPost);
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3,
): Promise<Post[]> {
  const rows = await db
    .select()
    .from(posts)
    .where(ne(posts.slug, currentSlug))
    .orderBy(desc(posts.date))
    .limit(limit);
  return rows.map(rowToPost);
}

export async function getPostById(
  id: string,
): Promise<(Post & { content: string }) | undefined> {
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return row ? { ...rowToPost(row), content: row.content } : undefined;
}

export const getPostBySlug = cache(
  async (slug: string): Promise<(Post & { content: string }) | undefined> => {
    const [row] = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);
    return row ? { ...rowToPost(row), content: row.content } : undefined;
  },
);
