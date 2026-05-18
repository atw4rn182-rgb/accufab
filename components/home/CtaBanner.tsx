import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section
      id="cta-quote"
      aria-labelledby="cta-heading"
      className="scroll-anchor border-y border-brand-blue-light/25 bg-charcoal-950/40"
    >
      <div className="relative overflow-hidden">
        {/* Accent beams */}
        <div
          className="pointer-events-none absolute inset-0 industrial-grid opacity-30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-full w-72 skew-x-12 bg-brand-blue-light/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-full w-72 skew-x-12 bg-brand-blue/15 blur-3xl"
          aria-hidden
        />

        <div className="section-padding relative">
          <div className="container-narrow">
            <AnimateIn>
              <div className="flex flex-col items-start justify-between gap-8 rounded-sm border border-brand-blue-light/10 bg-charcoal-900/78 px-8 py-10 shadow-xl shadow-black/40 lg:flex-row lg:items-center lg:px-12 lg:py-12">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue-light">
                    Start your program
                  </p>
                  <h2
                    id="cta-heading"
                    className="mt-3 text-3xl font-bold tracking-tight text-steel-100 sm:text-4xl"
                  >
                    Ready to Start Your Project?
                  </h2>
                  <p className="mt-4 text-lg text-steel-400">{COMPANY.tagline}</p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto lg:flex-col xl:flex-row">
                  <Button href="/quote" size="lg" className="glow-accent whitespace-nowrap" transition>
                    Get a Quote
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </Button>
                  <Button href="/capabilities" variant="outline" size="lg">
                    Review capabilities
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
