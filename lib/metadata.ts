import type { Metadata } from "next";
import { COMPANY } from "./constants";

/** Primary domain for SEO — accufabnm.com is the canonical site. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://accufabnm.com"
).replace(/\/$/, "");

const googleSiteVerification = "Cit3l9CILL9Bwp0P-u_RsBbKGg7";

/** Homepage — optimized for local search (Milan, NM & Four Corners). */
export const HOME_TITLE =
  "Welding & Metal Fabrication Shop in Milan, NM | Accu-Fab";

export const HOME_DESCRIPTION =
  "Accu-Fab is a welding and fabrication shop in Milan, New Mexico. MIG/TIG welding, CNC machining, custom metal fabrication, hydraulic repair, and mobile field service for the Four Corners and Texas.";

/** Sitewide defaults (layout fallback). */
export const SITE_TITLE = HOME_TITLE;
export const SITE_DESCRIPTION = HOME_DESCRIPTION;

/** Build an absolute canonical URL on accufabnm.com. */
export function absoluteUrl(path = ""): string {
  if (!path || path === "/") {
    return `${SITE_URL}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: SITE_TITLE,
    template: `%s | ${COMPANY.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: COMPANY.name,
  keywords: [
    "Accu-Fab",
    "welding shop Milan NM",
    "metal fabrication Milan New Mexico",
    "welding shop near me Four Corners",
    "CNC machining Milan NM",
    "custom fabrication New Mexico",
    "hydraulic repair Milan NM",
    "mobile welding repair New Mexico",
    "accufabnm.com",
  ],
  authors: [{ name: COMPANY.name, url: SITE_URL }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: googleSiteVerification,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: COMPANY.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} — precision welding and fabrication in Milan, New Mexico`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function pageMetadata(
  title: string,
  description: string,
  path = ""
): Metadata {
  const url = absoluteUrl(path);
  const pageTitle = `${title} | ${COMPANY.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: COMPANY.name,
      title: pageTitle,
      description,
      images: baseMetadata.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}
