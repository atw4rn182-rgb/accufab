"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

const VIDEO_SRC = "/brand/accufab-video.mp4";
const MAX_VIDEO_SECONDS = 4;
const FALLBACK_NAVIGATION_MS = 4500;
const FADE_OUT_MS = 750;

type TransitionContextValue = {
  navigateWithTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function VideoTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const targetHref = useRef<string | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isCompleting = useRef(false);

  const clearTimers = useCallback(() => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    if (completeTimer.current) clearTimeout(completeTimer.current);
    fallbackTimer.current = null;
    completeTimer.current = null;
  }, []);

  const completeTransition = useCallback(() => {
    const href = targetHref.current;
    if (!href || isCompleting.current) return;

    isCompleting.current = true;
    clearTimers();
    videoRef.current?.pause();
    setIsFading(true);

    completeTimer.current = setTimeout(() => {
      router.push(href);
      setIsPlaying(false);
      setIsVisible(false);
      setIsFading(false);
      isCompleting.current = false;
      targetHref.current = null;
    }, FADE_OUT_MS);
  }, [clearTimers, router]);

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        window.location.href = href;
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      clearTimers();
      targetHref.current = href;
      isCompleting.current = false;
      setIsVisible(false);
      setIsFading(false);
      setIsPlaying(true);

      fallbackTimer.current = setTimeout(() => {
        completeTransition();
      }, FALLBACK_NAVIGATION_MS);

      setTimeout(() => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = 0;
        setIsVisible(true);
        video.play().catch(() => {
          completeTransition();
        });
      }, 0);
    },
    [clearTimers, completeTransition, router]
  );

  useEffect(() => {
    if (!isPlaying) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPlaying]);

  useEffect(() => clearTimers, [clearTimers]);

  const value = useMemo(() => ({ navigateWithTransition }), [navigateWithTransition]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      {isPlaying ? (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${
            isFading || !isVisible ? "opacity-0" : "opacity-100"
          }`}
          aria-live="polite"
          aria-label="Loading next page"
          role="status"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="h-full w-full object-contain"
            muted
            playsInline
            preload="auto"
            onEnded={completeTransition}
            onError={completeTransition}
            onTimeUpdate={(event) => {
              if (event.currentTarget.currentTime >= MAX_VIDEO_SECONDS) {
                completeTransition();
              }
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/20" />
        </div>
      ) : null}
    </TransitionContext.Provider>
  );
}

export function useVideoTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useVideoTransition must be used within VideoTransitionProvider");
  }

  return context;
}
