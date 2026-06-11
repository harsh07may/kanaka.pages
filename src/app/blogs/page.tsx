import type { Metadata } from "next";
import Link from "next/link";
import { BlogSearch } from "@/components/BlogSearch";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Search and browse all the chaotic drafts and deep-dives from my digital desk.",
};

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#d8b4fe] text-on-surface font-sans overflow-x-hidden relative z-0 flex flex-col items-center pt-16 md:pt-24 pb-32 px-4">
      {/* Decorative brutalist dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 3px, transparent 3px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Back Button */}
        <div className="w-full flex justify-start mb-8 pl-4 md:pl-0">
          <Link
            href="/"
            className="bg-white text-ink font-mono font-bold text-xl px-8 py-4 border-4 border-ink brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all -rotate-2"
          >
            ← Back Home
          </Link>
        </div>

        {/* Layered Brutalist Heading */}
        <div className="relative w-full flex justify-center mb-24 mt-8">
          <div className="absolute w-full max-w-[320px] md:max-w-2xl h-full bg-[#ff90e8] border-[8px] border-ink rotate-6 translate-y-6 translate-x-4 brutal-shadow-lg" />
          <div className="absolute w-full max-w-[320px] md:max-w-2xl h-full bg-[#a3e635] border-[8px] border-ink -rotate-3 -translate-x-6 brutal-shadow-lg" />
          <div className="relative w-full max-w-[320px] md:max-w-2xl bg-white border-[8px] border-ink px-8 py-6 md:py-10 rotate-1 brutal-shadow-lg z-10 text-center">
            <h1 className="text-5xl md:text-8xl font-black font-mono uppercase tracking-tighter text-ink leading-none">
              All Blogs
            </h1>
          </div>
        </div>

        {/* Tilted Main Container */}
        <div className="w-full bg-[#fef08a] border-[8px] border-ink brutal-shadow-lg p-6 md:p-16 md:-rotate-1 relative z-20">
          <BlogSearch posts={posts} />
        </div>
      </div>
    </div>
  );
}
