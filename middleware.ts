import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_HOST = "accufabnm.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const proto = request.headers.get("x-forwarded-proto");

  if (host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next();
  }

  const isProductionHost =
    host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;
  if (!isProductionHost) {
    return NextResponse.next();
  }

  const needsWwwRedirect = host === `www.${CANONICAL_HOST}`;
  const needsHttpsRedirect = proto === "http";

  if (needsWwwRedirect || needsHttpsRedirect) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
