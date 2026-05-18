import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { COMPANY } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "About Accu-Fab",
  "Learn about Accu-Fab, a Milan, New Mexico shop delivering precision welding, CNC and manual machining, hydraulic repair, and custom fabrication with care.",
  "/about"
);

export default function AboutPage() {
  return (
    <InnerPageShell title={`About ${COMPANY.name}`} eyebrow="Our shop">
      <p>{COMPANY.tagline}</p>
      <p>
        Use this section for verified history, certifications, notable equipment, staffing depth,
        and photos of the facility only when accurate. Omit founding dates unless you intend to cite
        a specific year publicly.
      </p>
    </InnerPageShell>
  );
}
