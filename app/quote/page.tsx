import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Get a Quote",
  "Request a quote for welding, machining, fabrication, or repair work. Tell us about your project and Accu-Fab will follow up from Milan, New Mexico.",
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
