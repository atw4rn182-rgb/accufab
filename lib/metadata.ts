import type { Metadata } from "next";
import { COMPANY } from "./constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.accu-fab.com";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | Precision Welding, CNC Machining & Drill Pipe and Fabrication`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.tagline,
  keywords: [
    "precision welding",
    "MIG welding",
    "TIG welding",
    "CNC machining",
    "drill pipe and fabrication",
    "laser cutting",
    "metal forming",
    "USA fabrication",
    "weldments",
    "Made in USA",
    "OEM metal fabrication",
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Precision Welding, CNC Machining & Fabrication`,
    description: COMPANY.tagline,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} — Precision welding & fabrication`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Precision Welding, CNC Machining & Fabrication`,
    description: COMPANY.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function pageMetadata(
  title: string,
  description: string,
  path = ""
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${COMPANY.name}`,
      description,
      url: `${siteUrl}${path}`,
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
  };
}
