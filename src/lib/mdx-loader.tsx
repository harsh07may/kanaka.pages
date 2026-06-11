import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";

/**
 * Renders a post's MDX body. Returns null if the content is empty
 * (caller should notFound()).
 */
export function renderPostMDX(content: string) {
  if (!content.trim()) return null;

  return <MDXRemote source={content} components={mdxComponents} />;
}
