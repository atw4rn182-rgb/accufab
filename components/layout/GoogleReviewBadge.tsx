import Image from "next/image";

const GOOGLE_REVIEW_URL = "https://g.page/r/CWx7-sAOmhQBECE/review";

export function GoogleReviewBadge() {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Leave a Google review"
      className="fixed bottom-4 right-4 z-40 block w-24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:bottom-6 sm:right-6 sm:w-32 md:w-36"
    >
      <Image
        src="/brand/google-review-badge.png"
        alt=""
        width={655}
        height={655}
        quality={92}
        sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
        className="h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
      />
    </a>
  );
}
