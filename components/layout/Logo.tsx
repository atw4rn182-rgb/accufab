import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Source file dimensions — must match public/brand/accufab-wordmark.png exactly. */
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 611;

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  /** Header: large on mobile, normal on desktop. Footer: compact. */
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
        "inline-flex items-center",
        isHeader && "min-w-0 flex-1 lg:flex-none",
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
        sizes={
          isHeader
            ? "(max-width: 1023px) min(22rem, calc(100vw - 5.25rem)), 240px"
            : "208px"
        }
        className={cn(
          "h-auto w-auto object-contain object-left",
          isHeader && [
            "max-h-16 max-w-[min(calc(100vw-5.25rem),22rem)]",
            "lg:max-h-14 lg:max-w-60",
          ],
          !isHeader && "max-h-12 max-w-52",
          variant === "light" && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
        )}
      />
    </Link>
  );
}
