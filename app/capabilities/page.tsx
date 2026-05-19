import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CapabilitiesGallery } from "@/components/capabilities/CapabilitiesGallery";
import { COMPANY } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Capabilities",
  "Accu-Fab capabilities: precision welding, on-site repairs, custom fabrication, CNC machining, laser cutting, forming, assembly, and mobile field service from Milan, New Mexico.",
  "/capabilities"
);

const intro =
  "Accu-Fab is a full-service metal fabrication and repair shop in Milan, New Mexico, serving the Four Corners region and Texas. In-house, we deliver precision MIG and TIG welding, custom metal fabrication, CNC and manual machining, laser cutting, brake forming, and mechanical assembly — along with hydraulic cylinder repair and drill pipe work for industrial and heavy-duty applications. When equipment cannot travel, our mobile field service trucks bring on-site welding, fabrication, and repair to your job site with the same disciplined quality we apply in the shop.";

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
            {COMPANY.name} — one team, one standard of work, whether your project stays in-house or
            meets us in the field.
          </p>
        </div>

        <CapabilitiesGallery />
      </section>
    </div>
  );
}
