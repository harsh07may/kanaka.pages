"use client";

import { Button, insertJsx$, usePublisher } from "@mdxeditor/editor";

export function InsertCallout() {
  const insertJsx = usePublisher(insertJsx$);
  return (
    <Button
      onClick={() =>
        insertJsx({
          name: "Callout",
          kind: "flow",
          props: { variant: "note" },
        })
      }
    >
      + Callout
    </Button>
  );
}

export function InsertImageGrid() {
  const insertJsx = usePublisher(insertJsx$);
  return (
    <Button
      onClick={() =>
        insertJsx({
          name: "ImageGrid",
          kind: "flow",
          props: { src: "/images/example.jpg", alt: "", title: "" },
        })
      }
    >
      + Image Grid
    </Button>
  );
}
