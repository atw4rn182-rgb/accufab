import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Careers",
  "Explore Accu-Fab careers in precision welding, CNC and manual machining, hydraulic repair, and fabrication at our locally owned Milan, New Mexico shop team.",
  "/careers"
);

export default function CareersPage() {
  return (
    <div className="min-h-[70vh] bg-charcoal-950/10 px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="container-narrow mx-auto max-w-2xl rounded-sm border border-white/10 bg-charcoal-950/42 p-6 shadow-2xl shadow-black/25 backdrop-blur-[2px] sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-steel-400 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-white">Careers</h1>
        <p className="mt-4 text-lg text-steel-400">
          Career listings will appear here. To inquire today, reach out via{" "}
          <Link href="/quote" className="font-semibold text-accent hover:underline">
            Contact / Quote
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
