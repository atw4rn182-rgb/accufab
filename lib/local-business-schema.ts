import { COMPANY } from "@/lib/constants";
import { absoluteUrl, SITE_URL } from "@/lib/metadata";

/** Milan, NM — used for local SEO schema (approximate shop area). */
export const BUSINESS_GEO = {
  latitude: 35.1697,
  longitude: -107.8878,
} as const;

export const BUSINESS_ADDRESS = {
  addressLocality: "Milan",
  addressRegion: "NM",
  postalCode: "87021",
  addressCountry: "US",
} as const;

const SERVICE_TYPES = [
  "Precision MIG and TIG welding",
  "Custom metal fabrication",
  "CNC and manual machining",
  "Laser cutting and forming",
  "Hydraulic cylinder repair",
  "Drill pipe work",
  "Mobile field service and on-site welding repair",
] as const;

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Accu-Fab NM",
    alternateName: [`${COMPANY.name} LLC`, COMPANY.name],
    description:
      "Precision metal fabrication, welding, and machining shop in Milan, New Mexico. Metal fabrication, welding, CNC machining, and hydraulic repair serving the Four Corners region.",
    url: SITE_URL,
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    email: COMPANY.email,
    image: absoluteUrl("/og-image.jpg"),
    logo: absoluteUrl("/brand/accufab-wordmark.png"),
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Milan", containedInPlace: { "@type": "State", name: "New Mexico" } },
      { "@type": "AdministrativeArea", name: "Four Corners region" },
      { "@type": "State", name: "New Mexico" },
      { "@type": "State", name: "Texas" },
    ],
    knowsAbout: SERVICE_TYPES,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Welding & fabrication services",
      itemListElement: SERVICE_TYPES.map((name, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${SITE_URL}/#localbusiness` },
          areaServed: "Four Corners and Texas",
        },
      })),
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phoneHref.replace("tel:", ""),
      email: COMPANY.email,
      contactType: "customer service",
      areaServed: ["US-NM", "US-TX"],
      availableLanguage: ["English"],
    },
  };
}
