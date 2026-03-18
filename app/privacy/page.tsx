export const metadata = {
  title: "Privacy Policy | DevTools.cl",
  description:
    "Política de privacidad de DevTools.cl. Información sobre el uso de datos, cookies y funcionamiento de las herramientas del sitio.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-zinc-300">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>

        <p className="text-zinc-400 leading-relaxed">
          Esta Política de Privacidad describe cómo DevTools.cl recopila, usa y
          protege la información cuando los usuarios utilizan este sitio web.
        </p>
      </header>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Información que recopilamos
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          DevTools.cl está diseñado para funcionar principalmente sin recopilar
          información personal identificable. Las herramientas disponibles en el
          sitio procesan los datos directamente en el navegador del usuario y no
          envían contenido ingresado a servidores externos.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Podemos recopilar información técnica limitada como tipo de navegador,
          sistema operativo, páginas visitadas y tiempo de uso del sitio con el
          objetivo de mejorar el funcionamiento del servicio.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Cookies</h2>

        <p className="text-zinc-400 leading-relaxed">
          DevTools.cl puede utilizar cookies para mejorar la experiencia del
          usuario, analizar el tráfico del sitio y recordar ciertas preferencias
          de navegación. Las cookies son pequeños archivos almacenados en el
          navegador que ayudan a los sitios web a funcionar de manera más
          eficiente.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Los usuarios pueden desactivar las cookies desde la configuración de
          su navegador en cualquier momento.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Publicidad y servicios de terceros
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Este sitio puede utilizar servicios de publicidad de terceros como
          Google AdSense. Estos servicios pueden utilizar cookies u otras
          tecnologías para mostrar anuncios relevantes basados en visitas
          anteriores al sitio u otros sitios web.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Google puede utilizar cookies publicitarias para ofrecer anuncios
          personalizados. Los usuarios pueden obtener más información sobre cómo
          Google utiliza los datos visitando la política de privacidad de
          Google.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Seguridad</h2>

        <p className="text-zinc-400 leading-relaxed">
          DevTools.cl adopta medidas razonables para proteger la información y
          garantizar que el sitio funcione de forma segura. Sin embargo, ningún
          sistema en internet puede garantizar seguridad absoluta.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">
          Cambios a esta política
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Esta política de privacidad puede actualizarse ocasionalmente para
          reflejar cambios en el sitio o en las regulaciones aplicables. Se
          recomienda revisar esta página periódicamente para mantenerse
          informado.
        </p>
      </section>

      <footer className="border-t border-zinc-900 pt-8 text-sm text-zinc-500">
        <p>Última actualización: {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
