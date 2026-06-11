import { eq } from "drizzle-orm";
import { db } from "./db";
import { heroContent } from "./db/schema";

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

/** Default content used when a section hasn't been saved to the database yet. */
export const HERO_DEFAULTS = {
  character: {
    name: "Kanaka",
    bio: "I'm a writer and observer who loves building worlds and telling stories, both Goan and universal!",
  },
  "where-i-live": {
    location: "Goa",
    description:
      "A place where the sea breeze meets deep-rooted history, inspiring every word I write.",
    image: "kanaka-goa-scenery.png",
  },
  "places-to-go": {
    places: [] as PlaceItem[],
  },
  "brain-dump": {
    items: [] as { text: string }[],
  },
  books: {
    books: [] as { title: string; author: string; color: string }[],
  },
  contacts: {
    contacts: [] as {
      icon: string;
      handle: string;
      url: string;
      bgColor: string;
    }[],
  },
} satisfies Record<string, unknown>;

export type HeroSectionKey = keyof typeof HERO_DEFAULTS;
export type HeroSectionData<K extends HeroSectionKey> =
  (typeof HERO_DEFAULTS)[K];

export async function getHeroSection<K extends HeroSectionKey>(
  key: K,
): Promise<HeroSectionData<K>> {
  const [row] = await db
    .select()
    .from(heroContent)
    .where(eq(heroContent.key, key))
    .limit(1);
  return (row?.data as HeroSectionData<K> | undefined) ?? HERO_DEFAULTS[key];
}

export async function getHeroData(): Promise<HeroData> {
  const [character, whereILive, placesToGo, brainDump, books, contacts] =
    await Promise.all([
      getHeroSection("character"),
      getHeroSection("where-i-live"),
      getHeroSection("places-to-go"),
      getHeroSection("brain-dump"),
      getHeroSection("books"),
      getHeroSection("contacts"),
    ]);

  return {
    character: {
      name: character.name,
      bio: character.bio,
    },
    "where-i-live": {
      location: whereILive.location,
      description: whereILive.description,
      image: /^(https?:|\/)/.test(whereILive.image)
        ? whereILive.image
        : `/hero/${whereILive.image}`,
    },
    "places-to-go": {
      places: placesToGo.places.map((p) => ({
        name: p.name,
        visited: p.visited,
      })),
    },
    "brain-dump": {
      items: brainDump.items.map((i) => ({ text: i.text })),
    },
    books: {
      books: books.books.map((b) => ({
        title: b.title,
        author: b.author,
        colorClass: BOOK_COLOR_MAP[b.color] ?? "bg-yellow-200",
      })),
    },
    contacts: {
      contacts: contacts.contacts.map((c) => ({
        icon: c.icon,
        handle: c.handle,
        url: c.url,
        bgColorClass: CONTACT_BG_MAP[c.bgColor] ?? "bg-black",
        textColorClass: CONTACT_TEXT_MAP[c.bgColor] ?? "text-white",
      })),
    },
  };
}
