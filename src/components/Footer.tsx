import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#ffba08] w-full border-t-[8px] border-ink mt-auto py-16 md:py-24 relative overflow-hidden z-10">
      {/* Decorative brutalist lines in background */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000, #000 4px, transparent 4px, transparent 20px)",
        }}
      />

      <div className="max-w-max-width mx-auto px-margin-page flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="font-sans text-5xl md:text-7xl font-black text-ink uppercase tracking-tighter">
            kanaka.pages
          </div>
          <div className="bg-white border-4 border-ink px-6 py-3 font-bold font-mono text-xl brutal-shadow -rotate-1">
            Made with{" "}
            <Link href="/admin" aria-label="Admin">
              <span className="text-[#ffba08] drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-2xl">
                ⚡
              </span>
            </Link>{" "}
            in Goa
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-6 font-mono text-lg md:text-xl font-bold uppercase">
          <Link
            href="/privacy"
            className="bg-white px-6 py-3 border-4 border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Privacy
          </Link>
          <Link
            href="/rss.xml"
            className="bg-[#ff90e8] px-6 py-3 border-4 border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            RSS Feed
          </Link>
          <Link
            href="/contact"
            className="bg-[#a3e635] px-6 py-3 border-4 border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
