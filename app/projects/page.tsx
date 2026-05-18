import type { Metadata } from "next";
import { InnerPageShell } from "@/components/layout/InnerPageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Projects",
  "See Accu-Fab project examples for welded repairs, CNC and manual machining, drill pipe work, and custom fabrication built with precision and pride.",
  "/projects"
);

export default function ProjectsPage() {
  return (
    <InnerPageShell title="Projects" eyebrow="Work samples">
      <p>
        A project gallery belongs here—with customer-approved imagery, brief captions, and no
        unverifiable testimonials. Until then, link or embed photos sparingly under each customer’s
        permission.
      </p>
      <p>This placeholder exists so navigation works while you assemble real portfolio content.</p>
    </InnerPageShell>
  );
}
