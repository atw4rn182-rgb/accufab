import Image from "next/image";
import type { Metadata } from "next";
import { pageSeoMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageSeoMetadata({
  title: "Metal Fabrication Services & Capabilities | Accu-Fab NM Milan",
  description:
    "Expert metal fabrication, welding, CNC machining, hydraulic repair, and custom metalwork in Milan, New Mexico. Serving the Four Corners region.",
  path: "/services",
  absoluteTitle: true,
});

const missionStatement =
  "At Accu-Fab NM, we deliver high-quality welding, CNC machining, hydraulic repair, and custom metal fabrication from our Milan, New Mexico shop. No job is too small — every project gets the same precision and pride.";

const servicePhotos = Array.from({ length: 11 }, (_, index) => `/images/service-${String(index + 1).padStart(2, "0")}.png`);

export default function ServicesPage() {
  return (
    <div className="min-h-[68vh] bg-charcoal-950/10 px-4 pb-28 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      <section className="container-narrow mx-auto">
        <div className="mx-auto max-w-4xl rounded-sm border border-brand-blue-light/15 bg-charcoal-950/42 p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-[2px] sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue-light">
            Milan, NM Welding Shop
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
            Metal Fabrication &amp; Welding Services in New Mexico
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-steel-200">
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
                priority={index < 3}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/25 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40" />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
