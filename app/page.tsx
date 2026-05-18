import Image from "next/image";
import { Hero } from "@/components/home/Hero";

const missionStatement =
  "At Accu-Fab, we deliver precision welding, CNC and manual machining, hydraulic repair, and custom fabrication with pride and accuracy. From Milan, New Mexico, we support the Four Corners region and Texas with the same attention to detail on every project.";

const servicePhotos = Array.from(
  { length: 11 },
  (_, index) => `/images/service-${String(index + 1).padStart(2, "0")}.png`
);

/**
 * Minimal homepage with a focused services photo grid.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="explore-services" className="px-4 pb-28 pt-16 sm:px-6 lg:px-8">
        <div className="container-narrow mx-auto">
          <div className="mx-auto max-w-4xl rounded-sm border border-brand-blue-light/15 bg-charcoal-950/42 p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-[2px] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue-light">
              Explore Services
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-steel-100 sm:text-5xl">
              Shop Work & Fabrication
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-steel-300">
              {missionStatement}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {servicePhotos.map((src, index) => (
              <article
                key={src}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-brand-blue-light/15 bg-charcoal-950/40 shadow-xl shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-light/55 hover:shadow-2xl hover:shadow-brand-blue-light/15"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  unoptimized
                  priority={index < 3}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/25 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
