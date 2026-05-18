"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface AppErrorFallbackProps {
  reset: () => void;
  /** Shown in dev or when you need a support reference */
  error?: Error & { digest?: string };
}

export function AppErrorFallback({ reset, error }: AppErrorFallbackProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-blue-light/40 bg-brand-blue-light/10 text-brand-blue-light"
        aria-hidden
      >
        <AlertTriangle className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h1 className="mt-8 text-2xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-3xl">
        We hit a snag loading this page
      </h1>
      <p className="mt-4 text-base font-medium leading-relaxed text-steel-300">
        Something went wrong on our side or while loading an asset. Your work is safe—try refreshing, or
        return home and continue from there.
      </p>
      <p className="mt-5 text-xs leading-relaxed text-steel-500">
        Developing locally? If logs mention missing files under{" "}
        <span className="font-mono text-steel-300">.next</span>, stop the dev server and run{" "}
        <span className="font-mono text-steel-300">npm run dev:clean</span> to reset the cache, then reload.
      </p>
      {error?.digest ? (
        <p className="mt-4 text-xs text-steel-500">
          Reference: <span className="font-mono">{error.digest}</span>
        </p>
      ) : null}
      <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-charcoal-950 shadow-lg shadow-accent/20 transition-colors hover:bg-accent-light"
          onClick={() => {
            if (typeof window !== "undefined") window.location.reload();
          }}
        >
          Reload page
        </button>
        <button
          type="button"
          className="rounded-sm border border-brand-blue-light/45 bg-transparent px-6 py-3 text-sm font-semibold text-steel-100 transition-colors hover:border-accent hover:text-accent"
          onClick={() => reset()}
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-sm border border-brand-blue-light/20 px-6 py-3 text-sm font-semibold text-steel-300 transition-colors hover:border-brand-blue-light/35 hover:text-steel-100"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
