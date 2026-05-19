import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Source file dimensions — must match public/brand/accufab-wordmark.png exactly. */
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 611;

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  /** When true, loads with high fetch priority — use only once per route (typically in the Navbar). */
  priority?: boolean;
}

export function Logo({ className, variant = "default", priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex min-w-0 shrink-0 items-center", className)}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <Image
        src="/brand/accufab-wordmark.png"
        alt="Accu-Fab LLC"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        sizes="(max-width: 640px) min(17rem, calc(100vw - 5.5rem)), 288px"
        className={cn(
          "h-auto w-auto max-w-[min(17rem,calc(100vw-5.5rem))] object-contain object-left",
          "max-h-11 sm:max-h-12 lg:max-h-14",
          "sm:max-w-[15rem] lg:max-w-[18rem]",
          variant === "light" && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
        )}
      />
    </Link>
  );
}
