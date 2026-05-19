import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Source file dimensions — must match public/brand/accufab-wordmark.png exactly. */
const LOGO_WIDTH = 888;
const LOGO_HEIGHT = 153;

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
        isHeader && "mx-auto w-full max-w-[min(100%,22rem)] lg:max-w-[20rem]",
        className
      )}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <Image
        src="/brand/accufab-wordmark.png"
        alt="Accu-Fab LLC"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        sizes={isHeader ? "(max-width: 1023px) 92vw, 320px" : "208px"}
        className={cn(
          "h-auto w-full object-contain object-center",
          isHeader && "max-h-[4.75rem] sm:max-h-20 lg:max-h-[4.5rem]",
          !isHeader && "max-h-12 max-w-52",
          variant === "light" && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
        )}
      />
    </Link>
  );
}
