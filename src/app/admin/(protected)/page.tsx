import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { deletePost } from "./actions";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-3xl font-black uppercase">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-action text-white font-mono font-bold uppercase border-[3px] border-ink px-4 py-2 brutal-shadow brutal-hover brutal-active transition-all"
        >
          + New Post
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border-[3px] border-ink brutal-shadow flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="flex flex-col">
              <span className="font-mono font-bold">{post.title}</span>
              <span className="font-mono text-xs text-ink/60">
                {post.date} — /{post.slug}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="font-mono text-sm font-bold uppercase border-[3px] border-ink px-3 py-1.5 bg-[#fef08a] brutal-shadow brutal-hover brutal-active transition-all"
              >
                Edit
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deletePost(post.id, post.slug);
                }}
              >
                <button
                  type="submit"
                  className="font-mono text-sm font-bold uppercase border-[3px] border-ink px-3 py-1.5 bg-white text-action brutal-shadow brutal-hover brutal-active transition-all"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="font-mono text-ink/60">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
