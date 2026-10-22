"use client";

import { useEffect } from "react";
import "./globals.css";
import { CinematicBackground } from "@/components/layout/CinematicBackground";
import { AppErrorFallback } from "@/components/errors/AppErrorFallback";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[accu-fab global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-black font-sans text-steel-100 antialiased">
        <CinematicBackground />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
          <AppErrorFallback reset={reset} error={error} />
        </div>
      </body>
    </html>
  );
}
