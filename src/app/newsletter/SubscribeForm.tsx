"use client";

import { useState, useTransition } from "react";
import { subscribe } from "./actions";

const MESSAGES = {
  ok: "You're on the list!",
  duplicate: "You're already subscribed!",
  invalid: "That doesn't look like a valid email.",
} as const;

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await subscribe(email);
      setMessage(MESSAGES[result.status]);
      if (result.status === "ok") {
        setEmail("");
      }
    });
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 relative z-20">
      <form
        className="w-full flex flex-col md:flex-row gap-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-2/3 text-xl md:text-2xl font-mono p-4 border-[6px] border-ink bg-[#fbf8f1] focus:outline-none focus:bg-white transition-colors brutal-shadow-sm placeholder:text-ink/40"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto bg-[#ffba08] text-ink font-mono font-black text-2xl uppercase px-8 py-4 border-[6px] border-ink brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-yellow-500 whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none"
        >
          {isPending ? "..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <p className="font-mono font-bold text-lg bg-white border-4 border-ink px-4 py-2 brutal-shadow-sm">
          {message}
        </p>
      )}
    </div>
  );
}
