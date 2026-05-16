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
        className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent"
        aria-hidden
      >
        <AlertTriangle className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h1 className="mt-8 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        We hit a snag loading this page
      </h1>
      <p className="mt-4 text-base leading-relaxed text-steel-400">
        Something went wrong on our side or while loading an asset. Your work is safe—try refreshing, or
        return home and continue from there.
      </p>
      <p className="mt-5 text-xs leading-relaxed text-steel-500">
        Developing locally? If logs mention missing files under{" "}
        <span className="font-mono text-steel-400">.next</span>, stop the dev server and run{" "}
        <span className="font-mono text-steel-400">npm run dev:clean</span> to reset the cache, then reload.
      </p>
      {error?.digest ? (
        <p className="mt-4 text-xs text-steel-500">
          Reference: <span className="font-mono">{error.digest}</span>
        </p>
      ) : null}
      <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover"
          onClick={() => {
            if (typeof window !== "undefined") window.location.reload();
          }}
        >
          Reload page
        </button>
        <button
          type="button"
          className="rounded-sm border border-steel-500/50 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
          onClick={() => reset()}
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-sm border border-white/15 px-6 py-3 text-sm font-semibold text-steel-300 transition-colors hover:border-white/25 hover:text-white"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
