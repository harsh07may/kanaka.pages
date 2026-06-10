import Link from "next/link";
import { ArticleGrid } from "@/components/ArticleGrid";
import { BackgroundShapes } from "@/components/BackgroundShapes";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { getHeroData } from "@/lib/hero";
import { getPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function Home() {
  const [posts, heroData] = await Promise.all([getPosts(), getHeroData()]);

  return (
    <div
      className="min-h-screen bg-[#bbf7d0] text-on-surface font-sans text-body-md overflow-x-hidden relative z-0"
      style={{
        backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)",
        backgroundSize: "48px 48px",
      }}
    >
      <BackgroundShapes />
      <Navigation />

      <main className="w-full max-w-max-width mx-auto px-margin-page py-gap-lg flex flex-col gap-y-20 relative z-10">
        <HeroSection heroData={heroData} />
        <ArticleGrid posts={posts} />
      </main>

      <Footer />
    </div>
  );
}
