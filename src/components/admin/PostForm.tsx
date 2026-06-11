"use client";

import type { MDXEditorMethods } from "@mdxeditor/editor";
import { useRef, useState } from "react";
import type { Post } from "@/lib/types";
import { ForwardRefEditor } from "./editor/ForwardRefEditor";

const inputClass =
  "w-full bg-[#fbf8f1] border-[3px] border-ink px-4 py-2 font-mono text-base text-ink brutal-shadow focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all";

const labelClass = "block font-mono text-sm font-bold uppercase mb-1 text-ink";

interface ImageFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
}

function ImageField({ id, name, label, defaultValue }: ImageFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const { url } = await response.json();
      setValue(url);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          name={name}
          type="text"
          placeholder="/images/example.jpg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
        />
        <label className="shrink-0 cursor-pointer bg-secondary text-ink font-mono text-sm font-bold uppercase border-[3px] border-ink px-4 py-2 brutal-shadow brutal-hover brutal-active transition-all flex items-center">
          {uploading ? "..." : "Upload"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}

interface PostFormProps {
  action: (formData: FormData) => void | Promise<void>;
  initialPost?: Post & { content: string };
  submitLabel: string;
}

export function PostForm({ action, initialPost, submitLabel }: PostFormProps) {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [content, setContent] = useState(initialPost?.content ?? "");

  async function handleAction(formData: FormData) {
    formData.set("content", editorRef.current?.getMarkdown() ?? content);
    await action(formData);
  }

  return (
    <form action={handleAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={initialPost?.title}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="date">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={initialPost?.date}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="color">
            Card Color
          </label>
          <select
            id="color"
            name="color"
            defaultValue={initialPost?.color ?? "yellow"}
            className={inputClass}
          >
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            defaultValue={initialPost?.tags.join(", ")}
            className={inputClass}
          />
        </div>

        <ImageField
          id="image"
          name="image"
          label="Cover Image Path"
          defaultValue={initialPost?.image}
        />

        <div>
          <label className={labelClass} htmlFor="author">
            Author Name
          </label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={initialPost?.author}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="authorRole">
            Author Role
          </label>
          <input
            id="authorRole"
            name="authorRole"
            type="text"
            defaultValue={initialPost?.authorRole}
            className={inputClass}
          />
        </div>

        <ImageField
          id="authorImage"
          name="authorImage"
          label="Author Image Path (optional)"
          defaultValue={initialPost?.authorImage}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="excerpt">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          required
          defaultValue={initialPost?.excerpt}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="authorBio">
          Author Bio
        </label>
        <textarea
          id="authorBio"
          name="authorBio"
          rows={2}
          defaultValue={initialPost?.authorBio}
          className={inputClass}
        />
      </div>

      <div>
        <span className={labelClass}>Content</span>
        <div className="bg-[#fbf8f1] border-[3px] border-ink brutal-shadow">
          <ForwardRefEditor
            ref={editorRef}
            markdown={content}
            onChange={setContent}
          />
        </div>
      </div>

      <button
        type="submit"
        className="self-start bg-action text-white font-mono font-bold uppercase border-[3px] border-ink px-6 py-3 brutal-shadow brutal-hover brutal-active transition-all"
      >
        {submitLabel}
      </button>
    </form>
  );
}
