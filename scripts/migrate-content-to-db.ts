import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { db } from "../src/lib/db";
import { posts } from "../src/lib/db/schema";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

async function main() {
  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = await readFile(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    await db
      .insert(posts)
      .values({
        id: data.id ?? slug,
        slug,
        title: data.title ?? "",
        date: String(data.date ?? ""),
        tags: data.tags ?? [],
        image: data.image ?? "",
        excerpt: data.excerpt ?? "",
        author: data.author ?? "",
        authorRole: data.authorRole ?? "",
        authorBio: data.authorBio ?? "",
        authorImage: data.authorImage,
        color: data.color ?? "yellow",
        content: content.trim(),
      })
      .onConflictDoNothing({ target: posts.slug });

    console.log(`Migrated ${slug}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
