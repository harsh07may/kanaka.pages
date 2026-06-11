"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/slugify";
import type { Post } from "@/lib/types";

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

export async function createPost(formData: FormData) {
  const fields = readPostFields(formData);
  const slug = slugify(fields.title);

  await db.insert(posts).values({
    id: slug,
    slug,
    ...fields,
  });

  revalidatePostPaths(slug);
  redirect("/admin");
}

export async function updatePost(id: string, formData: FormData) {
  const fields = readPostFields(formData);
  const slug = slugify(fields.title);

  await db
    .update(posts)
    .set({ ...fields, slug, updatedAt: new Date() })
    .where(eq(posts.id, id));

  revalidatePostPaths(slug);
  redirect("/admin");
}

export async function deletePost(id: string, slug: string) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePostPaths(slug);
  redirect("/admin");
}
