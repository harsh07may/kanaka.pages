import Link from "next/link";
import SubscribeForm from "./SubscribeForm";

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#a3e635] text-on-surface font-sans overflow-x-hidden relative z-0 flex flex-col items-center justify-center p-4 py-16">
      {/* Decorative brutalist dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 3px, transparent 3px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Newsletter Container */}
        <div className="w-full bg-white border-[8px] border-ink brutal-shadow-lg p-8 md:p-16 flex flex-col items-center text-center -rotate-1 relative">
          {/* Fun decorative SVG */}
          <svg
            className="absolute -top-12 -left-8 w-24 h-24 text-[#38bdf8] fill-current border-4 border-ink brutal-shadow-sm bg-white rounded-full p-4 -rotate-12"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <polyline
              points="22,6 12,13 2,6"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          <h1 className="text-4xl md:text-6xl font-black font-mono uppercase tracking-tighter text-ink mb-6">
            Join the Club
          </h1>

          <p className="text-xl md:text-2xl font-serif leading-relaxed mb-10 max-w-xl">
            Get my latest drafts and personal diary entries delivered straight
            to your inbox. No spam, just pure bold text.
          </p>

          <SubscribeForm />
        </div>

        {/* Back Button */}
        <div className="mt-16 flex justify-center w-full">
          <Link
            href="/"
            className="bg-[#a5f3fc] text-ink font-mono font-bold text-xl px-8 py-4 border-4 border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rotate-1"
          >
            ← Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
