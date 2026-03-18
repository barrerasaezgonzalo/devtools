import Link from "next/link";
import ToolCard from "./components/ToolCard";
import { tools } from "./lib/tools";

export default function HomePage() {
  const featuredTool = tools[0];

  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <div className="space-y-24 relative">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      <section className="grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3 space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Herramientas para Desarrolladores
            <span className="text-cyan-500 block">Online y Gratuitas</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl font-normal">
            Optimiza tu flujo de trabajo con nuestra colección de
            <span className="text-zinc-200 font-medium">
              {" "}
              utilidades para programadores
            </span>
            . Formatea JSON, convierte Base64 y más, sin que tus datos salgan de
            tu navegador.
          </p>
        </div>

        <div className="lg:col-span-2 group relative p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-10 group-hover:opacity-20 transition duration-300 blur" />
          <div className="relative">
            <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 font-bold">
              Utilidad Destacada
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-3">
              {featuredTool.name}
            </h2>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
              {featuredTool.description}
            </p>
            <Link
              href={`/tools/${featuredTool.slug}`}
              className="inline-flex items-center text-sm px-4 py-2 bg-zinc-100 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors duration-200 group/btn"
            >
              Usar utilidad
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            Explorar todas las utilidades
          </h2>
          <div className="h-px flex-1 bg-zinc-800 ml-6 hidden sm:block" />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            Explorar por categorías
          </h2>
          <div className="h-px flex-1 bg-zinc-800 ml-6 hidden sm:block" />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="px-4 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-cyan-500 hover:text-white transition-all"
            >
              {category
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-10 border-t border-zinc-900 max-w-7xl space-y-6">
        <h2 className="text-zinc-200 font-semibold mb-2 text-lg">
          Herramientas para desarrolladores rápidas y seguras
        </h2>

        <p className="text-sm text-zinc-500 leading-relaxed">
          En <span className="text-zinc-300 font-medium">devtools.cl</span>{" "}
          ofrecemos una colección de herramientas online pensadas para mejorar
          el flujo de trabajo de desarrolladores web, ingenieros de software y
          profesionales de tecnología. Nuestra plataforma incluye utilidades
          para formatear código, generar hashes criptográficos, analizar tokens
          JWT, convertir datos entre formatos y validar estructuras utilizadas
          en el desarrollo moderno.
        </p>

        <p className="text-sm text-zinc-500 leading-relaxed">
          Todas las utilidades funcionan{" "}
          <span className="text-zinc-300">directamente en tu navegador</span>.
          Esto significa que los datos que ingresas —como tokens, JSON,
          contraseñas o consultas— nunca se envían a servidores externos. El
          procesamiento ocurre localmente utilizando las APIs nativas del
          navegador, lo que garantiza privacidad, velocidad y seguridad.
        </p>

        <p className="text-sm text-zinc-500 leading-relaxed">
          Nuestro objetivo es proporcionar herramientas simples, rápidas y
          confiables que faciliten tareas comunes del desarrollo: formatear
          JSON, decodificar Base64, inspeccionar JWT, generar UUIDs, crear
          hashes SHA-256 y muchas más. Seguimos ampliando la colección para
          cubrir cada vez más necesidades del ecosistema de desarrollo web.
        </p>
      </section>
    </div>
  );
}
