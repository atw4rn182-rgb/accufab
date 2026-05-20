import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Projects",
  "See real Accu-Fab project work — welded repairs, machined parts, drill pipe, and custom fabrication completed for customers across the Four Corners and Texas.",
  "/projects"
);

const intro =
  "Real work from our Milan, New Mexico shop — large machining, precision components, heavy pipe fabrication, and custom builds delivered with pride and accuracy.";

export default function ProjectsPage() {
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
            Work samples
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
            Projects
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
