export const metadata = {
  title: "Terms of Service | DevTools.cl",
  description:
    "Términos de uso de DevTools.cl. Condiciones para el uso de las herramientas y servicios disponibles en el sitio.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-zinc-300">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>

        <p className="text-zinc-400 leading-relaxed">
          Estos términos y condiciones describen las reglas y condiciones para
          el uso del sitio web DevTools.cl. Al acceder o utilizar este sitio,
          aceptas cumplir con estos términos. Si no estás de acuerdo con alguna
          parte de estos términos, te recomendamos no utilizar el sitio.
        </p>
      </header>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Uso del sitio</h2>

        <p className="text-zinc-400 leading-relaxed">
          DevTools.cl proporciona herramientas online diseñadas para ayudar a
          desarrolladores y usuarios a realizar tareas técnicas comunes como
          formateo de datos, generación de identificadores o conversión de
          formatos.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          El uso de las herramientas es gratuito y se ofrece únicamente con
          fines informativos y de productividad. Los usuarios son responsables
          del uso que hagan de las herramientas disponibles en el sitio.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Limitación de responsabilidad
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Las herramientas y el contenido del sitio se proporcionan "tal cual",
          sin garantías de ningún tipo. DevTools.cl no garantiza que las
          herramientas funcionen sin errores ni que los resultados sean siempre
          exactos o adecuados para un propósito específico.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          El uso del sitio es bajo responsabilidad del usuario. DevTools.cl no
          será responsable por daños directos o indirectos derivados del uso o
          la imposibilidad de uso del sitio.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Propiedad intelectual
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Todo el contenido del sitio, incluyendo diseño, texto, código y
          estructura, pertenece a DevTools.cl salvo que se indique lo contrario.
          No está permitido copiar, redistribuir o reproducir el contenido del
          sitio sin autorización previa.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Servicios de terceros
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          El sitio puede incluir enlaces o servicios de terceros, incluyendo
          plataformas de análisis o publicidad. DevTools.cl no controla ni es
          responsable por el contenido o prácticas de privacidad de estos
          servicios externos.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Modificaciones</h2>

        <p className="text-zinc-400 leading-relaxed">
          DevTools.cl se reserva el derecho de modificar estos términos en
          cualquier momento. Los cambios serán publicados en esta página y
          entrarán en vigor inmediatamente después de su publicación.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Se recomienda revisar esta página periódicamente para mantenerse
          informado sobre cualquier actualización.
        </p>
      </section>

      <footer className="border-t border-zinc-900 pt-8 text-sm text-zinc-500">
        <p>Última actualización: {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
