import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { COMPANY } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Capabilities", COMPANY.tagline, "/capabilities");

export default function CapabilitiesPage() {
  return (
    <InnerPageShell title="Capabilities" eyebrow="What we do">
      <p>
        Detailed capability content will appear here—for example: weld processes offered, machining
        equipment, drill pipe work, fabrication operations, finishes, mechanical assembly scope,
        and how to submit drawings or samples.
      </p>
      <p>
        This page stays generic until it is finalized with verified shop specifics and approved copy from{" "}
        {COMPANY.name}.
      </p>
    </InnerPageShell>
  );
}
