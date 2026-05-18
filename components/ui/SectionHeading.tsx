import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Sets id on the `<h2>` for `aria-labelledby` on sections */
  titleId?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
          {eyebrow}
        </p>
      )}
      <h2
        id={titleId}
        className="text-3xl font-black tracking-tight text-steel-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg font-medium leading-relaxed text-steel-300">{description}</p>
      )}
    </div>
  );
}
