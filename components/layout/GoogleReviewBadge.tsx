"use client";

import Image from "next/image";
import { useNavigationMenu } from "@/components/layout/NavigationMenuContext";
import { cn } from "@/lib/utils";

const GOOGLE_REVIEW_URL = "https://g.page/r/CWx7-sAOmhQBECE/review";

export function GoogleReviewBadge() {
  const { isOpen } = useNavigationMenu();

  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leave a Google review"
      className={cn(
        "review-badge-float fixed right-4 top-[16rem] z-30 block w-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:right-6 sm:top-[18rem] sm:w-32 md:top-[19rem] md:w-36 lg:top-[20rem]",
        isOpen && "invisible"
      )}
    >
      <Image
        src="/brand/google-review-badge.png"
        alt=""
        width={655}
        height={655}
        quality={92}
        sizes="(max-width: 639px) 96px, (max-width: 767px) 128px, 144px"
        className="h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
      />
    </a>
  );
}
