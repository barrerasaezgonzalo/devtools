import Link from "next/link";
import { tools } from "../lib/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
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

export default function ToolsIndexPage() {
  return (
    <main className="max-w-4xl mx-auto space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-zinc-100">
          Herramientas online para desarrolladores
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Explora nuestra colección de utilidades para desarrollo web. Todas las
          herramientas funcionan directamente en tu navegador, sin enviar datos
          a servidores externos.
        </p>
      </header>

      <ul className="space-y-4">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="text-cyan-400 hover:underline font-medium"
            >
              {tool.name}
            </Link>
            <p className="text-zinc-500 text-sm">{tool.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
