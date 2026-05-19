import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NavigationMenuProvider } from "@/components/layout/NavigationMenuContext";
import { VideoTransitionProvider } from "@/components/transition/VideoTransitionProvider";
import { baseMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-charcoal-950 font-sans">
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <Image
            src="/brand/accufab-logo.jpg"
            alt=""
            fill
            className="scale-105 object-cover object-center opacity-78 blur-sm"
            sizes="100vw"
          />
          <Image
            src="/brand/accufab-logo.jpg"
            alt=""
            fill
            priority
            className="object-contain object-center opacity-72"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-950/8" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-950/68 via-charcoal-950/22 to-transparent" />
        </div>
        <div className="relative z-10">
          <VideoTransitionProvider>
            <NavigationMenuProvider>
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer />
            </NavigationMenuProvider>
          </VideoTransitionProvider>
        </div>
      </body>
    </html>
  );
}
