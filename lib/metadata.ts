import type { Metadata } from "next";
import { COMPANY } from "./constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://accufabnm.com";
const googleSiteVerification = "Cit3l9CILL9Bwp0P-u_RsBbKGg7";
const homeDescription =
  "Accu-Fab provides precision welding, CNC and manual machining, hydraulic repair, and custom fabrication for Grants, Four Corners, and Texas projects.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | Precision Welding, CNC and Manual Machining & Fabrication`,
    template: `%s | ${COMPANY.name}`,
  },
  description: homeDescription,
  keywords: [
    "precision welding",
    "MIG welding",
    "TIG welding",
    "CNC machining",
    "manual machining",
    "drill pipe and fabrication",
    "laser cutting",
    "metal forming",
    "USA fabrication",
    "weldments",
    "Made in USA",
    "OEM metal fabrication",
  ],
  authors: [{ name: COMPANY.name }],
  verification: {
    google: googleSiteVerification,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Precision Welding, CNC and Manual Machining & Fabrication`,
    description: homeDescription,
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
    title: `${COMPANY.name} | Precision Welding, CNC and Manual Machining & Fabrication`,
    description: homeDescription,
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
    twitter: {
      title: `${title} | ${COMPANY.name}`,
      description,
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
  };
}
