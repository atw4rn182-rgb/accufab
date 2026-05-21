import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Source file dimensions — must match public/brand/accufab-wordmark.png exactly. */
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 611;

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  /** Header: centered, larger on mobile. Footer: compact. */
  placement?: "header" | "footer";
  /** When true, loads with high fetch priority — use only once per route (typically in the Navbar). */
  priority?: boolean;
}

export function Logo({
  className,
  variant = "default",
  placement = "header",
  priority = false,
}: LogoProps) {
  const isHeader = placement === "header";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center justify-center",
        isHeader &&
          "mx-auto flex h-full w-full min-h-0 max-h-full max-w-full sm:h-24 lg:h-[5.75rem]",
        className
      )}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <Image
        src="/brand/accufab-wordmark.png"
        alt="Accu-Fab LLC"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        unoptimized
        priority={priority}
        sizes={isHeader ? "(max-width: 1023px) 100vw, 1280px" : "208px"}
        className={cn(
          "h-full w-full min-h-0 object-contain object-center",
          isHeader && "sm:h-24 lg:h-[5.75rem]",
          !isHeader && "max-h-12 max-w-52",
          variant === "light" && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
        )}
      />
    </Link>
  );
}
