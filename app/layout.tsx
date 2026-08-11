import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "edsun-caldoza.vercel.app";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: { default: "Edsun Caldoza — Graphic Designer & Video Editor", template: "%s" },
    description: "Graphic design, video editing, and digital experiences built with clarity, craft, and purpose.",
    icons: { icon: "/images/ico.png", shortcut: "/images/ico.png" },
    openGraph: { type: "website", url: metadataBase, title: "Edsun Caldoza — Graphic Designer & Video Editor", description: "Design that looks sharp, works hard, and moves the message forward.", images: [{ url: socialImage, width: 1792, height: 938, alt: "Edsun Caldoza — Graphic Designer & Video Editor" }] },
    twitter: { card: "summary_large_image", title: "Edsun Caldoza — Graphic Designer & Video Editor", description: "Design that looks sharp, works hard, and moves the message forward.", images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
