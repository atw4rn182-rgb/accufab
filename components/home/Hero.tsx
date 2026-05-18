"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const secondaryLinkClass = cn(
  "inline-flex items-center justify-center rounded-sm border border-brand-blue-light/45 bg-charcoal-800/80 px-8 py-4 text-base font-semibold text-steel-100 transition-all duration-200",
  "hover:border-accent hover:bg-charcoal-700 hover:text-accent",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "w-full sm:w-auto"
);

export function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-4rem)] items-start overflow-hidden pb-12 pt-24 sm:min-h-[calc(100vh-5rem)] sm:items-center sm:pb-24 sm:pt-40 lg:min-h-[min(90vh,52rem)] lg:pb-24 lg:pt-48"
      aria-label="Hero"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/brand/accufab-logo.jpg"
          alt=""
          fill
          quality={92}
          className="hidden scale-105 object-cover object-center blur-sm sm:block"
          sizes="100vw"
        />
        <Image
          src="/brand/accufab-logo.jpg"
          alt=""
          fill
          priority
          quality={100}
          className="object-contain object-center opacity-100"
          sizes="(max-width: 640px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-charcoal-950/4 sm:bg-charcoal-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/44 via-charcoal-950/10 to-transparent sm:from-charcoal-950/62 sm:via-charcoal-950/18 sm:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal-950/74 via-charcoal-950/22 to-transparent sm:h-1/2 sm:from-charcoal-950/92 sm:via-charcoal-950/42 sm:to-transparent" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue-light to-transparent opacity-90" aria-hidden />

      <div className="container-narrow relative z-10 w-full px-4 sm:translate-y-10 sm:px-6 lg:translate-y-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-sm border border-brand-blue-light/20 bg-charcoal-950/62 px-5 py-6 text-center shadow-2xl shadow-black/45 sm:max-w-3xl sm:border-brand-blue-light/15 sm:bg-charcoal-950/22 sm:px-8 sm:py-8 sm:shadow-black/25 sm:backdrop-blur-[1px] lg:max-w-[40rem]"
        >
          <p className="mb-4 inline-flex max-w-full flex-wrap justify-center gap-x-2 rounded-sm border border-brand-blue-light/45 bg-brand-blue-dark/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-blue-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:mb-6 sm:border-brand-blue-light/35 sm:bg-brand-blue-dark/25 sm:text-xs sm:tracking-[0.16em] sm:drop-shadow-none">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue-light animate-pulse" aria-hidden />
            <span className="min-w-0 max-w-[17rem] whitespace-normal leading-relaxed sm:max-w-none">
              {COMPANY.shortTagline}
            </span>
          </p>

          <h1 className="mx-auto max-w-[18rem] text-3xl font-bold leading-[1.08] tracking-tight text-steel-100 drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] sm:max-w-none sm:text-5xl sm:drop-shadow-none lg:text-[3.35rem]">
            Precision <span className="text-gradient-accent">CNC</span>{" "}
            <span className="text-brand-blue-light">and</span>
            <br className="sm:hidden" />{" "}
            <span className="text-gradient-accent">Manual Machining</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[19rem] text-[11px] font-semibold uppercase leading-relaxed tracking-[0.03em] text-brand-blue-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:mt-6 sm:max-w-2xl sm:text-base sm:tracking-[0.12em] sm:drop-shadow-none">
            Hydraulic Cylinder Repair <span className="text-steel-500">•</span> Custom Fabrication{" "}
            <span className="text-steel-500">•</span> CNC &amp; Manual Machining{" "}
            <span className="text-steel-500">•</span> Heavy Duty Equipment Repair{" "}
            <span className="text-steel-500">•</span> Mining <span className="text-steel-500">&amp;</span>{" "}
            Drill Pipe
          </p>

          <p className="mx-auto mt-5 max-w-[18rem] text-sm leading-relaxed text-steel-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:mt-8 sm:max-w-2xl sm:text-xl sm:text-steel-300 sm:drop-shadow-none">
            {COMPANY.tagline}
          </p>

          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Button href="/quote" size="lg" className="glow-accent shrink-0" transition>
              Request a quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <Link href="#explore-services" className={secondaryLinkClass}>
              Explore services
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm font-medium text-steel-300 sm:flex-row sm:gap-6">
            <a href={COMPANY.phoneHref} className="transition-colors hover:text-accent">
              <span className="text-steel-500">Phone:</span> {COMPANY.phone}
            </a>
            <a href={COMPANY.emailHref} className="transition-colors hover:text-accent">
              <span className="text-steel-500">Email:</span> {COMPANY.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
