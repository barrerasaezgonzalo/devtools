export const metadata = {
  title: "About DevTools.cl",
  description:
    "DevTools.cl es una colección de herramientas online gratuitas para desarrolladores. Formateadores, generadores y utilidades pensadas para acelerar el trabajo diario.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-zinc-300">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          About DevTools.cl
        </h1>

        <p className="text-zinc-400 leading-relaxed">
          DevTools.cl es una colección de herramientas online diseñadas para
          desarrolladores. El objetivo del sitio es ofrecer utilidades rápidas,
          simples y accesibles que ayuden a resolver tareas comunes del
          desarrollo de software sin necesidad de instalar aplicaciones
          adicionales.
        </p>
      </header>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Qué puedes encontrar aquí
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          El sitio reúne diferentes herramientas utilizadas diariamente por
          desarrolladores, ingenieros de software, estudiantes y profesionales
          del área tecnológica. Entre ellas se incluyen formateadores de código,
          generadores de identificadores, utilidades de conversión de datos y
          herramientas de debugging.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Algunas de las utilidades disponibles incluyen:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-zinc-400">
          <li>Formateadores y validadores de JSON</li>
          <li>Generadores de hashes y UUID</li>
          <li>Conversores de Base64 y URLs</li>
          <li>Probadores de expresiones regulares</li>
          <li>Generadores de contraseñas seguras</li>
          <li>Herramientas para trabajar con Markdown, HTML y CSS</li>
        </ul>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Privacidad</h2>

        <p className="text-zinc-400 leading-relaxed">
          Todas las herramientas disponibles en DevTools.cl procesan la
          información directamente en el navegador del usuario. Los datos
          introducidos no se envían a servidores externos ni se almacenan, lo
          que permite utilizar las utilidades de forma segura incluso con
          información sensible.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Objetivo del proyecto
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          El objetivo de DevTools.cl es simplificar tareas técnicas repetitivas
          ofreciendo herramientas rápidas, ligeras y fáciles de usar. Muchas
          tareas del desarrollo diario —como validar JSON, generar hashes o
          probar expresiones regulares— pueden resolverse en segundos utilizando
          utilidades simples accesibles desde cualquier navegador.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          El proyecto continuará incorporando nuevas herramientas para cubrir
          más necesidades comunes del desarrollo moderno.
        </p>
      </section>

      <footer className="border-t border-zinc-900 pt-8 text-sm text-zinc-500">
        <p>
          © {new Date().getFullYear()} DevTools.cl — Herramientas online para
          desarrolladores.
        </p>
      </footer>
    </div>
  );
}
