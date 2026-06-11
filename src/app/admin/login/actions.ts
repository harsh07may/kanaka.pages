"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function login(
  _prevState: string | undefined,
  formData: FormData,
) {
  const password = String(formData.get("password") ?? "");
  const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? "";

  const valid = passwordHash
    ? await bcrypt.compare(password, passwordHash)
    : false;

  if (!valid) {
    return "Incorrect password.";
  }

  const session = await getSession();
  session.isLoggedIn = true;
  await session.save();

  redirect("/admin");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
