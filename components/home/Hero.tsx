"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigationMenu } from "@/components/layout/NavigationMenuContext";
import { GoogleReviewBadge } from "@/components/layout/GoogleReviewBadge";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NUDGE_KEY = "accufab-hero-nudge";
const NUDGE_DISTANCE = 100;
let nudgePlayedInMemory = false;

function nudgeAlreadyPlayed() {
  if (nudgePlayedInMemory) return true;
  try {
    return sessionStorage.getItem(NUDGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markNudgePlayed() {
  nudgePlayedInMemory = true;
  try {
    sessionStorage.setItem(NUDGE_KEY, "1");
  } catch {
    // Private browsing can block storage.
  }
}

const secondaryLinkClass = cn(
  "btn-steel inline-flex items-center justify-center rounded-sm border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md",
  "hover:border-accent hover:bg-white/15 hover:text-accent",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "w-full sm:w-auto sm:py-4"
);

export function Hero() {
  const { openMenu } = useNavigationMenu();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion !== false) return;
    if (nudgeAlreadyPlayed() || window.scrollY > 16) {
      if (window.scrollY > 16) markNudgePlayed();
      return;
    }

    let cancelled = false;
    let programmatic = false;
    const cancel = () => {
      cancelled = true;
      markNudgePlayed();
    };
    const onScroll = () => {
      if (programmatic || window.scrollY <= 16) return;
      cancel();
    };

    const capture: AddEventListenerOptions = { passive: true, capture: true };
    window.addEventListener("pointerdown", cancel, capture);
    window.addEventListener("keydown", cancel, capture);
    window.addEventListener("touchstart", cancel, capture);
    window.addEventListener("wheel", cancel, capture);
    window.addEventListener("scroll", onScroll, { passive: true });

    let onVisible: (() => void) | null = null;
    const nudge = () => {
      if (cancelled || window.scrollY > 16 || nudgeAlreadyPlayed()) return;
      if (document.visibilityState !== "visible") {
        onVisible = () => {
          if (document.visibilityState !== "visible") return;
          document.removeEventListener("visibilitychange", onVisible!);
          onVisible = null;
          nudge();
        };
        document.addEventListener("visibilitychange", onVisible);
        return;
      }
      markNudgePlayed();
      programmatic = true;
      window.scrollBy({ top: NUDGE_DISTANCE, behavior: "smooth" });
    };
    const timer = window.setTimeout(nudge, 5000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (onVisible) document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointerdown", cancel, capture);
      window.removeEventListener("keydown", cancel, capture);
      window.removeEventListener("touchstart", cancel, capture);
      window.removeEventListener("wheel", cancel, capture);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  const scrollToNext = () => {
    markNudgePlayed();
    const target = document.getElementById("explore-services");
    if (!target) return;
    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      className="relative z-10 flex w-full flex-col items-center bg-transparent px-4 pt-28 shadow-none sm:px-6 md:pt-40 lg:pt-44"
      aria-label="Hero"
    >
      <div className="flex w-full min-h-[calc(100svh-7rem)] flex-col md:min-h-[calc(100svh-10rem)] lg:min-h-[calc(100svh-11rem)]">
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
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
          }
          className="hero-copy mt-auto w-full text-center sm:mt-3"
        >
          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-steel-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-base">
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

        <div className="mx-auto flex w-full flex-col items-center pt-5 sm:mt-auto sm:w-max sm:pt-6">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
            <Button href="/quote" size="lg" className="w-full shrink-0 sm:w-auto" transition>
              Request a quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <button type="button" onClick={openMenu} className={secondaryLinkClass}>
              Explore services
            </button>
          </div>
          <motion.button
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll to see more"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.75 }}
            className="relative z-10 mt-1.5 mb-2 inline-flex h-8 w-8 items-center justify-center text-steel-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <motion.span
              aria-hidden
              animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.15 }
              }
              className="inline-flex"
            >
              <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
            </motion.span>
          </motion.button>
          <div className="relative h-0 w-full">
            <div className="absolute inset-x-0 top-0">
              <GoogleReviewBadge />
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="mx-auto aspect-[1296/480] w-[84%] sm:w-[22.365rem]" />
    </section>
  );
}
