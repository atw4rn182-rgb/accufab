import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      className={cn("relative inline-flex max-w-[calc(100vw-6rem)] shrink-0 items-center sm:max-w-none", className)}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <span
        className={cn(
          "relative block h-10 w-[min(12rem,calc(100vw-6rem))] sm:h-11 sm:w-52 md:h-12 md:w-60 lg:h-14 lg:w-72",
          variant === "light" && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
        )}
      >
        <Image
          src="/brand/accufab-wordmark.png"
          alt="Accu-Fab LLC"
          width={895}
          height={185}
          priority={priority}
          sizes="(max-width: 640px) min(192px, calc(100vw - 6rem)), (max-width: 1024px) 240px, 288px"
          className="h-full w-full object-contain object-left"
        />
      </span>
    </Link>
  );
}
