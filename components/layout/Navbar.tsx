"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useNavigationMenu } from "./NavigationMenuContext";
import { EXPLORE_SERVICE_LINKS } from "@/lib/constants";
import { HERO_HEADER_LOGO } from "@/lib/hero-media";
import { cn } from "@/lib/utils";

function navItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href;
}

export function Navbar() {
  const { isOpen, closeMenu } = useNavigationMenu();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuPanel = (
    <ul className="flex flex-col gap-0.5 px-4 pb-5 pt-2 sm:px-6" role="list">
      {EXPLORE_SERVICE_LINKS.map((link) => {
        const active = navItemActive(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "block rounded-sm px-3 py-3 text-base font-medium",
                active
                  ? "bg-brand-blue-light/10 text-brand-blue-light"
                  : "text-steel-300 hover:bg-white/[0.04] hover:text-steel-100"
              )}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
      <li className="pt-2">
        <Button href="/quote" className="w-full" size="lg" transition>
          Get a Quote
        </Button>
      </li>
    </ul>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 overflow-visible transition-all duration-300",
        scrolled && pathname !== "/"
          ? "border-b border-brand-blue-light/10 bg-charcoal-950/94 shadow-md shadow-black/25 backdrop-blur-xl"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="container-narrow relative h-24 overflow-visible sm:h-[6.5rem] md:h-[7.25rem] lg:h-[7.75rem]"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          aria-label="Accu-Fab LLC — Home"
          className="absolute left-3 top-2.5 z-10 block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:left-6 sm:top-2 md:top-1 lg:left-8 lg:top-1"
        >
          <Image
            src={HERO_HEADER_LOGO}
            alt="Accu-Fab LLC"
            width={1400}
            height={292}
            priority
            quality={92}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 544px, 624px"
            className="h-auto w-[min(24.5rem,calc(100vw-1.25rem))] object-contain object-left drop-shadow-[0_10px_22px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.03] sm:w-[28.5rem] md:w-[34rem] lg:w-[39rem]"
          />
        </Link>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-20 overflow-hidden border-b border-brand-blue-light/15 bg-charcoal-950/96 shadow-[0_22px_48px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            {menuPanel}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
