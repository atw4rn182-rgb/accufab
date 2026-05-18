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
  const logoSizeClass =
    variant === "light"
      ? "h-14 w-[225px] drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)] sm:h-16 sm:w-[280px] lg:h-[4.75rem] lg:w-[330px]"
      : "h-14 w-[230px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] min-[390px]:h-16 min-[390px]:w-[280px] sm:h-20 sm:w-[360px] lg:h-24 lg:w-[430px]";
  const imageSizes =
    variant === "light"
      ? "(max-width: 640px) 225px, (max-width: 1024px) 280px, 330px"
      : "(max-width: 389px) 230px, (max-width: 640px) 280px, (max-width: 1024px) 360px, 430px";

  return (
    <Link
      href="/"
      className={cn("group relative inline-flex shrink-0 items-center", className)}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <span
        className={cn(
          "relative block transition duration-200 group-hover:brightness-110",
          logoSizeClass
        )}
      >
        <Image
          src="/brand/accufab-wordmark.svg"
          alt="Accu-Fab LLC"
          fill
          priority={priority}
          sizes={imageSizes}
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
