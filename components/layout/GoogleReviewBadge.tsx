"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useNavigationMenu } from "@/components/layout/NavigationMenuContext";
import { cn } from "@/lib/utils";

const GOOGLE_REVIEW_URL = "https://g.page/r/CWx7-sAOmhQBECE/review";

export function GoogleReviewBadge() {
  const { isOpen } = useNavigationMenu();
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    if (reduceMotion) {
      video.pause();
      return;
    }
    void video.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leave a Google review"
      className={cn(
        "review-badge-float fixed right-4 top-[6.75rem] z-30 block w-[5.1rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:right-6 sm:top-[7.5rem] sm:w-[6.8rem] md:top-[8.5rem] md:w-[7.65rem] lg:top-[9.5rem]",
        isOpen && "invisible"
      )}
    >
      <span className="block aspect-square overflow-hidden rounded-full [clip-path:circle(50%)]">
        <video
          ref={videoRef}
          src="/brand/google-review-badge.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
          className="pointer-events-none block h-auto w-full"
        />
      </span>
    </a>
  );
}
