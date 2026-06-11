"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[85vh] bg-[#fbf8f1] text-ink font-sans flex flex-col items-center justify-center px-4 text-center gap-6">
      <div className="bg-[#ff90e8] border-4 border-ink px-8 py-4 brutal-shadow-lg rotate-1">
        <h1 className="text-4xl md:text-6xl font-black font-mono uppercase tracking-tighter">
          Something Went Wrong
        </h1>
      </div>
      <p className="font-mono text-lg max-w-xl">
        We hit a snag loading this page. Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-action text-white font-mono font-bold uppercase border-[3px] border-ink px-6 py-3 brutal-shadow brutal-hover brutal-active transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
