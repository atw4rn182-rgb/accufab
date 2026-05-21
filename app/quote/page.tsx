import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { absoluteUrl, baseMetadata } from "@/lib/metadata";

const QUOTE_TITLE = "Get a Quote | Accu-Fab NM - Metal Fabrication & Welding";
const QUOTE_DESCRIPTION =
  "Request a fast, free quote for precision metal fabrication, welding, CNC machining, or hydraulic repair in Milan, New Mexico. Serving the Four Corners area.";
const QUOTE_CANONICAL = absoluteUrl("/quote");

export const metadata: Metadata = {
  title: {
    absolute: QUOTE_TITLE,
  },
  description: QUOTE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: QUOTE_CANONICAL,
  },
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    locale: "en_US",
    url: QUOTE_CANONICAL,
    title: QUOTE_TITLE,
    description: QUOTE_DESCRIPTION,
  },
  twitter: {
    ...baseMetadata.twitter,
    card: "summary_large_image",
    title: QUOTE_TITLE,
    description: QUOTE_DESCRIPTION,
  },
};

export default function QuotePage() {
  return (
    <InnerPageShell
      title="Get Your Free Quote Today"
      eyebrow="Project questionnaire"
      subtitle="Tell us about your project and we'll get back to you within 24 hours with a competitive quote."
      centeredHeading
    >
      <QuoteForm />
    </InnerPageShell>
  );
}
