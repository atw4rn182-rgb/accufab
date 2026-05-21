import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { COMPANY } from "@/lib/constants";
import { pageSeoMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageSeoMetadata({
  title: "About Accu-Fab NM | Precision Fabrication Shop in Milan, New Mexico",
  description:
    "Learn about Accu-Fab NM — a locally owned precision welding, CNC machining, and metal fabrication shop in Milan, New Mexico serving the Four Corners region and Texas.",
  path: "/about",
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <InnerPageShell
      title="About Accu-Fab NM — Precision Fabrication Shop in Milan, New Mexico"
      eyebrow="Our shop"
      subtitle="Locally owned welding and metal fabrication in Milan, NM — precision work for the Four Corners and beyond."
    >
      <p>{COMPANY.tagline}</p>
      <p>
        Use this section for verified history, certifications, notable equipment, staffing depth,
        and photos of the facility only when accurate. Omit founding dates unless you intend to cite
        a specific year publicly.
      </p>
    </InnerPageShell>
  );
}
