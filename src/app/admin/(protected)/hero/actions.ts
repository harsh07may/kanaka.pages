"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { heroContent } from "@/lib/db/schema";
import type { HeroSectionData, HeroSectionKey } from "@/lib/hero";
import { requireAuth } from "../actions";

async function saveHeroSection<K extends HeroSectionKey>(
  key: K,
  data: HeroSectionData<K>,
) {
  await requireAuth();

  await db
    .insert(heroContent)
    .values({ key, data })
    .onConflictDoUpdate({ target: heroContent.key, set: { data } });

  revalidatePath("/");
  revalidatePath("/admin/hero");
}

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateCharacter(formData: FormData) {
  await saveHeroSection("character", {
    name: String(formData.get("name") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim(),
  });
}

export async function updateWhereILive(formData: FormData) {
  await saveHeroSection("where-i-live", {
    location: String(formData.get("location") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
  });
}

export async function updatePlacesToGo(formData: FormData) {
  const places = parseLines(formData.get("places")).map((line) => {
    const [name, visited] = line.split("|").map((part) => part.trim());
    return { name: name ?? "", visited: visited === "true" };
  });

  await saveHeroSection("places-to-go", { places });
}

export async function updateBrainDump(formData: FormData) {
  const items = parseLines(formData.get("items")).map((text) => ({ text }));

  await saveHeroSection("brain-dump", { items });
}

export async function updateBooks(formData: FormData) {
  const books = parseLines(formData.get("books")).map((line) => {
    const [title, author, color] = line.split("|").map((part) => part.trim());
    return {
      title: title ?? "",
      author: author ?? "",
      color: color || "yellow",
    };
  });

  await saveHeroSection("books", { books });
}

export async function updateContacts(formData: FormData) {
  const contacts = parseLines(formData.get("contacts")).map((line) => {
    const [icon, handle, url, bgColor] = line
      .split("|")
      .map((part) => part.trim());
    return {
      icon: icon ?? "",
      handle: handle ?? "",
      url: url || "#",
      bgColor: bgColor || "black",
    };
  });

  await saveHeroSection("contacts", { contacts });
}
