"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useVideoTransition } from "./VideoTransitionProvider";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> & {
    children: ReactNode;
  };

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function TransitionLink({ href, onClick, target, children, ...props }: TransitionLinkProps) {
  const { navigateWithTransition } = useVideoTransition();
  const hrefString = typeof href === "string" ? href : href.toString();

  return (
    <Link
      href={href}
      target={target}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || isModifiedClick(event) || target === "_blank") return;

        event.preventDefault();
        navigateWithTransition(hrefString);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
