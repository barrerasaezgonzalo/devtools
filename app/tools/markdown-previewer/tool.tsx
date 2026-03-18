"use client";

import { useState, useEffect } from "react";

export default function MarkdownPreviewer() {
  const [input, setInput] = useState<string>(
    "# Título de Ejemplo\n\nEscribe aquí tu **Markdown** y mira el resultado a la derecha.\n\n* Punto uno\n* Punto dos\n\n```javascript\nconsole.log('Hola Mundo');\n```",
  );
  const [html, setHtml] = useState<string>("");

  const parseMarkdown = (md: string) => {
    const temp = md
      .replace(
        /```([\s\S]*?)```/gim,
        '<pre class="bg-black p-4 rounded-lg my-4 font-mono text-sm text-cyan-400 border border-zinc-800">$1</pre>',
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-2xl font-bold text-zinc-100 mb-4">$1</h1>',
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-bold text-zinc-200 mb-3">$1</h2>',
      )
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-bold text-zinc-300 mb-2">$1</h3>',
      )
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-zinc-100">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(
        /^\* (.*$)/gim,
        '<li class="ml-4 list-disc text-zinc-300">$1</li>',
      )
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        '<a href="$2" class="text-cyan-400 hover:underline" target="_blank">$1</a>',
      )
      .replace(/\n/gim, "<br />");

    setHtml(temp);
  };

  useEffect(() => {
    // eslint-disable-next-line
    parseMarkdown(input);
  }, [input]);

  const clear = () => {
    setInput("");
    setHtml("");
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div className="flex-1">
          <div className="text-xs flex items-center gap-2 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            Live Preview activo
          </div>
        </div>
        <button
          onClick={clear}
          className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] mb-12">
        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Editor Markdown
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none resize-none font-mono text-sm text-zinc-300 transition-all"
            placeholder="# Escribe aquí..."
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Preview
          </label>
          <div
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-6 overflow-auto custom-scrollbar text-zinc-300 text-sm leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Por qué usar Markdown?
            </h2>
            <p>
              Markdown es el estándar para documentar proyectos de software.
              Permite escribir contenido formateado de manera rápida y legible
              tanto para humanos como para máquinas. Es el lenguaje detrás de
              los archivos README en GitHub y la mayoría de los blogs técnicos
              modernos.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Visualización Instantánea
              </h3>
              <p className="text-xs">
                A medida que escribes, nuestro motor procesa las reglas de
                sintaxis para mostrarte exactamente cómo se verá tu documento
                final.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Privacidad Local
              </h3>
              <p className="text-xs">
                Tu contenido nunca sale de tu navegador. El renderizado es 100%
                local, ideal para redactar documentación interna o privada sin
                riesgos.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
