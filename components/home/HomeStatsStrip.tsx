"use client";

import { motion } from "framer-motion";

/** Simple qualitative highlights — avoids invented metrics */
const HIGHLIGHTS = [
  { value: "Local", label: "Milan, New Mexico · locally owned shop" },
  { value: "Welding", label: "MIG & TIG precision welding" },
  { value: "Machining", label: "In-house CNC and manual machining" },
  { value: "Fabrication", label: "Laser, forming & assembly" },
  { value: "Full scope", label: "One-off builds through production volumes" },
] as const;

export function HomeStatsStrip() {
  return (
    <section
      aria-label="At a glance"
      className="border-y border-brand-blue-light/10 bg-charcoal-900/50 py-14 sm:py-16"
    >
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-6 lg:gap-8"
        >
          {HIGHLIGHTS.map((row) => (
            <div key={row.label} className="min-w-0 text-left">
              <p className="text-lg font-black uppercase tracking-[0.12em] text-brand-blue-light sm:text-xl">
                {row.value}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-steel-300">{row.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
