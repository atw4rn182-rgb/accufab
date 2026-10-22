"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigationMenu } from "@/components/layout/NavigationMenuContext";
import { GoogleReviewBadge } from "@/components/layout/GoogleReviewBadge";
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
    <>
      <div className="pointer-events-none fixed inset-0 z-0 h-svh w-full overflow-hidden bg-black" aria-hidden>
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

      <section
        className="relative z-10 flex min-h-svh w-full flex-col items-center bg-transparent px-4 pb-6 pt-28 shadow-none sm:px-6 sm:pb-8 md:pb-10 md:pt-40 lg:pt-44"
        aria-label="Hero"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
          }
          className="hero-copy w-full text-center"
        >
          <p className="mb-2 inline-flex max-w-[14.5rem] flex-wrap items-center justify-center gap-x-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-steel-100 sm:max-w-none sm:text-xs sm:tracking-[0.16em]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="min-w-0 leading-relaxed">{COMPANY.shortTagline}</span>
          </p>

          <h1 className="mx-auto bg-gradient-to-b from-white via-[#e7edf4] to-[#b7c3d2] bg-clip-text text-2xl font-black leading-[1.08] tracking-tight text-transparent drop-shadow-[0_2px_1px_rgba(0,0,0,0.9)] sm:text-3xl lg:text-4xl">
            Precision Metal Fabrication &amp; Welding in Milan, NM
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-steel-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-base">
            Local experts in custom metalwork, CNC machining, hydraulic repair, and heavy equipment
            fabrication. Serving Milan, Grants, Gallup, and the entire Four Corners region.
          </p>

          <div className="mt-3 flex flex-col items-center gap-1 text-sm font-semibold text-steel-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            <a href={COMPANY.phoneHref} className="transition-colors hover:text-accent">
              <span className="text-steel-300">Phone:</span> {COMPANY.phone}
            </a>
            <a href={COMPANY.emailHref} className="transition-colors hover:text-accent">
              <span className="text-steel-300">Email:</span> {COMPANY.email}
            </a>
          </div>
        </motion.div>

        <GoogleReviewBadge />
        <div className="hero-copy mt-auto flex w-full justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-8">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
            <Button href="/quote" size="lg" className="glow-accent w-full shrink-0 sm:w-auto" transition>
              Request a quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <button type="button" onClick={openMenu} className={secondaryLinkClass}>
              Explore services
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
