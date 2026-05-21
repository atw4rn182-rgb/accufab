import type { Metadata } from "next";
import { COMPANY } from "./constants";

/** Primary domain for SEO — accufabnm.com is the canonical site. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://accufabnm.com"
).replace(/\/$/, "");

const googleSiteVerification = "Cit3l9CILL9Bwp0P-u_RsBbKGg7";

/** Canonical homepage — always https://accufabnm.com (non-www). */
export const CANONICAL_HOME_URL = `${SITE_URL}/`;

/** Homepage title and description. */
export const HOME_TITLE =
  "Accu-Fab NM | Precision Metal Fabrication & Welding in Milan, NM";

export const HOME_DESCRIPTION =
  "Accu-Fab NM offers precision metal fabrication, welding, CNC machining, hydraulic repair, and custom metalwork in Milan, New Mexico. Fast quotes, quality work serving the Four Corners area.";

export const HOME_KEYWORDS =
  "metal fabrication Milan NM, welding shop New Mexico, CNC machining Milan, hydraulic repair, custom metalwork, Four Corners fabrication";

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
  keywords: HOME_KEYWORDS,
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
    canonical: CANONICAL_HOME_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CANONICAL_HOME_URL,
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
  return pageSeoMetadata({ title, description, path });
}

/** Page-level SEO with canonical URL, robots, and Open Graph. */
export function pageSeoMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${COMPANY.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      type: "website",
      locale: "en_US",
      url,
      title: socialTitle,
      description,
    },
    twitter: {
      ...baseMetadata.twitter,
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
