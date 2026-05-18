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
      className={cn("group relative inline-flex shrink-0 items-center", className)}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <span
        className={cn(
          "relative block h-12 w-[190px] transition duration-200 group-hover:brightness-110 sm:h-14 sm:w-[230px] lg:h-16 lg:w-[270px]",
          variant === "light" ? "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
        )}
      >
        <Image
          src="/brand/accufab-wordmark.png"
          alt="Accu-Fab LLC"
          fill
          priority={priority}
          sizes="(max-width: 640px) 190px, (max-width: 1024px) 230px, 270px"
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
