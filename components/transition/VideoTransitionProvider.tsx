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
const TRANSITION_MS = 3000;
const FADE_IN_MS = 350;
const FADE_OUT_MS = 550;
const NAVIGATE_AT_MS = TRANSITION_MS - FADE_OUT_MS;
const PLAYBACK_END_S = 3;

type TransitionContextValue = {
  navigateWithTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function VideoTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const targetHref = useRef<string | null>(null);
  const fadeInTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasNavigated = useRef(false);

  const clearTimers = useCallback(() => {
    if (fadeInTimer.current) clearTimeout(fadeInTimer.current);
    if (navigateTimer.current) clearTimeout(navigateTimer.current);
    if (endTimer.current) clearTimeout(endTimer.current);
    fadeInTimer.current = null;
    navigateTimer.current = null;
    endTimer.current = null;
  }, []);

  const resetTransition = useCallback(() => {
    clearTimers();
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
    setIsVisible(false);
    setIsFading(false);
    setVideoVisible(false);
    targetHref.current = null;
    hasNavigated.current = false;
  }, [clearTimers]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.currentTime < PLAYBACK_END_S) return;
    video.pause();
    video.currentTime = PLAYBACK_END_S;
  }, []);

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

      router.prefetch(href);
      clearTimers();
      targetHref.current = href;
      hasNavigated.current = false;
      setIsFading(false);
      setVideoVisible(false);
      setIsVisible(false);
      setIsPlaying(true);

      fadeInTimer.current = setTimeout(() => {
        setIsVisible(true);
        setVideoVisible(true);

        const video = videoRef.current;
        if (!video) {
          router.push(href);
          resetTransition();
          return;
        }

        video.currentTime = 0;
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {
          router.push(href);
          resetTransition();
        });
      }, 16);

      navigateTimer.current = setTimeout(() => {
        if (!targetHref.current || hasNavigated.current) return;
        hasNavigated.current = true;
        setIsFading(true);
        setVideoVisible(false);
        router.push(targetHref.current);
      }, NAVIGATE_AT_MS);

      endTimer.current = setTimeout(() => {
        resetTransition();
      }, TRANSITION_MS);
    },
    [clearTimers, resetTransition, router]
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

  const overlayOpacity = isFading ? "opacity-0" : isVisible ? "opacity-100" : "opacity-0";
  const videoOpacity = videoVisible && !isFading ? "opacity-100" : "opacity-0";
  const fadeDurationMs = isFading ? FADE_OUT_MS : FADE_IN_MS;

  return (
    <TransitionContext.Provider value={value}>
      {children}
      {isPlaying ? (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity ease-in-out ${overlayOpacity}`}
          style={{ transitionDuration: `${fadeDurationMs}ms` }}
          aria-live="polite"
          aria-label="Loading next page"
          role="status"
        >
          <div className="absolute inset-0 bg-black" aria-hidden />
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className={`relative h-full w-full object-contain transition-opacity ease-in-out ${videoOpacity}`}
            style={{ transitionDuration: `${fadeDurationMs}ms` }}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
              if (targetHref.current) router.push(targetHref.current);
              resetTransition();
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />
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
