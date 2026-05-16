"use client";

import { useEffect } from "react";
import "./globals.css";
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
      <body className="min-h-screen bg-charcoal-950 font-sans text-white antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
          <AppErrorFallback reset={reset} error={error} />
        </div>
      </body>
    </html>
  );
}
