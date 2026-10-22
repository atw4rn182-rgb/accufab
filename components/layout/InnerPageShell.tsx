import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface InnerPageShellProps {
  title: string;
  /** Optional eyebrow shown in accent uppercase */
  eyebrow?: string;
  /** Optional lead paragraph below the H1 */
  subtitle?: string;
  /** Center the page title and subtitle (e.g. quote page) */
  centeredHeading?: boolean;
  children?: React.ReactNode;
}

/** Shared minimal layout for section placeholder routes */
export function InnerPageShell({
  title,
  eyebrow,
  subtitle,
  centeredHeading = false,
  children,
}: InnerPageShellProps) {
  return (
    <div className="min-h-[68vh] bg-charcoal-950 px-4 pb-32 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      <div className="surface-panel container-narrow mx-auto max-w-3xl p-8 sm:p-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-steel-300 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Home
        </Link>

        {eyebrow ? (
          <p className="mt-10 text-xs font-black uppercase tracking-[0.2em] text-brand-blue-light">{eyebrow}</p>
        ) : null}
        <h1
          className={
            centeredHeading
              ? "mb-6 mt-4 text-center text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:text-5xl"
              : "mt-4 text-4xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
          }
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className={
              centeredHeading
                ? "mx-auto mb-6 max-w-2xl text-center text-xl font-medium leading-relaxed text-steel-300"
                : "text-lg font-medium leading-relaxed text-steel-300"
            }
          >
            {subtitle}
          </p>
        ) : null}
        <div className="mt-6 space-y-4 text-lg font-medium leading-relaxed text-steel-300">{children}</div>
      </div>
    </div>
  );
}
