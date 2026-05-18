import { SafeRemoteImage } from "@/components/ui/SafeRemoteImage";
import {
  Flame,
  Cpu,
  Layers3,
  ScanLine,
  PackageCheck,
  DraftingCompass,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_CAPABILITIES } from "@/lib/constants";

/** Icons aligned with weld / machine / fabricate positioning */
const capabilityIcons = {
  welding: Flame,
  machining: Cpu,
  sheetMetal: Layers3,
  laserForming: ScanLine,
  finishingAssembly: PackageCheck,
  engineeringDesign: DraftingCompass,
} as const;

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-anchor section-padding bg-charcoal-950/10"
    >
      <div className="container-narrow">
        <SectionHeading
          titleId="capabilities-heading"
          eyebrow="Capabilities"
          title="Welding, machining, drill pipe & fabrication — built under one roof"
          description="Welding, CNC and manual machining, laser and forming work, finishes, assembly, and practical engineering support—delivered from our shop in Milan, New Mexico for the Four Corners region and Texas."
          align="center"
          className="mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {HOME_CAPABILITIES.map((cap, i) => {
            const Icon = capabilityIcons[cap.icon];
            return (
              <AnimateIn key={cap.title} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-brand-blue-light/10 bg-charcoal-900/72 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-light/45 hover:shadow-xl hover:shadow-brand-blue-light/10">
                  <div className="relative h-28 w-full shrink-0 overflow-hidden">
                    <SafeRemoteImage
                      src={cap.image}
                      alt=""
                      fill
                      className="object-cover opacity-55 transition-all duration-500 group-hover:scale-105 group-hover:opacity-75"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 16vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-sm bg-brand-blue-light/15 text-brand-blue-light transition-colors duration-300 group-hover:bg-brand-blue-light group-hover:text-charcoal-950">
                      <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-steel-100">{cap.title}</h3>
                    <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-steel-300">
                      {cap.description}
                    </p>
                  </div>
                </article>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
