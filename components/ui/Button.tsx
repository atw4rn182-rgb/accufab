import Link from "next/link";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
  transition?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-accent-light/70 bg-gradient-to-br from-accent-light via-accent to-accent-hover text-charcoal-950 shadow-xl shadow-accent/40 ring-1 ring-accent-light/35 hover:-translate-y-0.5 hover:scale-[1.03] hover:from-white hover:via-accent-light hover:to-accent hover:shadow-2xl hover:shadow-accent/60 hover:ring-2 hover:ring-accent-light/70",
  secondary: "bg-charcoal-700 text-steel-100 hover:bg-charcoal-600 border border-charcoal-600",
  outline:
    "border border-brand-blue-light/45 text-steel-100 hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-steel-300 hover:text-steel-100 hover:bg-white/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base font-semibold",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, transition } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    if (transition) {
      return (
        <TransitionLink href={href} className={classes}>
          {children}
        </TransitionLink>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    onClick,
    disabled,
    "aria-label": ariaLabel,
  } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
