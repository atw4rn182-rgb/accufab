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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-brand-blue-light/10 bg-charcoal-950/94 shadow-md shadow-black/25 backdrop-blur-xl"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="container-narrow flex items-center justify-center px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex justify-center py-2">
          <Link
            href="/"
            aria-label="Accu-Fab LLC — Home"
            className="flex justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Image
              src={HERO_HEADER_LOGO}
              alt="Accu-Fab LLC"
              width={1400}
              height={292}
              priority
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 368px, 416px"
              className="h-14 w-auto max-w-[17.5rem] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.03] sm:h-16 sm:max-w-[20rem] md:h-[4.75rem] md:max-w-[23rem] lg:h-[5.25rem] lg:max-w-[26rem]"
            />
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-brand-blue-light/10 bg-charcoal-950/95 backdrop-blur-xl"
          >
            {menuPanel}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
