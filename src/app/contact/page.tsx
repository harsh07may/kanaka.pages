import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#a5f3fc] text-on-surface font-sans overflow-x-hidden relative z-0 flex flex-col items-center pt-16 pb-24 px-4">
      {/* Decorative brutalist dots */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Title Tag */}
        <div className="bg-[#fef08a] border-4 border-ink px-8 py-4 mb-12 brutal-shadow-lg -rotate-1">
          <h1 className="text-4xl md:text-6xl font-black font-mono uppercase tracking-tighter text-ink">
            Get In Touch
          </h1>
        </div>

        {/* Content Container */}
        <div className="w-full bg-white border-8 border-ink brutal-shadow-lg p-8 md:p-12 rotate-1 font-serif text-lg md:text-xl text-ink leading-relaxed space-y-8 text-center flex flex-col items-center">
          <p>
            Got a question? Want to talk about Goan folklore, book recommendations, or just say hi? 
            I'm always open to interesting conversations!
          </p>
          
          <div className="bg-[#a3e635] border-4 border-ink px-8 py-4 font-mono font-bold text-2xl -rotate-2 brutal-shadow-sm">
            hello@kanaka.pages
          </div>

          <p>
            Or find me hanging out on my socials:
          </p>

          <div className="flex gap-4 font-mono font-bold">
            <a href="#" className="bg-white text-ink px-6 py-3 border-4 border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">𝕏 Twitter</a>
            <a href="#" className="bg-[#ff90e8] text-ink px-6 py-3 border-4 border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Instagram</a>
          </div>
          
          <div className="mt-12 w-full pt-8 border-t-4 border-dashed border-ink flex justify-center">
            <Link 
              href="/" 
              className="bg-[#38bdf8] text-ink font-mono font-bold text-xl px-8 py-4 border-4 border-ink brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              ← Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
