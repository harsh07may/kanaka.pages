import { config, fields, singleton } from "@keystatic/core";

export default config({
  storage: { kind: "local" },

  singletons: {
    character: singleton({
      label: "About Me",
      path: "content/hero/character",
      schema: {
        name: fields.text({ label: "Name" }),
        bio: fields.text({ label: "Bio", multiline: true }),
      },
    }),

    whereILive: singleton({
      label: "Where I Live",
      path: "content/hero/where-i-live/",
      schema: {
        location: fields.text({ label: "Location" }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Scenery Image",
          directory: "public/hero",
          publicPath: "/hero/",
        }),
      },
    }),

    placesToGo: singleton({
      label: "Places to Go",
      path: "content/hero/places-to-go",
      schema: {
        places: fields.array(
          fields.object({
            name: fields.text({ label: "Place Name" }),
            visited: fields.checkbox({ label: "Visited", defaultValue: false }),
          }),
          {
            label: "Places",
            itemLabel: (props) => props.fields.name.value ?? "Place",
          },
        ),
      },
    }),

    brainDump: singleton({
      label: "Brain Dump",
      path: "content/hero/brain-dump",
      schema: {
        items: fields.array(
          fields.object({
            text: fields.text({ label: "Note" }),
          }),
          {
            label: "Notes",
            itemLabel: (props) => props.fields.text.value ?? "Note",
          },
        ),
      },
    }),

    books: singleton({
      label: "Books",
      path: "content/hero/books",
      schema: {
        books: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            author: fields.text({ label: "Author" }),
            color: fields.select({
              label: "Card Color",
              options: [
                { label: "Yellow", value: "yellow" },
                { label: "Pink", value: "pink" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
              ],
              defaultValue: "yellow",
            }),
          }),
          {
            label: "Books",
            itemLabel: (props) => props.fields.title.value ?? "Book",
          },
        ),
      },
    }),

    contacts: singleton({
      label: "Contacts",
      path: "content/hero/contacts",
      schema: {
        contacts: fields.array(
          fields.object({
            icon: fields.text({
              label: "Icon Glyph",
              description:
                'Short text shown in the icon circle, e.g. "𝕏", "Ig", "In", "@"',
            }),
            handle: fields.text({
              label: "Display Handle",
              description: 'Shown next to the icon, e.g. "@kanaka_pages"',
            }),
            url: fields.text({ label: "URL" }),
            bgColor: fields.select({
              label: "Icon Background",
              options: [
                { label: "Black", value: "black" },
                { label: "Pink", value: "pink" },
                { label: "Blue", value: "blue" },
                { label: "Yellow", value: "yellow" },
              ],
              defaultValue: "black",
            }),
          }),
          {
            label: "Contacts",
            itemLabel: (props) => props.fields.handle.value ?? "Contact",
          },
        ),
      },
    }),
  },
});
