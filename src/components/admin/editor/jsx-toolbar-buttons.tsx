"use client";

import {
  Button,
  insertImage$,
  insertJsx$,
  usePublisher,
} from "@mdxeditor/editor";
import { useRef } from "react";

export function InsertImageUpload() {
  const insertImage = usePublisher(insertImage$);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={() => inputRef.current?.click()}>+ Image</Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) insertImage({ file });
          e.target.value = "";
        }}
      />
    </>
  );
}

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
