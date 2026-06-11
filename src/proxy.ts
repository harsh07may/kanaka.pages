import { getIronSession } from "iron-session";
import { type NextRequest, NextResponse } from "next/server";
import { type SessionData, sessionOptions } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );

  if (!session.isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (session.isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
