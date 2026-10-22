import { HERO_MEDIA_CLASS, HERO_STILL } from "@/lib/hero-media";

/** Fixed machining artwork shared by every route. Still only — the quote video stays click-triggered. */
export function CinematicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-svh w-full overflow-hidden bg-black" aria-hidden>
      <picture>
        <source media="(min-width: 768px)" srcSet={HERO_STILL.wideWebp} type="image/webp" />
        <source media="(min-width: 768px)" srcSet={HERO_STILL.wide} type="image/jpeg" />
        <source srcSet={HERO_STILL.mobileWebp} type="image/webp" />
        <img
          src={HERO_STILL.mobile}
          alt=""
          width={1008}
          height={1792}
          data-hero-still=""
          fetchPriority="high"
          decoding="async"
          className={HERO_MEDIA_CLASS}
        />
      </picture>
    </div>
  );
}
