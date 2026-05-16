import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  /** When true, loads with high fetch priority — use only once per route (typically in the Navbar). */
  priority?: boolean;
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group relative inline-flex shrink-0 items-center", className)}
      aria-label="Accu-Fab LLC — Welding · Machining · Fabrication"
    >
      <span
        className={cn(
          "text-2xl font-black uppercase tracking-tight transition-colors duration-200 sm:text-3xl",
          variant === "light" ? "text-white group-hover:text-accent" : "text-white"
        )}
      >
        Accu<span className="text-accent">-Fab</span>
      </span>
    </Link>
  );
}
