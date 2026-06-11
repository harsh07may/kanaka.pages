import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Kanaka and the stories behind kanaka.pages.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ff90e8] text-on-surface font-sans overflow-x-hidden relative z-0 flex flex-col items-center pt-12 md:pt-24 pb-24 px-4">
      {/* Decorative brutalist dots */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Title Tag */}
        <div className="bg-white border-4 border-ink px-8 py-4 mb-12 brutal-shadow-lg -rotate-2">
          <h1 className="text-5xl md:text-7xl font-black font-mono uppercase tracking-tighter text-ink">
            About Me
          </h1>
        </div>

        {/* Main Content Container */}
        <div className="w-full bg-[#fbf8f1] border-8 border-ink brutal-shadow-lg flex flex-col md:flex-row rotate-1 overflow-hidden">
          
          {/* Image Section */}
          <div className="w-full md:w-5/12 bg-[#a5f3fc] border-b-8 md:border-b-0 md:border-r-8 border-ink p-8 flex flex-col items-center justify-end relative min-h-[400px]">
             {/* Character Image */}
             <div className="absolute bottom-0 w-[90%] h-[95%]">
               <Image 
                 src="/kanaka-waving-text.png" 
                 alt="Kanaka Waving with Text Bubble" 
                 fill
                 className="object-contain object-bottom"
               />
             </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col font-serif text-ink">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono border-b-4 border-ink pb-2 inline-block self-start">
              Hi, I'm Kanaka!
            </h2>
            
            <div className="text-xl md:text-2xl leading-relaxed space-y-6">
              <p>
                I am the creator and curator behind <strong className="font-bold font-mono bg-yellow-300 px-1 border-2 border-ink">kanaka.pages</strong>.
              </p>
              <p>
                As a writer and keen observer of life, I spend my days building entire worlds out of thin air and telling stories that bridge the gap between local Goan folklore and universal truths.
              </p>
              <p>
                My ultimate goal is to craft narratives that feel like a warm breeze on a sunny afternoon—bold, refreshing, and entirely unapologetic.
              </p>
            </div>

            {/* Back Button */}
            <div className="mt-12 flex justify-start">
              <Link 
                href="/" 
                className="bg-[#fef08a] text-ink font-mono font-bold text-xl px-8 py-4 border-4 border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                ← Back Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
