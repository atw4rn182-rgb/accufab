"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const secondaryLinkClass = cn(
  "inline-flex items-center justify-center rounded-sm border border-charcoal-500 bg-charcoal-800/80 px-8 py-4 text-base font-semibold text-white transition-all duration-200",
  "hover:border-steel-500 hover:bg-charcoal-700",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  "w-full sm:w-auto"
);

export function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden pb-20 pt-36 sm:pb-24 sm:pt-40 lg:min-h-[min(90vh,52rem)] lg:pb-24 lg:pt-48"
      aria-label="Hero"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/brand/accufab-logo.jpg"
          alt=""
          fill
          className="scale-105 object-cover object-center blur-sm"
          sizes="100vw"
        />
        <Image
          src="/brand/accufab-logo.jpg"
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xDR5lI7c86kTgHvjJUBXbF6S8fV9X8b8fE6bG8jGd9Z6WbB8hF5f9Z7Z8fF6b//Z"
          className="object-contain object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/62 via-charcoal-950/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-950/92 via-charcoal-950/42 to-transparent" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-90" aria-hidden />

      <div className="container-narrow relative z-10 translate-y-8 px-4 sm:translate-y-10 sm:px-6 lg:translate-y-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl rounded-sm border border-white/10 bg-charcoal-950/22 px-5 py-8 text-center shadow-2xl shadow-black/25 backdrop-blur-[1px] sm:px-8 lg:max-w-[40rem]"
        >
          <p className="mb-6 inline-flex flex-wrap justify-center gap-x-2 rounded-sm border border-accent/35 bg-accent/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-xs">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse" aria-hidden />
            <span>{COMPANY.shortTagline}</span>
          </p>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
            Precision Welding <span className="text-accent">&amp;</span>{" "}
            <span className="text-gradient-accent">CNC Machining</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm font-semibold uppercase leading-relaxed tracking-[0.12em] text-accent sm:text-base">
            Hydraulic Cylinder Repair <span className="text-steel-500">•</span> Custom Fabrication{" "}
            <span className="text-steel-500">•</span> Heavy Duty Equipment Repair{" "}
            <span className="text-steel-500">•</span> Mining <span className="text-steel-500">&amp;</span>{" "}
            Drill Pipe
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-steel-300 sm:text-xl">
            {COMPANY.tagline}
          </p>

          <div className="mx-auto mt-12 flex max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
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
