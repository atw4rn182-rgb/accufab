import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_ORIGIN = "https://accufabnm.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const proto = request.headers.get("x-forwarded-proto");

  // Local dev and preview deployments — do not redirect
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".vercel.app")
  ) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const target = new URL(`${pathname}${search}`, CANONICAL_ORIGIN);

  if (host === "www.accufabnm.com") {
    return NextResponse.redirect(target, 301);
  }

  if (host === "accufabnm.com" && proto === "http") {
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
