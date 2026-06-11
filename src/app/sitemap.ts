import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kanaka-pages.vercel.app";

  // Base static routes
  const routes = [
    "",
    "/about",
    "/blogs",
    "/contact",
    "/newsletter",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic post routes
  const slugs = await getPostSlugs();
  const postRoutes = slugs.map((slug) => ({
    url: `${baseUrl}/posts/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...postRoutes];
}
