import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { getPostContent } from "./posts";

/**
 * Loads a post's MDX body from the database and returns a rendered
 * <MDXRemote> element. Returns null if the post doesn't exist
 * (caller should notFound()).
 */
export async function renderPostMDX(slug: string) {
  const content = await getPostContent(slug);
  if (content === undefined) return null;

  return <MDXRemote source={content} components={mdxComponents} />;
}
