import { NextResponse } from "next/server";

/** Lightweight probe — does not touch Sharp or Grok-style image pipelines */
export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "accufab-website",
      uptimeHint: "If HTML routes return 500 with ENOENT in .next, run: npm run clean && npm run build",
    },
    { status: 200 }
  );
}
