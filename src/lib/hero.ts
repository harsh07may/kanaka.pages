import { readFile } from "node:fs/promises";
import path from "node:path";

const BOOK_COLOR_MAP: Record<string, string> = {
  yellow: "bg-yellow-200",
  pink: "bg-pink-200",
  green: "bg-green-200",
  blue: "bg-blue-200",
};

const CONTACT_BG_MAP: Record<string, string> = {
  black: "bg-black",
  pink: "bg-pink-500",
  blue: "bg-blue-600",
  yellow: "bg-yellow-400",
};

const CONTACT_TEXT_MAP: Record<string, string> = {
  black: "text-white",
  pink: "text-white",
  blue: "text-white",
  yellow: "text-ink",
};

export interface CharacterData {
  name: string;
  bio: string;
}

export interface WhereILiveData {
  location: string;
  description: string;
  image: string;
}

export interface PlaceItem {
  name: string;
  visited: boolean;
}

export interface PlacesToGoData {
  places: PlaceItem[];
}

export interface BrainDumpData {
  items: { text: string }[];
}

export interface BookItem {
  title: string;
  author: string;
  colorClass: string;
}

export interface BooksData {
  books: BookItem[];
}

export interface ContactItem {
  icon: string;
  handle: string;
  url: string;
  bgColorClass: string;
  textColorClass: string;
}

export interface ContactsData {
  contacts: ContactItem[];
}

export interface HeroData {
  character: CharacterData;
  "where-i-live": WhereILiveData;
  "places-to-go": PlacesToGoData;
  "brain-dump": BrainDumpData;
  books: BooksData;
  contacts: ContactsData;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "hero");

async function readJson<T>(relativePath: string): Promise<T | null> {
  try {
    const raw = await readFile(path.join(CONTENT_DIR, relativePath), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getHeroData(): Promise<HeroData> {
  const [character, whereILive, placesToGo, brainDump, books, contacts] =
    await Promise.all([
      readJson<{ name: string; bio: string }>("character.json"),
      readJson<{ location: string; description: string; image: string }>(
        "where-i-live/index.json",
      ),
      readJson<{ places: PlaceItem[] }>("places-to-go.json"),
      readJson<{ items: { text: string }[] }>("brain-dump.json"),
      readJson<{ books: { title: string; author: string; color: string }[] }>(
        "books.json",
      ),
      readJson<{
        contacts: {
          icon: string;
          handle: string;
          url: string;
          bgColor: string;
        }[];
      }>("contacts.json"),
    ]);

  return {
    character: {
      name: character?.name ?? "Kanaka",
      bio:
        character?.bio ??
        "I'm a writer and observer who loves building worlds and telling stories, both Goan and universal!",
    },
    "where-i-live": {
      location: whereILive?.location ?? "Goa",
      description:
        whereILive?.description ??
        "A place where the sea breeze meets deep-rooted history, inspiring every word I write.",
      image: whereILive?.image
        ? `/hero/${whereILive.image}`
        : "/hero/kanaka-goa-scenery.png",
    },
    "places-to-go": {
      places: (placesToGo?.places ?? []).map((p) => ({
        name: p.name,
        visited: p.visited,
      })),
    },
    "brain-dump": {
      items: (brainDump?.items ?? []).map((i) => ({ text: i.text })),
    },
    books: {
      books: (books?.books ?? []).map((b) => ({
        title: b.title,
        author: b.author,
        colorClass: BOOK_COLOR_MAP[b.color] ?? "bg-yellow-200",
      })),
    },
    contacts: {
      contacts: (contacts?.contacts ?? []).map((c) => ({
        icon: c.icon,
        handle: c.handle,
        url: c.url,
        bgColorClass: CONTACT_BG_MAP[c.bgColor] ?? "bg-black",
        textColorClass: CONTACT_TEXT_MAP[c.bgColor] ?? "text-white",
      })),
    },
  };
}
