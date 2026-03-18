import { tools } from "@/app/lib/tools";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/app/lib/post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Herramienta no encontrada",
    };
  }

  return {
    title: `${tool.name} | devtools.cl`,
    description: tool.description,
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: "website",
      url: `https://devtools.cl/tools/${slug}`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `Vista previa de la herramienta ${tool.name}`,
        },
      ],
    },
    alternates: {
      canonical: `https://devtools.cl/tools/${slug}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  function getRandomTools(currentSlug: string, count = 6) {
    const filtered = tools.filter((t) => t.slug !== currentSlug);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const relatedPosts = posts.filter((post) => post.relatedTools.includes(slug));

  const relatedTools = getRandomTools(slug, 6);
  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="text-sm text-zinc-500 mb-4">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/tools"
              className="hover:text-zinc-300 transition-colors"
            >
              Tools
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/categories/${tool.category}`}
              className="hover:text-zinc-300 transition-colors"
            >
              {tool.category
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          </li>
          <li>/</li>
          <li className="text-zinc-300">{tool.name}</li>
        </ol>
      </nav>
      <header className="mb-10">
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <h2 className="text-zinc-400 mt-4">{tool.description}</h2>
      </header>

      <div className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800">
        {ToolComponent ? (
          <>
            <ToolComponent />

            {tool.faqs && tool.faqs.length > 0 && (
              <section className="mt-4">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">
                  Preguntas Frecuentes
                </h2>

                <div className="space-y-6 text-sm text-zinc-400">
                  {tool.faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-zinc-200 font-medium mb-1">
                        {faq.question}
                      </h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {tool.faqs && tool.faqs.length > 0 && (
              <>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      mainEntity: tool.faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: faq.answer,
                        },
                      })),
                    }),
                  }}
                />
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BreadcrumbList",
                      itemListElement: [
                        {
                          "@type": "ListItem",
                          position: 1,
                          name: "Home",
                          item: "https://devtools.cl",
                        },
                        {
                          "@type": "ListItem",
                          position: 2,
                          name: "Tools",
                          item: "https://devtools.cl/tools",
                        },
                        {
                          "@type": "ListItem",
                          position: 3,
                          name: tool.category
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase()),
                          item: `https://devtools.cl/categories/${tool.category}`,
                        },
                        {
                          "@type": "ListItem",
                          position: 4,
                          name: tool.name,
                          item: `https://devtools.cl/tools/${tool.slug}`,
                        },
                      ],
                    }),
                  }}
                />
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "SoftwareApplication",
                      name: tool.name,
                      description: tool.description,
                      applicationCategory: "DeveloperApplication",
                      operatingSystem: "Any",
                      url: `https://devtools.cl/tools/${tool.slug}`,
                    }),
                  }}
                />
              </>
            )}

            <section className="mt-4 pt-4 border-t border-zinc-900">
              <h2 className="text-zinc-200 font-semibold mb-4 text-sm">
                Herramientas relacionadas
              </h2>
              <ul className="text-sm text-zinc-400 space-y-2">
                {relatedTools.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tools/${t.slug}`}
                      className="hover:text-cyan-400"
                    >
                      {t.name}
                    </Link>
                    <p className="text-xs text-zinc-500">{t.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            {relatedPosts.length > 0 && (
              <section className="mt-4 border-t border-zinc-900 pt-10">
                <h2 className="text-zinc-300 font-semibold mb-4 text-base">
                  Aprende más sobre este tema
                </h2>

                <div className="grid gap-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="border border-zinc-800 rounded-lg p-4 hover:border-cyan-500/40 transition-all bg-zinc-900/40"
                    >
                      <h3 className="text-white font-medium mb-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {post.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="p-20 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500">
            Esta herramienta estará disponible muy pronto.
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
