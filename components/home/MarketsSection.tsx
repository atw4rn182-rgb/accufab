"use client";

import { SafeRemoteImage } from "@/components/ui/SafeRemoteImage";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_MARKETS } from "@/lib/constants";

export function MarketsSection() {
  return (
    <section
      id="markets"
      aria-labelledby="markets-heading"
      className="scroll-anchor section-padding bg-charcoal-900/10"
    >
      <div className="container-narrow">
        <SectionHeading
          titleId="markets-heading"
          eyebrow="Solutions & Markets"
          title="Segments powered by weldments, machined detail & fabricated metal"
          description="From walk-in repairs and one-off fabrications to more involved programs—we support Grants, the Four Corners region, and Texas when schedules, prints, and fit-up expectations need to align."
          align="center"
          className="mb-14 lg:mb-16"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {HOME_MARKETS.map((market, i) => (
            <AnimateIn key={market.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.22 }}
                className="group relative overflow-hidden rounded-sm border border-white/10 bg-charcoal-800/40 ring-1 ring-transparent transition-all duration-300 hover:border-accent/40 hover:ring-accent/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeRemoteImage
                    src={market.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-950/10"
                    aria-hidden
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold tracking-tight text-white">{market.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-300">
                      {market.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
