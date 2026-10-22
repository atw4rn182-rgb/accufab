"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigationMenu } from "@/components/layout/NavigationMenuContext";
import { HERO_MEDIA_CLASS, HERO_STILL } from "@/lib/hero-media";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const secondaryLinkClass = cn(
  "inline-flex items-center justify-center rounded-sm border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-200",
  "hover:border-accent hover:bg-white/15 hover:text-accent",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "w-full sm:w-auto sm:py-4"
);

export function Hero() {
  const { openMenu } = useNavigationMenu();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-svh w-full overflow-hidden bg-black" aria-label="Hero">
      <div className="absolute inset-0 bg-black" aria-hidden>
        <picture>
          <source media="(min-width: 768px)" srcSet={HERO_STILL.wideWebp} type="image/webp" />
          <source media="(min-width: 768px)" srcSet={HERO_STILL.wide} type="image/jpeg" />
          <source srcSet={HERO_STILL.mobileWebp} type="image/webp" />
          <img
            src={HERO_STILL.mobile}
            alt=""
            width={1008}
            height={1792}
            data-hero-still=""
            fetchPriority="high"
            decoding="async"
            className={HERO_MEDIA_CLASS}
          />
        </picture>
      </div>

      <div className="relative z-10 flex h-full w-full md:items-center md:justify-center md:px-8 max-md:mx-auto max-md:max-w-7xl max-md:items-start max-md:px-4 max-md:pb-8 max-md:pt-[5.25rem] sm:max-md:px-6 sm:max-md:pt-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
          }
          className="w-full max-w-lg rounded-md border border-white/20 bg-black/40 px-4 py-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:px-6 sm:py-5 md:bg-black/30 md:text-center"
        >
          <p className="mb-3 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 rounded-sm border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-steel-100 sm:mb-5 sm:text-xs sm:tracking-[0.16em]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="min-w-0 max-w-[17rem] whitespace-normal leading-relaxed sm:max-w-none">
              {COMPANY.shortTagline}
            </span>
          </p>

          <h1 className="bg-gradient-to-b from-white via-[#e7edf4] to-[#b7c3d2] bg-clip-text text-[1.7rem] font-black leading-[1.08] tracking-tight text-transparent drop-shadow-[0_2px_1px_rgba(0,0,0,0.9)] sm:text-4xl md:text-[2.65rem] md:leading-[1.05]">
            Precision Metal Fabrication &amp; Welding in Milan, NM
          </h1>

          <p className="mt-3 text-base font-medium leading-relaxed text-steel-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:mt-4 sm:text-lg md:text-xl">
            Local experts in custom metalwork, CNC machining, hydraulic repair, and heavy equipment
            fabrication. Serving Milan, Grants, Gallup, and the entire Four Corners region.
          </p>

          <div className="mt-4 flex max-w-md flex-col gap-3 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4 md:mx-auto md:justify-center">
            <Button href="/quote" size="lg" className="glow-accent w-full shrink-0 sm:w-auto" transition>
              Request a quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <button type="button" onClick={openMenu} className={secondaryLinkClass}>
              Explore services
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-1.5 text-sm font-semibold text-steel-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] sm:mt-6 sm:flex-row sm:gap-6 md:items-center md:justify-center">
            <a href={COMPANY.phoneHref} className="transition-colors hover:text-accent">
              <span className="text-steel-300">Phone:</span> {COMPANY.phone}
            </a>
            <a href={COMPANY.emailHref} className="transition-colors hover:text-accent">
              <span className="text-steel-300">Email:</span> {COMPANY.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
