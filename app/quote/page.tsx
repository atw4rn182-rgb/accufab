import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Get A Quote",
  "Request a quote from Accu-Fab for welding, CNC and manual machining, hydraulic repair, drill pipe, or custom fabrication projects in Grants, NM today.",
  "/quote"
);

export default function QuotePage() {
  return (
    <InnerPageShell title="Get A Quote" eyebrow="Project questionnaire">
      <p>
        Tell us about your project so we can review it before reaching out. The more information you
        provide, the faster and more accurate your quote will be.
      </p>

      <QuoteForm />
    </InnerPageShell>
  );
}
