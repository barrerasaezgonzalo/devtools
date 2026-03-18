"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function CssMinifier() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const minifyCss = (css: string) => {
    if (!css.trim()) {
      setOutput("");
      setStatus(null);
      return;
    }

    try {
      const minified = css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .replace(/;}/g, "}")
        .trim();

      setOutput(minified);
      setStatus({ type: "success", msg: "CSS minificado con éxito" });
    } catch (err) {
      console.log(err);
      setStatus({ type: "error", msg: "Error al procesar el CSS" });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    minifyCss(input);
  }, [input]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setStatus(null);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div className="flex-1">
          {status && status.type === "success" && (
            <div className="text-xs flex items-center gap-2 animate-in fade-in slide-in-from-left-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {status.msg}
            </div>
          )}
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
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1 text-blue-400">
            CSS Original
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none resize-none font-mono text-sm text-zinc-300 transition-all"
            placeholder={".container {\n  display: flex;\n  padding: 20px;\n}"}
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-2 h-4">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1 text-blue-400">
              CSS Minificado
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className={`text-[10px] px-2 py-1 rounded transition-all ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {copied ? "✓ Copiado" : "Copy to clipboard"}
              </button>
            )}
          </div>
          <div className="relative flex-1 overflow-hidden">
            <textarea
              readOnly
              value={output}
              className={`w-full h-full p-4 rounded-xl border font-mono text-sm overflow-auto custom-scrollbar transition-all resize-none outline-none ${
                status?.type === "error"
                  ? "bg-red-500/5 border-red-500/20 text-red-400 italic"
                  : "bg-zinc-900 border-zinc-800 text-blue-400"
              }`}
              placeholder="// El CSS minificado aparecerá aquí..."
            />
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Por qué minificar tu CSS?
            </h2>
            <p>
              La minificación es una técnica esencial de rendimiento web. Al
              eliminar espacios, comentarios y saltos de línea, reducimos el
              tamaño del archivo descargado por el navegador, lo que acelera el
              tiempo de carga de tu sitio (First Contentful Paint).
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Optimización de Símbolos
              </h3>
              <p className="text-xs">
                Nuestra herramienta elimina inteligentemente los espacios
                alrededor de llaves `{}`, dos puntos `:` y puntos y coma `;`,
                además de quitar el último punto y coma innecesario en cada
                bloque.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Limpieza de Comentarios
              </h3>
              <p className="text-xs">
                Se eliminan todos los bloques de comentarios `/* ... */` para
                asegurar que solo el código funcional sea enviado al usuario
                final.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
