import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { pageSeoMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageSeoMetadata({
  title: "News & Updates | Accu-Fab NM Metal Fabrication Milan, New Mexico",
  description:
    "News and updates from Accu-Fab NM — welding, CNC machining, metal fabrication, and field service from our Milan, New Mexico shop in the Four Corners region.",
  path: "/news",
  absoluteTitle: true,
});

export default function NewsPage() {
  return (
    <div className="min-h-[70vh] bg-charcoal-950/10 px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="container-narrow mx-auto max-w-2xl rounded-sm border border-brand-blue-light/15 bg-charcoal-950/42 p-6 shadow-2xl shadow-black/25 backdrop-blur-[2px] sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-steel-300 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <h1 className="mt-8 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          Accu-Fab NM News &amp; Shop Updates
        </h1>
        <p className="mt-4 text-lg font-medium text-steel-300">
          Stories and announcements from our Milan, New Mexico fabrication shop will appear here soon.
        </p>
      </div>
    </div>
  );
}
