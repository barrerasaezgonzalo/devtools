"use client";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const encoded = "aG9sYUBkZXZ0b29scy5jbA==";
    const decoded = atob(encoded);
    setEmail(decoded);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-zinc-300">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Contact</h1>

        <p className="text-zinc-400 leading-relaxed">
          Si tienes preguntas, sugerencias o deseas reportar algún problema con
          las herramientas disponibles en DevTools.cl, puedes ponerte en
          contacto por correo electrónico.
        </p>
      </header>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Email de contacto</h2>

        <p className="text-zinc-400 leading-relaxed">
          Para consultas generales, sugerencias de nuevas herramientas o
          reportes de errores, escríbenos a:
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 font-mono text-cyan-400 text-sm">
          {email}
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed">
          Intentaremos responder a los mensajes lo antes posible.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Sugerencias</h2>

        <p className="text-zinc-400 leading-relaxed">
          DevTools.cl es un proyecto en crecimiento y continuamente se agregan
          nuevas herramientas. Si tienes ideas de utilidades que podrían ser
          útiles para desarrolladores, puedes enviarlas por correo y serán
          consideradas para futuras actualizaciones del sitio.
        </p>
      </section>

      <footer className="border-t border-zinc-900 pt-8 text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} DevTools.cl</p>
      </footer>
    </div>
  );
}
