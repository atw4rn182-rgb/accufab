import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import {
  CANONICAL_HOME_URL,
  HOME_DESCRIPTION,
  HOME_KEYWORDS,
  HOME_TITLE,
  baseMetadata,
} from "@/lib/metadata";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  keywords: HOME_KEYWORDS,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: CANONICAL_HOME_URL,
  },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    locale: "en_US",
    url: CANONICAL_HOME_URL,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    ...baseMetadata.twitter,
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const missionStatement =
  "At Accu-Fab, we deliver precision welding, CNC and manual machining, hydraulic repair, and custom fabrication with pride and accuracy. From Milan, New Mexico, we support the Four Corners region and Texas with the same attention to detail on every project.";

const servicePhotos = [
  { src: "/images/service-01.png", alt: "" },
  {
    src: "/images/shop-floor.png",
    alt: "Accu-Fab fabrication shop in Milan, New Mexico with machining equipment, forklifts, and an American flag",
  },
  ...Array.from({ length: 10 }, (_, index) => ({
    src: `/images/service-${String(index + 2).padStart(2, "0")}.png`,
    alt: "",
  })),
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <section id="explore-services" className="px-4 pb-28 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="container-narrow mx-auto">
          <div className="mx-auto max-w-4xl rounded-sm border border-brand-blue-light/15 bg-charcoal-950/42 p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-[2px] sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue-light">
              Explore Services
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
              Shop Work & Fabrication
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-steel-200">
              {missionStatement}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {servicePhotos.map((photo, index) => (
              <article
                key={photo.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-brand-blue-light/15 bg-charcoal-950/40 shadow-xl shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-light/55 hover:shadow-2xl hover:shadow-brand-blue-light/15"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
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
