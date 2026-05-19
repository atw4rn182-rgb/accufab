import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Source file dimensions — must match public/brand/accufab-wordmark.png exactly. */
const LOGO_WIDTH = 888;
const LOGO_HEIGHT = 153;

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  /** Header: full-width on mobile, prominent on desktop. Footer: compact. */
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
        "inline-flex min-w-0 items-center",
        isHeader && "h-full w-full flex-1",
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
            ? "(max-width: 1023px) calc(100vw - 3.5rem), 320px"
            : "208px"
        }
        className={cn(
          "object-contain object-left",
          isHeader && [
            "h-full max-h-[4.25rem] w-full min-w-0",
            "lg:max-h-[4.5rem] lg:max-w-[22rem] lg:w-auto",
          ],
          !isHeader && "h-auto max-h-12 w-auto max-w-52",
          variant === "light" && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
        )}
      />
    </Link>
  );
}
