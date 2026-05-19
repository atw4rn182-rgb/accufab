import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CapabilitiesGallery } from "@/components/capabilities/CapabilitiesGallery";
import { COMPANY } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Capabilities",
  "Explore Accu-Fab capabilities: precision welding, CNC and manual machining, drill pipe work, hydraulic repair, and custom fabrication for tough jobs.",
  "/capabilities"
);

const intro =
  "Accu-Fab delivers precision welding, CNC and manual machining, hydraulic repair, drill pipe work, and custom fabrication from our shop in Milan, New Mexico — and in the field when your equipment cannot come to us.";

export default function CapabilitiesPage() {
  return (
    <div className="min-h-[68vh] bg-charcoal-950/10 px-4 pb-28 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      <section className="container-narrow mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-steel-300 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Home
        </Link>

        <div className="mx-auto mt-10 max-w-4xl rounded-sm border border-brand-blue-light/15 bg-charcoal-950/42 p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-[2px] sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue-light">
            What we do
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
            Capabilities
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-steel-200">
            {intro}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-steel-300">
            Serving the Four Corners region and Texas — {COMPANY.name} brings the same attention to
            detail on every project, in the shop or on site.
          </p>
        </div>

        <CapabilitiesGallery />
      </section>
    </div>
  );
}
