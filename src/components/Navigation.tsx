import Link from "next/link";

export function Navigation() {
  return (
    <nav className="bg-white w-full border-b-[6px] border-ink flex justify-between items-center px-4 md:px-12 py-4 sticky top-0 z-50">
      <Link
        href="/"
        className="font-mono text-2xl md:text-3xl font-black uppercase tracking-tighter text-ink bg-[#fef08a] px-4 py-1 border-4 border-ink brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all -rotate-1"
      >
        kanaka.pages
      </Link>

      <div className="hidden md:flex items-center gap-10">
        <Link
          href="/blogs"
          className="relative group text-ink font-bold font-mono text-xl uppercase"
        >
          Blogs
          <svg className="absolute -bottom-2 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 L10,0 L20,20 L30,0 L40,20 L50,0 L60,20 L70,0 L80,20 L90,0 L100,10" fill="none" stroke="currentColor" strokeWidth="8" vectorEffect="non-scaling-stroke" />
          </svg>
        </Link>
        <Link
          href="/newsletter"
          className="relative group text-ink font-bold font-mono text-xl uppercase"
        >
          Newsletter
          <svg className="absolute -bottom-2 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#ff90e8]" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 L10,0 L20,20 L30,0 L40,20 L50,0 L60,20 L70,0 L80,20 L90,0 L100,10" fill="none" stroke="currentColor" strokeWidth="8" vectorEffect="non-scaling-stroke" />
          </svg>
        </Link>
        <Link
          href="/about"
          className="relative group text-ink font-bold font-mono text-xl uppercase"
        >
          About
          <svg className="absolute -bottom-2 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#38bdf8]" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 L10,0 L20,20 L30,0 L40,20 L50,0 L60,20 L70,0 L80,20 L90,0 L100,10" fill="none" stroke="currentColor" strokeWidth="8" vectorEffect="non-scaling-stroke" />
          </svg>
        </Link>
      </div>

      <div className="flex items-center gap-gap-sm">
        {/* TODO: Implement search functionality */}
        {/* <div className="hidden lg:flex items-center bg-surface-container-lowest border-[3px] border-ink px-3 py-2 focus-within:shadow-brutal transition-shadow">
          <input
            className="bg-transparent border-none focus:ring-0 font-mono text-label-mono placeholder:text-on-surface-variant w-40 outline-none"
            placeholder="Search..."
            type="text"
          />
          <span className="text-ink text-sm ml-1">🔍</span>
        </div> */}
      </div>
    </nav>
  );
}
