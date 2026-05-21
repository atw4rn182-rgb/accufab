import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 611;

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  placement?: "header" | "footer";
  priority?: boolean;
}

export function Logo({
  className,
  variant = "default",
  placement = "header",
  priority = false,
}: LogoProps) {
  if (placement === "footer") {
    return (
      <Link
        href="/"
        className={cn("inline-block", className)}
        aria-label="Accu-Fab LLC — Home"
      >
        <Image
          src="/brand/accufab-wordmark.png"
          alt="Accu-Fab LLC"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          unoptimized
          className={cn(
            "h-12 w-auto max-w-52 object-contain",
            variant === "light" && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
          )}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("block w-full", className)}
      aria-label="Accu-Fab LLC — Home"
    >
      <Image
        src="/brand/accufab-wordmark.png"
        alt="Accu-Fab LLC"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        unoptimized
        priority={priority}
        sizes="100vw"
        className="h-20 w-full object-contain sm:h-24"
      />
    </Link>
  );
}
