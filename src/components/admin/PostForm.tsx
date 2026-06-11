"use client";

import type { MDXEditorMethods } from "@mdxeditor/editor";
import { useRef, useState } from "react";
import type { Post } from "@/lib/types";
import { ForwardRefEditor } from "./editor/ForwardRefEditor";

const inputClass =
  "w-full bg-[#fbf8f1] border-[3px] border-ink px-4 py-2 font-mono text-base text-ink brutal-shadow focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all";

const labelClass = "block font-mono text-sm font-bold uppercase mb-1 text-ink";

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

        <div>
          <label className={labelClass} htmlFor="image">
            Cover Image Path
          </label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="/images/example.jpg"
            defaultValue={initialPost?.image}
            className={inputClass}
          />
        </div>

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

        <div>
          <label className={labelClass} htmlFor="authorImage">
            Author Image Path (optional)
          </label>
          <input
            id="authorImage"
            name="authorImage"
            type="text"
            defaultValue={initialPost?.authorImage}
            className={inputClass}
          />
        </div>
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
