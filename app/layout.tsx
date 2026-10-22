import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CinematicBackground } from "@/components/layout/CinematicBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NavigationMenuProvider } from "@/components/layout/NavigationMenuContext";
import { VideoTransitionProvider } from "@/components/transition/VideoTransitionProvider";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
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
      <body className="bg-black font-sans">
        <LocalBusinessJsonLd />
        <CinematicBackground />
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
