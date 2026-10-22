import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/home/Hero";
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
  { src: "/images/service-12.png", alt: "" },
  { src: "/images/service-13.png", alt: "" },
  { src: "/images/service-14.png", alt: "" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section
        id="explore-services"
        className="relative z-10 bg-transparent px-4 pb-32 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32"
      >
        <div className="container-narrow mx-auto">
          <div className="surface-panel mx-auto max-w-4xl p-8 text-center sm:p-12 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue-light">
              Advanced Metal Fabrication Capabilities
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
              Metal Fabrication &amp; Welding Services in New Mexico
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-steel-200">
              {missionStatement}
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-10">
            {servicePhotos.map((photo, index) => (
              <article
                key={photo.src}
                className="surface-media group relative aspect-[4/3]"
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
