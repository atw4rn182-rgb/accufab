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
    <div className="min-h-[70vh] bg-transparent px-4 pb-32 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
      <section className="container-narrow mx-auto">
        <div className="surface-panel mx-auto max-w-4xl p-8 text-center sm:p-12 lg:p-14">
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

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-28 lg:grid-cols-3 xl:gap-10">
          {servicePhotos.map((src, index) => (
            <article
              key={src}
              className="surface-media group relative aspect-[4/3]"
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
