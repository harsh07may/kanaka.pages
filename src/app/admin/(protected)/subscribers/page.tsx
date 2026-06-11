import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { requireAuth } from "../actions";

export default async function AdminSubscribersPage() {
  await requireAuth();

  const rows = await db
    .select()
    .from(subscribers)
    .orderBy(desc(subscribers.createdAt));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-3xl font-black uppercase">Subscribers</h1>
        <span className="font-mono font-bold uppercase text-sm border-[3px] border-ink px-3 py-1.5 bg-[#fef08a] brutal-shadow">
          {rows.length} total
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.id}
            className="bg-white border-[3px] border-ink brutal-shadow flex items-center justify-between gap-4 px-4 py-3"
          >
            <span className="font-mono font-bold">{row.email}</span>
            <span className="font-mono text-xs text-ink/60">
              {row.createdAt.toLocaleDateString()}
            </span>
          </div>
        ))}

        {rows.length === 0 && (
          <p className="font-mono text-ink/60">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}
