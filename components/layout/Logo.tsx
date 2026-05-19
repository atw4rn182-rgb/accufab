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
  const shadowClass =
    variant === "light"
      ? "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
      : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]";

  return (
    <Link
      href="/"
      className={cn("group relative inline-flex shrink-0 items-center", className)}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <span
        className={cn(
          "relative block h-10 w-[min(13.25rem,calc(100vw-5.5rem))] transition duration-200 group-hover:brightness-110 sm:h-12 sm:w-60 lg:h-14 lg:w-72",
          shadowClass
        )}
      >
        <Image
          src="/brand/accufab-wordmark.png"
          alt="Accu-Fab LLC"
          width={1600}
          height={321}
          priority={priority}
          sizes="(max-width: 640px) min(212px, calc(100vw - 5.5rem)), (max-width: 1024px) 240px, 288px"
          className="h-full w-full object-contain object-left"
        />
      </span>
    </Link>
  );
}
