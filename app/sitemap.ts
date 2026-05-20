import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";

const routes = [
  "",
  "/about",
  "/capabilities",
  "/services",
  "/projects",
  "/quote",
  "/careers",
  "/news",
  "/policies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/quote" ? 0.9 : 0.7,
  }));
}
