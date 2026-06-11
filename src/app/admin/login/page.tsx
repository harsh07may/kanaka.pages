"use client";

import { useActionState } from "react";
import { login } from "./actions";

const inputClass =
  "w-full bg-[#fbf8f1] border-[3px] border-ink px-4 py-2 font-mono text-base text-ink brutal-shadow focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all";

const labelClass = "block font-mono text-sm font-bold uppercase mb-1 text-ink";

export default function LoginPage() {
  const [error, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f4] font-sans text-ink px-4">
      <form
        action={formAction}
        className="w-full max-w-sm flex flex-col gap-4 bg-white border-[3px] border-ink p-8 brutal-shadow-lg"
      >
        <h1 className="font-mono text-2xl font-black uppercase">Admin Login</h1>

        <div>
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={inputClass}
          />
        </div>

        {error && (
          <p className="font-mono text-sm font-bold text-[var(--color-error)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="self-start bg-action text-white font-mono font-bold uppercase border-[3px] border-ink px-6 py-3 brutal-shadow brutal-hover brutal-active transition-all disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
