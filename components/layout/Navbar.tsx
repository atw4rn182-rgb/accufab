"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function navItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass = (active: boolean) =>
    cn(
      "relative inline-flex rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-200 sm:px-4",
      active ? "text-brand-blue-light" : "text-steel-300 hover:text-steel-100"
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
        className="container-narrow flex min-h-[4.25rem] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:min-h-[4.5rem] lg:px-8"
        aria-label="Main navigation"
      >
        <Logo priority />

        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1" role="list">
          {NAV_LINKS.map((link) => {
            const active = navItemActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={navLinkClass(active)}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button href="/quote" size="md" transition>
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-brand-blue-light/25 text-steel-100 transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-brand-blue-light/10 bg-charcoal-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-0.5 px-4 pb-5 pt-1" role="list">
              {NAV_LINKS.map((link) => {
                const active = navItemActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-sm px-3 py-3 text-base font-medium",
                        active ? "bg-brand-blue-light/10 text-brand-blue-light" : "text-steel-300 hover:bg-white/[0.04] hover:text-steel-100"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
