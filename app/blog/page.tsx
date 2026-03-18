import { Metadata } from "next";
import Link from "next/link";
import { posts } from "../lib/post";

export const metadata: Metadata = {
  title: "Blog de Desarrollo | DevTools.cl",
  description:
    "Aprende sobre desarrollo web, herramientas, APIs y buenas prácticas. Guías claras sobre JSON, JWT, Base64, seguridad y más.",
  keywords: [
    "blog desarrollo",
    "json",
    "jwt",
    "base64",
    "programacion",
    "devtools",
  ],
  openGraph: {
    title: "Blog de Desarrollo | DevTools.cl",
    description:
      "Guías prácticas para desarrolladores sobre herramientas, APIs y debugging.",
    url: "https://devtools.cl/blog",
    siteName: "DevTools.cl",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Blog de Desarrollo
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          Aprende sobre herramientas esenciales para desarrolladores, formatos
          de datos, seguridad y buenas prácticas. Contenido optimizado para
          resolver problemas reales.
        </p>
      </header>

      <section className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group border border-zinc-800 rounded-xl p-6 hover:border-cyan-500/40 transition-all bg-zinc-900/40"
          >
            <article>
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-zinc-400 text-sm mb-4">{post.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {post.keywords.slice(0, 3).map((kw) => (
                  <span
                    key={kw}
                    className="text-[10px] uppercase tracking-wider bg-zinc-800 text-zinc-400 px-2 py-1 rounded"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              <span className="text-xs text-cyan-400">Leer artículo →</span>
            </article>
          </Link>
        ))}
      </section>

      <footer className="mt-16 border-t border-zinc-900 pt-10">
        <div className="max-w-3xl text-sm text-zinc-500 leading-relaxed space-y-6">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué encontrarás en este blog?
            </h2>
            <p>
              Este blog está enfocado en desarrolladores que buscan entender
              mejor herramientas, formatos de datos y conceptos clave como JSON,
              JWT, encoding y seguridad. Cada guía está diseñada para ser clara,
              práctica y útil en escenarios reales.
            </p>
          </section>

          <section>
            <h3 className="text-zinc-300 font-medium mb-1 text-sm">
              Enfoque práctico
            </h3>
            <p className="text-xs">
              Todos los artículos están orientados a resolver problemas comunes
              en el desarrollo diario, incluyendo debugging, validación de datos
              y uso de APIs.
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
}
