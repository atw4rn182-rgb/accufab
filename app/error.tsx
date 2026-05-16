"use client";

import { useEffect } from "react";
import { AppErrorFallback } from "@/components/errors/AppErrorFallback";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[accu-fab route error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24">
      <AppErrorFallback reset={reset} error={error} />
    </div>
  );
}
