import { tools } from "@/app/lib/tools";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ToolCard from "@/app/components/ToolCard";
import Link from "next/link";

function formatCategory(slug: string) {
  return slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function getCategoryContent(slug: string) {
  const map: Record<
    string,
    { title: string; description: string; content: string }
  > = {
    formatters: {
      title: "Formatters Tools",
      description:
        "Herramientas para formatear código como JSON, SQL o HTML de forma rápida y segura.",
      content:
        "Las herramientas de formateo son esenciales en el desarrollo moderno. Permiten transformar código desordenado o minificado en estructuras legibles, facilitando el debugging, la colaboración y el mantenimiento. En esta categoría encontrarás utilidades para formatear JSON, SQL, HTML y otros lenguajes, todas ejecutándose directamente en tu navegador para garantizar privacidad y velocidad.",
    },
    encoders: {
      title: "Encoding & Decoding Tools",
      description:
        "Codifica y decodifica datos como Base64 o URLs directamente en tu navegador.",
      content:
        "Las herramientas de encoding y decoding permiten transformar datos entre distintos formatos utilizados en la web. Desde Base64 hasta URL encoding, estas utilidades son clave para trabajar con APIs, headers y transmisión de datos. Todas funcionan de manera local, asegurando que la información no salga de tu dispositivo.",
    },
    generators: {
      title: "Generators Tools",
      description:
        "Genera datos como UUIDs, contraseñas seguras o texto de prueba.",
      content:
        "Los generadores automatizan la creación de datos comunes en desarrollo como identificadores únicos (UUID), contraseñas seguras o texto de relleno. Estas herramientas ayudan a acelerar el desarrollo, testing y prototipado sin depender de servicios externos.",
    },
    converters: {
      title: "Data Converters",
      description:
        "Convierte datos entre distintos formatos como JSON, YAML o curl.",
      content:
        "Las herramientas de conversión permiten transformar datos entre distintos formatos ampliamente utilizados en desarrollo. Desde JSON a YAML hasta curl a fetch, estas utilidades simplifican la interoperabilidad entre sistemas y lenguajes.",
    },
    security: {
      title: "Security Tools",
      description:
        "Herramientas de seguridad como JWT, hash generators y validadores.",
      content:
        "La seguridad es un pilar fundamental en el desarrollo de software. En esta categoría encontrarás herramientas para trabajar con tokens JWT, generar hashes criptográficos y validar datos sensibles, todo de forma local para proteger tu información.",
    },
    web: {
      title: "Web Development Tools",
      description: "Utilidades para HTML, CSS, Markdown y análisis de URLs.",
      content:
        "Estas herramientas están orientadas al desarrollo web frontend. Incluyen utilidades para trabajar con HTML, CSS, Markdown y URLs, ayudando a mejorar la productividad y calidad del código.",
    },
    "dev-tools": {
      title: "Developer Tools",
      description:
        "Herramientas útiles como regex tester, cron editor y runners.",
      content:
        "Esta categoría agrupa herramientas prácticas para desarrolladores como testers de expresiones regulares, editores de cron y entornos de ejecución. Son utilidades diseñadas para debugging, automatización y experimentación.",
    },
  };

  return (
    map[slug] || {
      title: "Developer Tools",
      description: "Colección de herramientas para desarrolladores.",
      content:
        "Explora distintas herramientas útiles para desarrolladores, diseñadas para mejorar tu flujo de trabajo diario.",
    }
  );
}

function getCategoryFaqs(slug: string) {
  return [
    {
      q: `¿Qué herramientas incluye ${slug.replace("-", " ")}?`,
      a: "Incluye múltiples utilidades online que puedes usar directamente en tu navegador sin enviar datos a servidores.",
    },
    {
      q: "¿Las herramientas son seguras?",
      a: "Sí, todas funcionan localmente en tu navegador, lo que garantiza privacidad total.",
    },
    {
      q: "¿Necesito registrarme?",
      a: "No, todas las herramientas son gratuitas y no requieren cuenta.",
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = slug;
  const formatted = formatCategory(category);

  return {
    title: `${formatted} Tools | devtools.cl`,
    description: `Explora herramientas de ${formatted.toLowerCase()} online, gratuitas y seguras. Sin subir datos a servidores.`,
    alternates: {
      canonical: `https://devtools.cl/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filteredTools = tools.filter((tool) => tool.category === slug);

  if (filteredTools.length === 0) {
    notFound();
  }

  const { title, description, content } = getCategoryContent(slug);

  const allCategories = Array.from(
    new Set(tools.map((tool) => tool.category)),
  ).filter((c) => c !== slug);

  const faqs = getCategoryFaqs(slug);

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description,
            url: `https://devtools.cl/categories/${slug}`,
          }),
        }}
      />
      <nav className="text-sm text-zinc-500">
        <ol className="flex items-center gap-2">
          <li>
            <a href="/" className="hover:text-zinc-300 transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li className="text-zinc-300">{title}</li>
        </ol>
      </nav>
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
                name: "Categories",
                item: "https://devtools.cl/categories",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: `https://devtools.cl/categories/${slug}`,
              },
            ],
          }),
        }}
      />
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-white">{title} Tools</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          {description} Todas funcionan directamente en tu navegador,
          manteniendo tu información privada y segura.
        </p>
      </section>

      <section className="max-w-3xl text-sm text-zinc-500 leading-relaxed">
        <p>{content}</p>
      </section>

      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <li key={tool.slug}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-10 border-t border-zinc-900 space-y-6 max-w-3xl">
        <h2 className="text-zinc-300 font-medium">Preguntas frecuentes</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="text-sm text-zinc-200 font-medium">{faq.q}</h3>
              <p className="text-xs text-zinc-500 mt-1">{faq.a}</p>
            </div>
          ))}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      <section className="pt-10 border-t border-zinc-900 space-y-4">
        <h2 className="text-zinc-300 font-medium">Explorar otras categorías</h2>

        <div className="flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="px-3 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-cyan-500 hover:text-white transition-all"
            >
              {category
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
