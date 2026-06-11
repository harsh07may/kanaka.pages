import { readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "../src/lib/db";
import { heroContent } from "../src/lib/db/schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "hero");

async function readJson(relativePath: string) {
  const raw = await readFile(path.join(CONTENT_DIR, relativePath), "utf-8");
  return JSON.parse(raw);
}

async function seed() {
  const sections: { key: string; file: string }[] = [
    { key: "character", file: "character.json" },
    { key: "where-i-live", file: "where-i-live/index.json" },
    { key: "places-to-go", file: "places-to-go.json" },
    { key: "brain-dump", file: "brain-dump.json" },
    { key: "books", file: "books.json" },
    { key: "contacts", file: "contacts.json" },
  ];

  for (const { key, file } of sections) {
    const data = await readJson(file);
    await db
      .insert(heroContent)
      .values({ key, data })
      .onConflictDoUpdate({ target: heroContent.key, set: { data } });
    console.log(`Seeded "${key}" from content/hero/${file}`);
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
