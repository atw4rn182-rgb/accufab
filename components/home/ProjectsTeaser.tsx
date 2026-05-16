"use client";

import { SafeRemoteImage } from "@/components/ui/SafeRemoteImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/lib/constants";

export function ProjectsTeaser() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-anchor section-padding bg-charcoal-900/10"
    >
      <div className="container-narrow">
        <SectionHeading
          titleId="projects-heading"
          eyebrow="Featured projects"
          title="Representative weld, machine & fabrication programs"
          description="When project imagery is approved for the site, summaries will highlight welding approach, machined interfaces, formed blanks, and finishing—organized for quick scanning."
          align="center"
          className="mb-14 lg:mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <AnimateIn key={project.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                className="group relative overflow-hidden rounded-sm border border-white/10 bg-charcoal-950/82 ring-1 ring-transparent transition-[box-shadow,border-color] duration-300 hover:border-accent/45 hover:shadow-2xl hover:shadow-accent/10 hover:ring-accent/25"
              >
                <Link
                  href="/quote"
                  className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  aria-label={`${project.title}: View case study — opens quote request`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <SafeRemoteImage
                      src={project.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute left-4 top-4 rounded-sm bg-charcoal-950/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
                      Featured
                    </div>
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/65 to-charcoal-950/30 opacity-95 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-col gap-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                        View Case Study
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-accent">
                      {project.client}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-steel-400">{project.description}</p>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Project tags">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <span className="rounded-sm border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-steel-300">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </motion.article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
