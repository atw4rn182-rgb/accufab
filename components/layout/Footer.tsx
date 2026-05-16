import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { COMPANY, FOOTER_LINKS } from "@/lib/constants";

const footerLinkClass = "text-sm text-steel-400 transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-charcoal-900/80 backdrop-blur-md" role="contentinfo">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" aria-hidden />

      <div className="px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="container-narrow mx-auto grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-accent/95">
              {COMPANY.shortTagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-steel-400">{COMPANY.tagline}</p>
            <ul className="mt-8 space-y-3 text-sm" aria-label="Contact information">
              <li>
                <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-steel-300 hover:text-accent">
                  <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={COMPANY.emailHref} className="flex items-center gap-2 text-steel-300 hover:text-accent">
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-steel-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {COMPANY.address}
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:justify-end">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Navigate</h3>
              <ul className="mt-5 space-y-3" role="list">
                {FOOTER_LINKS.navigate.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                More
              </h3>
              <ul className="mt-5 space-y-3" role="list">
                {FOOTER_LINKS.resources.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="container-narrow mx-auto mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-steel-500 sm:text-left">
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-center text-xs text-steel-500 sm:text-right">
            Locally owned · Precision welding · CNC machining · Milan, NM
          </p>
        </div>
      </div>
    </footer>
  );
}
