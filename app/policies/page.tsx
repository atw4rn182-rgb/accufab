import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { pageSeoMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageSeoMetadata({
  title: "Policies | Accu-Fab NM — Milan, New Mexico Fabrication Shop",
  description:
    "Accu-Fab NM website policies — privacy, terms of use, and supplier guidelines for customers and partners working with our Milan, New Mexico metal fabrication shop.",
  path: "/policies",
  absoluteTitle: true,
});

export default function PoliciesPage() {
  return (
    <div className="min-h-[70vh] bg-transparent px-4 pb-32 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="surface-panel mx-auto max-w-3xl p-8 sm:p-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-steel-300 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <h1 className="mt-8 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          Accu-Fab NM Website Policies
        </h1>
        <p className="mt-4 text-lg font-medium text-steel-300">
          Official policy documents will be published here. For contractual or compliance questions,
          contact your Accu-Fab program owner or{" "}
          <Link href="/quote" className="font-semibold text-accent hover:underline">
            reach our team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
