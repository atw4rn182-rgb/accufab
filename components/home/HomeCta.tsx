"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HomeCta() {
  return (
    <section
      aria-labelledby="home-cta-heading"
      className="border-t border-accent/20 bg-charcoal-950/10 pb-28 pt-20 sm:pb-32 sm:pt-24"
    >
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-3xl flex-col items-center rounded-sm border border-white/10 bg-charcoal-900/55 px-8 py-12 text-center sm:px-12 sm:py-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 id="home-cta-heading" className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start your project?
          </h2>
          <p className="mt-6 max-w-xl text-steel-400">
            Send prints, sketches, or a short description—we will confirm feasibility and outline next steps.
          </p>
          <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href="/quote" size="lg" className="glow-accent whitespace-nowrap" transition>
              Get a quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <Button href="/capabilities" variant="outline" size="lg" className="whitespace-nowrap">
              Browse capabilities
            </Button>
          </div>
          <p className="mt-8 text-sm text-steel-500">
            Prefer to call first? Reach us via the{" "}
            <Link href="/quote" className="font-medium text-accent underline-offset-4 hover:underline">
              contact page
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
