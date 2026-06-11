import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How kanaka.pages handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[85vh] bg-[#fbf8f1] text-on-surface font-sans overflow-x-hidden relative z-0 flex flex-col items-center pt-16 pb-24 px-4">
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
        <div className="bg-[#ff90e8] border-4 border-ink px-8 py-4 mb-12 brutal-shadow-lg rotate-1">
          <h1 className="text-4xl md:text-6xl font-black font-mono uppercase tracking-tighter text-ink">
            Privacy Policy
          </h1>
        </div>

        {/* Content Container */}
        <div className="w-full bg-white border-8 border-ink brutal-shadow-lg p-8 md:p-12 -rotate-1 font-serif text-lg md:text-xl text-ink leading-relaxed space-y-6">
          <p>
            <strong>Last Updated:</strong> May 2026
          </p>
          <p>
            Hey there! Welcome to my digital garden. I like to keep things simple and honest here.
          </p>
          <p>
            <strong>I do not track you.</strong> There are no sneaky third-party cookies, no aggressive analytics, and no targeted ads stalking your every move across the web. 
          </p>
          <p>
            The only data I collect is what you explicitly give me (like your email address if you decide to subscribe to my newsletter). Even then, I promise I'll keep it safe and never sell it to anyone.
          </p>
          <p>
            That's pretty much it. Read my stories, enjoy the art, and stay bold!
          </p>
          
          <div className="mt-12 pt-8 border-t-4 border-dashed border-ink flex justify-start">
            <Link 
              href="/" 
              className="bg-[#fef08a] text-ink font-mono font-bold text-xl px-8 py-4 border-4 border-ink brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              ← Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
