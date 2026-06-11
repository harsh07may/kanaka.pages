import { getPosts } from "@/lib/posts";

export const revalidate = 60;

export async function GET() {
  const posts = await getPosts();
  const siteUrl = "https://kanaka.pages"; // Replace with actual URL in production

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/posts/${post.slug}</guid>
    </item>`,
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>kanaka.pages</title>
      <link>${siteUrl}</link>
      <description>The diary and drafts of Kanaka</description>
      ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
