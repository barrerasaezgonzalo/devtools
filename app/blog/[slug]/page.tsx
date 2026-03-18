import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/app/lib/tools";
import { posts } from "@/app/lib/post";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | DevTools.cl",
    };
  }

  return {
    title: `${post.title} | DevTools.cl`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://devtools.cl/blog/${post.slug}`,
      siteName: "DevTools.cl",
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const relatedTools = tools.filter((t) => post.relatedTools.includes(t.slug));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <article>
        <header className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <p className="text-zinc-400">{post.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[10px] uppercase tracking-wider bg-zinc-800 text-zinc-400 px-2 py-1 rounded"
              >
                {kw}
              </span>
            ))}
          </div>
        </header>

        <section className="prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trimStart();

            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-semibold text-white">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            if (line.trim() === "") {
              return <br key={i} />;
            }

            return (
              <p key={i} className="text-zinc-300 leading-relaxed">
                {line}
              </p>
            );
          })}
        </section>
      </article>

      {relatedTools.length > 0 && (
        <section className="mt-4 border-t border-zinc-900">
          <h2 className="text-lg font-semibold text-white mb-4">
            Herramientas relacionadas
          </h2>

          <div className="grid gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="border border-zinc-800 rounded-lg p-4 hover:border-cyan-500/40 transition-all bg-zinc-900/40"
              >
                <h3 className="text-white font-medium mb-1">{tool.name}</h3>
                <p className="text-xs text-zinc-400">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-16 border-t border-zinc-900 pt-10">
        <div className="text-sm text-zinc-500">
          <Link href="/blog" className="text-cyan-400 hover:underline">
            ← Volver al blog
          </Link>
        </div>
      </footer>
    </div>
  );
}
