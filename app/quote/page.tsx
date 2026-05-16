import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Get A Quote",
  "Tell Accu-Fab about your welding, CNC machining, drill pipe, or fabrication project.",
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
