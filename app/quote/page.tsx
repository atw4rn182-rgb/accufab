import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { pageSeoMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageSeoMetadata({
  title: "Get a Quote | Accu-Fab NM - Metal Fabrication & Welding",
  description:
    "Request a fast, free quote for precision metal fabrication, welding, CNC machining, or hydraulic repair in Milan, New Mexico. Serving the Four Corners area.",
  path: "/quote",
  absoluteTitle: true,
});

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
