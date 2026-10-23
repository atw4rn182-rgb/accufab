"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const GOOGLE_REVIEW_URL = "https://g.page/r/CWx7-sAOmhQBECE/review";

export function GoogleReviewBadge() {
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
      className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span className="relative block aspect-[1296/480] overflow-hidden">
        <video
          ref={videoRef}
          src="/brand/google-review-badge-v2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
          className="pointer-events-none absolute left-0 top-[-21.67%] h-[146.67%] w-full max-w-none"
        />
      </span>
    </a>
  );
}
