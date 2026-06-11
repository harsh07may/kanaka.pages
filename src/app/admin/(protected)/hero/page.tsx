import { getHeroSection } from "@/lib/hero";
import {
  updateBooks,
  updateBrainDump,
  updateCharacter,
  updateContacts,
  updatePlacesToGo,
  updateWhereILive,
} from "./actions";

const inputClass =
  "w-full bg-[#fbf8f1] border-[3px] border-ink px-4 py-2 font-mono text-base text-ink brutal-shadow focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all";

const labelClass = "block font-mono text-sm font-bold uppercase mb-1 text-ink";

const helpClass = "font-mono text-xs text-ink/60 mt-1";

const buttonClass =
  "self-start bg-action text-white font-mono font-bold uppercase border-[3px] border-ink px-6 py-2 brutal-shadow brutal-hover brutal-active transition-all";

const sectionClass =
  "bg-white border-[3px] border-ink brutal-shadow flex flex-col gap-4 p-6";

export default async function AdminHeroPage() {
  const [character, whereILive, placesToGo, brainDump, books, contacts] =
    await Promise.all([
      getHeroSection("character"),
      getHeroSection("where-i-live"),
      getHeroSection("places-to-go"),
      getHeroSection("brain-dump"),
      getHeroSection("books"),
      getHeroSection("contacts"),
    ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-mono text-3xl font-black uppercase">
        Edit Homepage Hero
      </h1>

      <form action={updateCharacter} className={sectionClass}>
        <h2 className="font-mono text-xl font-black uppercase">Character</h2>
        <div>
          <label className={labelClass} htmlFor="character-name">
            Name
          </label>
          <input
            id="character-name"
            name="name"
            type="text"
            defaultValue={character.name}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="character-bio">
            Bio
          </label>
          <textarea
            id="character-bio"
            name="bio"
            rows={3}
            defaultValue={character.bio}
            className={inputClass}
          />
        </div>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>

      <form action={updateWhereILive} className={sectionClass}>
        <h2 className="font-mono text-xl font-black uppercase">Where I Live</h2>
        <div>
          <label className={labelClass} htmlFor="where-location">
            Location
          </label>
          <input
            id="where-location"
            name="location"
            type="text"
            defaultValue={whereILive.location}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="where-description">
            Description
          </label>
          <textarea
            id="where-description"
            name="description"
            rows={3}
            defaultValue={whereILive.description}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="where-image">
            Image
          </label>
          <input
            id="where-image"
            name="image"
            type="text"
            placeholder="kanaka-goa-scenery.png or /uploads/photo.jpg"
            defaultValue={whereILive.image}
            className={inputClass}
          />
          <p className={helpClass}>
            Filename in <code>/public/hero/</code>, or a full image URL/path.
          </p>
        </div>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>

      <form action={updatePlacesToGo} className={sectionClass}>
        <h2 className="font-mono text-xl font-black uppercase">Places to Go</h2>
        <div>
          <label className={labelClass} htmlFor="places">
            Places (one per line)
          </label>
          <textarea
            id="places"
            name="places"
            rows={6}
            defaultValue={placesToGo.places
              .map((p) => `${p.name}|${p.visited}`)
              .join("\n")}
            className={`${inputClass} font-mono`}
          />
          <p className={helpClass}>
            Format: <code>Place name|true</code> or{" "}
            <code>Place name|false</code> (visited or not)
          </p>
        </div>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>

      <form action={updateBrainDump} className={sectionClass}>
        <h2 className="font-mono text-xl font-black uppercase">Brain Dump</h2>
        <div>
          <label className={labelClass} htmlFor="items">
            Notes (one per line)
          </label>
          <textarea
            id="items"
            name="items"
            rows={6}
            defaultValue={brainDump.items.map((i) => i.text).join("\n")}
            className={`${inputClass} font-mono`}
          />
        </div>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>

      <form action={updateBooks} className={sectionClass}>
        <h2 className="font-mono text-xl font-black uppercase">Books</h2>
        <div>
          <label className={labelClass} htmlFor="books">
            Books (one per line)
          </label>
          <textarea
            id="books"
            name="books"
            rows={6}
            defaultValue={books.books
              .map((b) => `${b.title}|${b.author}|${b.color}`)
              .join("\n")}
            className={`${inputClass} font-mono`}
          />
          <p className={helpClass}>
            Format: <code>Title|Author|color</code> — color is one of{" "}
            <code>yellow</code>, <code>pink</code>, <code>green</code>,{" "}
            <code>blue</code>
          </p>
        </div>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>

      <form action={updateContacts} className={sectionClass}>
        <h2 className="font-mono text-xl font-black uppercase">Contacts</h2>
        <div>
          <label className={labelClass} htmlFor="contacts">
            Contacts (one per line)
          </label>
          <textarea
            id="contacts"
            name="contacts"
            rows={6}
            defaultValue={contacts.contacts
              .map((c) => `${c.icon}|${c.handle}|${c.url}|${c.bgColor}`)
              .join("\n")}
            className={`${inputClass} font-mono`}
          />
          <p className={helpClass}>
            Format: <code>icon|handle|url|bgColor</code> — bgColor is one of{" "}
            <code>black</code>, <code>pink</code>, <code>blue</code>,{" "}
            <code>yellow</code>
          </p>
        </div>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
