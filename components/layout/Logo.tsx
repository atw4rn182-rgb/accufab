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
          "relative block h-12 w-[clamp(10rem,52vw,13.5rem)] max-w-[calc(100vw-6rem)] transition duration-200 group-hover:brightness-110 sm:h-14 sm:w-64 lg:h-16 lg:w-80",
          shadowClass
        )}
      >
        <Image
          src="/brand/accufab-wordmark.svg"
          alt="Accu-Fab LLC"
          fill
          priority={priority}
          sizes="(max-width: 640px) 52vw, (max-width: 1024px) 256px, 320px"
          className="object-contain object-left pr-1"
        />
      </span>
    </Link>
  );
}
