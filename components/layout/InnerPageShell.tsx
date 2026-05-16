import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface InnerPageShellProps {
  title: string;
  /** Optional eyebrow shown in accent uppercase */
  eyebrow?: string;
  children?: React.ReactNode;
}

/** Shared minimal layout for section placeholder routes */
export function InnerPageShell({ title, eyebrow, children }: InnerPageShellProps) {
  return (
    <div className="min-h-[68vh] bg-charcoal-950/10 px-4 pb-28 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      <div className="container-narrow mx-auto max-w-2xl rounded-sm border border-white/10 bg-charcoal-950/42 p-6 shadow-2xl shadow-black/25 backdrop-blur-[2px] sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-steel-400 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Home
        </Link>

        {eyebrow ? (
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">{title}</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-steel-400">{children}</div>
      </div>
    </div>
  );
}
