import type { Metadata } from "next";
import { headers } from "next/headers";
import { Space_Grotesk } from "next/font/google";
import { CountUpObserver, RevealObserver } from "./client-components";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "edsun-caldoza.vercel.app";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: { default: "Edsun Caldoza | Graphic Designer & Video Editor", template: "%s" },
    description: "Graphic design, video editing, presentation design, and web work by Edsun Caldoza.",
    icons: {
      icon: [
        { url: "/favicon.svg?v=2", type: "image/svg+xml" },
        { url: "/images/ico.png", type: "image/png", sizes: "180x180" },
      ],
      shortcut: "/favicon.svg?v=2",
      apple: "/images/ico.png",
    },
    openGraph: {
      type: "website",
      url: metadataBase,
      title: "Edsun Caldoza | Graphic Designer & Video Editor",
      description: "Graphic design, video editing, presentation design, and web work by Edsun Caldoza.",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Edsun Caldoza | Graphic Designer & Video Editor" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Edsun Caldoza | Graphic Designer & Video Editor",
      description: "Graphic design, video editing, presentation design, and web work by Edsun Caldoza.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('edsun-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})();` }} />
      </head>
      <body className={spaceGrotesk.variable}>
        {children}
        <RevealObserver />
        <CountUpObserver />
      </body>
    </html>
  );
}
