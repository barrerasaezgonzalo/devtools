import Link from "next/link";
import ToolCard from "./components/ToolCard";
import { tools } from "./lib/tools";
import { posts } from "./lib/post";
import { Post, Tool } from "./types";

/* ---------------- HELPERS ---------------- */

const getTodayLabel = () => {
  return new Date().toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getDailyHash = () => {
  const today = new Date().toISOString().split("T")[0];

  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
};

const getDailyItem = <T,>(items: T[]): T => {
  const hash = getDailyHash();
  const index = Math.abs(hash) % items.length;
  return items[index];
};

const getDailyPosts = (posts: Post[]) => {
  const hash = getDailyHash();

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const shuffled = [...posts].sort((a, b) => {
    return (
      seededRandom(hash + posts.indexOf(a)) -
      seededRandom(hash + posts.indexOf(b))
    );
  });

  return shuffled.slice(0, 4);
};

const getFeaturedTool = () => {
  const hash = getDailyHash();
  const index = Math.abs(hash) % tools.length;
  return tools[index];
};

const generateTipsFromTools = (tools: Tool[]) => {
  return tools.map((tool) => ({
    title: `¿Para qué sirve ${tool.name}?`,
    content: tool.description,
    slug: tool.slug,
  }));
};

/* ---------------- BLOG SECTION ---------------- */

export function HomeBlogSection() {
  const latestPosts = getDailyPosts(posts);

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Últimos artículos
        </h2>

        <Link href="/blog" className="text-sm text-cyan-400 hover:underline">
          Ver todos →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {latestPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group border border-zinc-800 rounded-xl p-5 hover:border-cyan-500/40 transition-all bg-zinc-900/40"
          >
            <article>
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.keywords.slice(0, 2).map((kw) => (
                  <span
                    key={kw}
                    className="text-[10px] uppercase tracking-wider bg-zinc-800 text-zinc-400 px-2 py-1 rounded"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOME ---------------- */

export default function HomePage() {
  const featuredTool = getFeaturedTool();

  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  const tips = generateTipsFromTools(tools);
  const dailyTip = getDailyItem(tips);
  const lastUpdated = getTodayLabel();

  return (
    <div className="space-y-12 relative">
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

          <section>
            <p className="text-lg text-zinc-200 leading-relaxed max-w-2xl font-normal">
              Tip del día!
            </p>

            <h2 className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal">
              {dailyTip.title}
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal">
              {dailyTip.content}
            </p>

            <Link
              href={`/tools/${dailyTip.slug}`}
              className="text-zinc-200 mt-2 flex"
            >
              Probar herramienta →
            </Link>
          </section>
          <p className="text-xs text-zinc-500">Actualizado: {lastUpdated}</p>
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

      <HomeBlogSection />

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
          profesionales de tecnología.
        </p>

        <p className="text-sm text-zinc-500 leading-relaxed">
          Todas las utilidades funcionan{" "}
          <span className="text-zinc-300">directamente en tu navegador</span>.
        </p>

        <p className="text-sm text-zinc-500 leading-relaxed">
          Seguimos ampliando la colección para cubrir cada vez más necesidades
          del ecosistema de desarrollo web.
        </p>
      </section>
    </div>
  );
}
