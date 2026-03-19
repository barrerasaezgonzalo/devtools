import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./LayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devtools.cl"),
  title: {
    default: "devtools.cl — Herramientas Online para Desarrolladores",
    template: "%s | devtools.cl",
  },
  description:
    "Utilidades gratuitas y rápidas para programadores: Formateador JSON, Base64, JWT Debugger y más. Procesamiento 100% local y seguro.",
  keywords: [
    "herramientas desarrolladores",
    "json formatter",
    "base64 decoder",
    "utilidades programacion",
    "devtools online",
  ],
  authors: [{ name: "devtools.cl" }],
  creator: "devtools.cl",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "devtools.cl — Herramientas Online para Desarrolladores",
    description:
      "Utilidades gratuitas para programadores: JSON Formatter, Base64, JWT Debugger y más.",
    url: "https://devtools.cl",
    siteName: "devtools.cl",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "devtools.cl - herramientas para desarrolladores",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "devtools.cl — Herramientas para desarrolladores",
    description:
      "JSON Formatter, Base64, JWT Debugger y más utilidades gratuitas para programadores.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
