"use server";

import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult =
  | { status: "ok" }
  | { status: "duplicate" }
  | { status: "invalid" };

export async function subscribe(email: string): Promise<SubscribeResult> {
  const normalized = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalized)) {
    return { status: "invalid" };
  }

  try {
    await db.insert(subscribers).values({
      id: crypto.randomUUID(),
      email: normalized,
    });
    return { status: "ok" };
  } catch (err) {
    const cause = err instanceof Error ? err.cause : undefined;
    if (
      cause &&
      typeof cause === "object" &&
      "code" in cause &&
      cause.code === "23505"
    ) {
      return { status: "duplicate" };
    }
    throw err;
  }
}
