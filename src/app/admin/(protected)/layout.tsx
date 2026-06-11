import "@mdxeditor/editor/style.css";
import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "../login/actions";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f3f4] font-sans text-ink">
      <nav className="bg-white w-full border-b-[6px] border-ink flex justify-between items-center px-4 md:px-12 py-4 sticky top-0 z-50">
        <Link
          href="/admin"
          className="font-mono text-xl md:text-2xl font-black uppercase tracking-tighter text-ink bg-[#fef08a] px-4 py-1 border-4 border-ink brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all -rotate-1"
        >
          Admin
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/admin/hero"
            className="font-mono font-bold uppercase text-sm text-ink underline"
          >
            Hero
          </Link>
          <Link
            href="/"
            className="font-mono font-bold uppercase text-sm text-ink underline"
          >
            ← Back to site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="font-mono font-bold uppercase text-sm text-ink underline"
            >
              Log out
            </button>
          </form>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10">{children}</main>
    </div>
  );
}
