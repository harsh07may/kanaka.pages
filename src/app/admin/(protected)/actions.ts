"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/slugify";
import type { Post } from "@/lib/types";

export interface ActionResult {
  error?: string;
}

async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }
}

function readPostFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    title,
    date: String(formData.get("date") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    color: String(formData.get("color") ?? "yellow") as Post["color"],
    tags,
    image: String(formData.get("image") ?? ""),
    author: String(formData.get("author") ?? ""),
    authorRole: String(formData.get("authorRole") ?? ""),
    authorBio: String(formData.get("authorBio") ?? ""),
    authorImage: String(formData.get("authorImage") ?? "") || null,
    content: String(formData.get("content") ?? ""),
  };
}

function revalidatePostPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/blogs");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  revalidatePath(`/posts/${slug}`);
  revalidatePath("/admin");
}

export async function createPost(
  formData: FormData,
): Promise<ActionResult | undefined> {
  await requireAuth();

  const fields = readPostFields(formData);

  if (!fields.content.trim()) {
    return { error: "Content cannot be empty." };
  }

  const slug = slugify(fields.title);
  if (!slug) {
    return { error: "Title must contain at least one letter or number." };
  }

  const [existing] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (existing) {
    return {
      error: `A post with the slug "${slug}" already exists. Please choose a different title.`,
    };
  }

  await db.insert(posts).values({ id: slug, slug, ...fields });

  revalidatePostPaths(slug);
  redirect("/admin");
}

export async function updatePost(
  id: string,
  formData: FormData,
): Promise<ActionResult | undefined> {
  await requireAuth();

  const fields = readPostFields(formData);

  if (!fields.content.trim()) {
    return { error: "Content cannot be empty." };
  }

  const [existing] = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!existing) {
    return { error: "Post not found." };
  }

  await db
    .update(posts)
    .set({ ...fields, updatedAt: new Date() })
    .where(eq(posts.id, id));

  revalidatePostPaths(existing.slug);
  redirect("/admin");
}

export async function deletePost(
  id: string,
  slug: string,
): Promise<ActionResult | undefined> {
  await requireAuth();

  await db.delete(posts).where(eq(posts.id, id));
  revalidatePostPaths(slug);
  redirect("/admin");
}
