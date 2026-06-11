import { AuthorCard } from "@/components/AuthorCard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PostHeader } from "@/components/PostHeader";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ShareButtons } from "@/components/ShareButtons";
import { renderPostMDX } from "@/lib/mdx-loader";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Posts created after the last build are still rendered (and cached) on demand.
// No time-based revalidate: content changes are pushed via revalidatePath() in
// the admin actions, and a fixed revalidate window conflicts with the
// per-request dynamic rendering draft posts need for the session-cookie check.
export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `https://kanaka-pages.vercel.app/posts/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      type: "article",
      publishedTime: post.date,
      authors: ["Kanaka"],
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug, 3),
  ]);

  if (!post) notFound();

  if (post.status === "draft") {
    // Drafts must be rendered dynamically per-request to safely read the session cookie
    await connection();
    const session = await getSession();
    if (!session.isLoggedIn) notFound();
  }

  const postBody = renderPostMDX(post.content);
  if (!postBody) notFound();

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans text-body-md">
      <Navigation />

      <main className="grow w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col md:flex-row gap-gap-lg">
        {/* ── Main Article ── */}
        <article className="w-full md:w-8/12 flex flex-col gap-gap-lg">
          {post.status === "draft" && (
            <div className="bg-yellow-300 border-[3px] border-ink font-mono text-sm font-bold uppercase px-4 py-2 brutal-shadow self-start">
              Draft — not visible to the public
            </div>
          )}
          <PostHeader post={post} />

          {/* MDX body — all element styling comes from mdx-components.tsx */}
          <div className="flex flex-col gap-1">{postBody}</div>

          {/* Share bar */}
          <ShareButtons
            url={`https://kanaka.pages/posts/${post.slug}`}
            title={post.title}
          />
        </article>

        {/* ── Sidebar ── */}
        <aside className="w-full md:w-4/12 flex flex-col gap-gap-lg">
          <AuthorCard
            author={post.author}
            authorRole={post.authorRole}
            authorBio={post.authorBio}
            authorImage={post.authorImage}
          />
          <RelatedPosts posts={relatedPosts} />
        </aside>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
