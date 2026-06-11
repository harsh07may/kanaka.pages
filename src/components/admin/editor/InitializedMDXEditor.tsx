"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  GenericJsxEditor,
  headingsPlugin,
  InsertImage,
  InsertThematicBreak,
  imagePlugin,
  type JsxComponentDescriptor,
  jsxPlugin,
  ListsToggle,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  markdownShortcutPlugin,
  quotePlugin,
  Separator,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";
import { InsertCallout, InsertImageGrid } from "./jsx-toolbar-buttons";

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.set("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const { url } = await response.json();
  return url;
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: "Callout",
    kind: "flow",
    props: [{ name: "variant", type: "string" }],
    hasChildren: true,
    Editor: GenericJsxEditor,
  },
  {
    name: "ImageGrid",
    kind: "flow",
    props: [
      { name: "src", type: "string" },
      { name: "alt", type: "string" },
      { name: "title", type: "string" },
    ],
    hasChildren: true,
    Editor: GenericJsxEditor,
  },
];

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      ref={editorRef}
      contentEditableClassName="prose-mdx-editor min-h-[400px] font-sans text-body-md text-ink"
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [2, 3, 4] }),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler: uploadImage }),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            txt: "Plain Text",
            ts: "TypeScript",
            tsx: "TSX",
            js: "JavaScript",
            jsx: "JSX",
            css: "CSS",
            html: "HTML",
            json: "JSON",
            bash: "Bash",
          },
        }),
        jsxPlugin({ jsxComponentDescriptors }),
        diffSourcePlugin({ viewMode: "rich-text" }),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <ListsToggle />
              <Separator />
              <CreateLink />
              <InsertImage />
              <InsertThematicBreak />
              <Separator />
              <InsertCallout />
              <InsertImageGrid />
            </>
          ),
        }),
      ]}
      {...props}
    />
  );
}
