/** Shared hero artwork contract. The still and the transition video must use the same framing. */

export const HERO_DESKTOP_QUERY = "(min-width: 768px)";

export const HERO_HEADER_LOGO = "/brand/accufab-header.png";

export const HERO_STILL = {
  mobileWebp: "/brand/hero-mobile.webp",
  mobile: "/brand/hero-mobile.jpg",
  wideWebp: "/brand/hero-wide.webp",
  wide: "/brand/hero-wide.jpg",
} as const;

export const HERO_VIDEO = {
  mobile: "/brand/hero-mobile.mp4",
  wide: "/brand/hero-wide.mp4",
} as const;

/** Identical crop, scale, and alignment for the still image and the transition video. */
export const HERO_MEDIA_CLASS = "absolute inset-0 h-full w-full object-contain object-center";

export function heroVideoSrc(isDesktop: boolean) {
  return isDesktop ? HERO_VIDEO.wide : HERO_VIDEO.mobile;
}
