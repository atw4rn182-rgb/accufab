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
import { HERO_DESKTOP_QUERY, HERO_MEDIA_CLASS, heroVideoSrc } from "@/lib/hero-media";

const FADE_IN_MS = 350;
const FADE_OUT_MS = 550;
const LOAD_TIMEOUT_MS = 8000;
const FALLBACK_PLAYBACK_MS = 8042;
const HERO_PLAYBACK_RATE = 1.25;

type TransitionContextValue = {
  navigateWithTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

function isVideoReady(video: HTMLVideoElement | null) {
  return Boolean(video && video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA);
}

function applyPlaybackRate(video: HTMLVideoElement) {
  if (video.defaultPlaybackRate !== HERO_PLAYBACK_RATE) {
    video.defaultPlaybackRate = HERO_PLAYBACK_RATE;
  }
  if (video.playbackRate !== HERO_PLAYBACK_RATE) {
    video.playbackRate = HERO_PLAYBACK_RATE;
  }
}

function playbackDurationMs(video: HTMLVideoElement) {
  const mediaMs =
    !Number.isFinite(video.duration) || video.duration <= 0
      ? FALLBACK_PLAYBACK_MS
      : Math.round(video.duration * 1000);
  const rate = video.playbackRate > 0 ? video.playbackRate : HERO_PLAYBACK_RATE;
  return Math.round(mediaMs / rate);
}

export function VideoTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const targetHref = useRef<string | null>(null);
  const fadeInTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadTimeoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const hasNavigated = useRef(false);
  const waitingForReadyRef = useRef(false);
  const lockedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (fadeInTimer.current) clearTimeout(fadeInTimer.current);
    if (navigateTimer.current) clearTimeout(navigateTimer.current);
    if (endTimer.current) clearTimeout(endTimer.current);
    if (loadTimeoutTimer.current) clearTimeout(loadTimeoutTimer.current);
    fadeInTimer.current = null;
    navigateTimer.current = null;
    endTimer.current = null;
    loadTimeoutTimer.current = null;
  }, []);

  const resetTransition = useCallback(() => {
    clearTimers();
    waitingForReadyRef.current = false;
    lockedRef.current = false;

    const video = videoRef.current;
    if (video) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek errors before metadata */
      }
      video.muted = true;
    }

    setIsPlaying(false);
    setIsVisible(false);
    setIsFading(false);
    targetHref.current = null;
    hasNavigated.current = false;
  }, [clearTimers]);

  const alignOverlayToStill = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const still = document.querySelector("[data-hero-still]");
    const rect = still instanceof HTMLElement ? still.getBoundingClientRect() : null;
    const matchesHero =
      rect !== null &&
      rect.width > window.innerWidth * 0.9 &&
      rect.top >= -2 &&
      rect.top < 80 &&
      rect.height > 320;

    if (!matchesHero || !rect) {
      overlay.style.top = "0px";
      overlay.style.left = "0px";
      overlay.style.width = "100%";
      overlay.style.height = "100svh";
      return;
    }

    overlay.style.top = `${rect.top}px`;
    overlay.style.left = `${rect.left}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
  }, []);

  const ensureVideoSource = useCallback(() => {
    const video = videoRef.current;
    if (!video || typeof window === "undefined") return video;
    const src = heroVideoSrc(window.matchMedia(HERO_DESKTOP_QUERY).matches);
    if (video.dataset.activeSrc !== src) {
      video.dataset.activeSrc = src;
      video.preload = "auto";
      video.src = src;
    }
    applyPlaybackRate(video);
    return video;
  }, []);

  const finishAndNavigate = useCallback(() => {
    if (!targetHref.current || hasNavigated.current) return;
    hasNavigated.current = true;
    setIsFading(true);
    router.push(targetHref.current);
  }, [router]);

  const scheduleNavigation = useCallback(
    (playbackMs: number) => {
      const navigateAt = Math.max(FADE_IN_MS, playbackMs - FADE_OUT_MS);

      navigateTimer.current = setTimeout(() => {
        finishAndNavigate();
      }, navigateAt);

      endTimer.current = setTimeout(() => {
        resetTransition();
      }, playbackMs + 120);
    },
    [finishAndNavigate, resetTransition]
  );

  const playTransitionVideo = useCallback(() => {
    waitingForReadyRef.current = false;
    if (loadTimeoutTimer.current) {
      clearTimeout(loadTimeoutTimer.current);
      loadTimeoutTimer.current = null;
    }

    const video = videoRef.current;
    const href = targetHref.current;

    if (!video || !href) {
      if (href) router.push(href);
      resetTransition();
      return;
    }

    video.currentTime = 0;
    applyPlaybackRate(video);
    video.muted = false;
    video.volume = 1;
    alignOverlayToStill();

    video
      .play()
      .then(() => {
        applyPlaybackRate(video);
        alignOverlayToStill();
        setIsVisible(true);
        scheduleNavigation(playbackDurationMs(video));
      })
      .catch(() => {
        router.push(href);
        resetTransition();
      });
  }, [alignOverlayToStill, resetTransition, router, scheduleNavigation]);

  const waitForVideoReady = useCallback(() => {
    const video = ensureVideoSource();
    const href = targetHref.current;

    if (!video || !href) {
      if (href) router.push(href);
      resetTransition();
      return;
    }

    if (isVideoReady(video)) {
      playTransitionVideo();
      return;
    }

    waitingForReadyRef.current = true;
    video.preload = "auto";
    video.load();

    const onReady = () => {
      if (!waitingForReadyRef.current || !targetHref.current) return;
      playTransitionVideo();
    };

    video.addEventListener("canplaythrough", onReady, { once: true });

    loadTimeoutTimer.current = setTimeout(() => {
      video.removeEventListener("canplaythrough", onReady);
      if (!targetHref.current || hasNavigated.current) return;
      router.push(targetHref.current);
      resetTransition();
    }, LOAD_TIMEOUT_MS);
  }, [ensureVideoSource, playTransitionVideo, resetTransition, router]);

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (lockedRef.current) return;

      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        window.location.href = href;
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      lockedRef.current = true;
      router.prefetch(href);
      clearTimers();
      targetHref.current = href;
      hasNavigated.current = false;
      waitingForReadyRef.current = false;
      setIsFading(false);
      setIsVisible(false);
      setIsPlaying(true);
      alignOverlayToStill();
      ensureVideoSource();

      fadeInTimer.current = setTimeout(() => {
        waitForVideoReady();
      }, 16);
    },
    [alignOverlayToStill, clearTimers, ensureVideoSource, router, waitForVideoReady]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(HERO_DESKTOP_QUERY);

    const prime = () => {
      if (reduced.matches || lockedRef.current) return;
      ensureVideoSource();
      const current = videoRef.current;
      if (!current) return;
      current.muted = true;
      current.preload = "auto";
      if (!isVideoReady(current)) current.load();
    };

    const idleId = window.requestIdleCallback(() => prime(), { timeout: 1800 });

    const onChange = () => {
      if (lockedRef.current) return;
      prime();
    };

    desktop.addEventListener("change", onChange);

    return () => {
      desktop.removeEventListener("change", onChange);
      window.cancelIdleCallback(idleId);
    };
  }, [ensureVideoSource]);

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
  const fadeDurationMs = isFading ? FADE_OUT_MS : FADE_IN_MS;

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={overlayRef}
        className={`fixed left-0 top-0 z-[100] h-svh w-full bg-black transition-opacity ease-in-out ${overlayOpacity} ${
          isPlaying ? "visible" : "pointer-events-none invisible"
        }`}
        style={{ transitionDuration: `${fadeDurationMs}ms` }}
        aria-live="polite"
        aria-label="Loading next page"
        aria-hidden={!isPlaying}
        role="status"
      >
        <video
          ref={videoRef}
          className={HERO_MEDIA_CLASS}
          playsInline
          preload="none"
          muted
          onEnded={() => {
            if (!lockedRef.current || hasNavigated.current) return;
            finishAndNavigate();
          }}
          onError={() => {
            if (targetHref.current && lockedRef.current) router.push(targetHref.current);
            resetTransition();
          }}
        />
      </div>
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
