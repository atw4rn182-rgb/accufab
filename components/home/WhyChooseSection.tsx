import { Flame, Flag, Sparkles, Zap, CircleCheck } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STRENGTHS, VALUES, WHY_STATS } from "@/lib/constants";

const iconMap = {
  flag: Flag,
  flame: Flame,
  sparkles: Sparkles,
  zap: Zap,
} as const;

export function WhyChooseSection() {
  return (
    <section
      id="why-accu-fab"
      aria-labelledby="why-heading"
      className="scroll-anchor relative overflow-hidden section-padding bg-charcoal-950/10"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-blue-light/10 blur-[100px]"
        aria-hidden
      />

      <div className="container-narrow relative">
        <SectionHeading
          titleId="why-heading"
          eyebrow="Why Accu-Fab"
          title="American weld & fabrication craftsmanship your drawings deserve"
          description="Experienced welders, machinists, and fabricators who treat joint planning, machined interfaces, and finish expectations as seriously as dimensional checks—starting with straightforward communication in Milan, New Mexico."
          align="center"
          className="mb-12 lg:mb-14"
        />

        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_STATS.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-sm border border-brand-blue-light/30 bg-gradient-to-br from-brand-blue-light/[0.08] to-transparent px-5 py-6">
                <p className="text-3xl font-bold tracking-tight text-steel-100">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-blue-light">
                  {stat.label}
                </p>
                <p className="mt-3 text-sm leading-snug text-steel-400">{stat.hint}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STRENGTHS.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <AnimateIn key={item.title} delay={i * 0.08}>
                <article className="group relative h-full rounded-sm border border-brand-blue-light/10 bg-charcoal-900/70 p-6 transition-all duration-300 hover:border-brand-blue-light/45 hover:bg-charcoal-900/85">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-brand-blue-light/15 text-brand-blue-light transition-colors duration-300 group-hover:bg-brand-blue-light group-hover:text-charcoal-950">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-steel-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-400">{item.description}</p>
                </article>
              </AnimateIn>
            );
          })}
        </div>

        <AnimateIn delay={0.12}>
          <div className="mt-16 rounded-sm border border-brand-blue-light/10 bg-charcoal-900/40 px-6 py-10 lg:px-10">
            <h3 className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue-light">
              Values in motion
            </h3>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {VALUES.map((v) => (
                <li key={v.title} className="flex gap-3">
                  <CircleCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-light"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div>
                    <p className="font-semibold text-steel-100">{v.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-steel-400">{v.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
