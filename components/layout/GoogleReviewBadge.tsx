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
      className="mx-auto mt-5 block w-[8.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:mt-6 sm:w-[10.5rem]"
    >
      <span className="relative block aspect-square overflow-hidden rounded-full [clip-path:circle(50%)]">
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
          className="pointer-events-none absolute left-[2.59%] top-[-21.77%] h-[151.72%] w-[279.31%] max-w-none"
        />
      </span>
    </a>
  );
}
