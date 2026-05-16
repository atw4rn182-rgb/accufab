"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";

const LOCAL_FALLBACK = "/photos/hero-welding.jpg";

type SafeProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
};

/**
 * Wraps `next/image` with a local fallback if the remote URL 404s or fails in the browser,
 * so a bad stock photo link does not wipe the whole layout.
 */
export function SafeRemoteImage({ src: propSrc, alt, ...rest }: SafeProps) {
  const [src, setSrc] = useState(propSrc);

  useEffect(() => {
    setSrc(propSrc);
  }, [propSrc]);

  const onError = useCallback(() => {
    setSrc((current) => (current !== LOCAL_FALLBACK ? LOCAL_FALLBACK : current));
  }, []);

  return <Image {...rest} src={src} alt={alt} onError={onError} />;
}
