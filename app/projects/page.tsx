import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { pageSeoMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageSeoMetadata({
  title: "Our Projects | Custom Metal Fabrication Portfolio - Accu-Fab NM",
  description:
    "Browse Accu-Fab NM project work — welded repairs, CNC machined parts, drill pipe fabrication, and custom metal builds from our Milan, New Mexico shop serving the Four Corners.",
  path: "/projects",
  absoluteTitle: true,
});

const intro =
  "Real custom metal fabrication from our Milan, New Mexico welding shop — large machining, precision components, heavy pipe fabrication, and custom builds delivered with pride and accuracy across the Four Corners region.";

export default function ProjectsPage() {
  return (
    <div className="min-h-[68vh] bg-charcoal-950 px-4 pb-32 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      <section className="container-narrow mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-steel-300 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Home
        </Link>

        <div className="surface-panel mx-auto mt-12 max-w-4xl p-8 text-center sm:p-12 lg:p-14">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue-light">
            Custom Metalwork Portfolio
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
            Custom Metal Fabrication Projects in New Mexico
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-steel-200">
            {intro}
          </p>
        </div>

        <ProjectsGallery />
      </section>
    </div>
  );
}
