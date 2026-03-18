"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">(
    "paragraphs",
  );
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const baseText = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
    "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer in mauris eu nibh euismod gravida.",
    "Duis ac tellus et risus vulputate vehicula.",
    "Donec lobortis risus a elit. Etiam tempor.",
  ];

  const generateText = () => {
    let result = "";

    if (type === "words") {
      const allWords = baseText.join(" ").split(" ");
      result = allWords.slice(0, count).join(" ");
    } else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(baseText[i % baseText.length]);
      }
      result = sentences.join(" ");
    } else {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(baseText.join(" "));
      }
      result = paragraphs.join("\n\n");
    }

    setOutput(result);
    setStatus({ type: "success", msg: "Texto generado" });
  };

  useEffect(() => {
    // eslint-disable-next-line
    generateText();
  }, [count, type]);

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

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div className="flex-1 text-xs text-zinc-500 font-medium">
          {status && status.type === "success" && (
            <span className="text-emerald-400 animate-in fade-in">
              ✓ {status.msg}
            </span>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            {(["words", "sentences", "paragraphs"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 text-[10px] uppercase font-bold rounded-md transition-all ${
                  type === t
                    ? "bg-zinc-800 text-cyan-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {t === "words"
                  ? "Palabras"
                  : t === "sentences"
                    ? "Frases"
                    : "Párrafos"}
              </button>
            ))}
          </div>
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, parseInt(e.target.value, 10) || 1))
            }
            className="w-16 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-sm text-cyan-400 outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      <div className="flex-1 mb-12">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
            Resultado de relleno
          </label>
          {output && (
            <button
              onClick={copyToClipboard}
              className={`text-[10px] px-3 py-1 rounded-lg font-bold transition-all ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              }`}
            >
              {copied ? "✓ Copiado" : "Copiar Todo"}
            </button>
          )}
        </div>
        <div className="relative h-[400px]">
          <textarea
            readOnly
            value={output}
            className="w-full h-full p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 font-sans text-sm text-zinc-300 leading-relaxed overflow-auto custom-scrollbar resize-none outline-none focus:border-cyan-500/30"
          />
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es Lorem Ipsum?
            </h2>
            <p>
              Es un texto de relleno estándar utilizado en la industria de la
              impresión y el diseño gráfico desde el siglo XVI. Su propósito es
              permitir a los diseñadores visualizar la distribución del texto en
              una página sin que el lector se distraiga con el contenido real.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Uso Profesional
              </h3>
              <p className="text-xs">
                Perfecto para prototipos de interfaces, maquetación de artículos
                o pruebas de tipografía donde el contenido aún no ha sido
                definido.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Personalización
              </h3>
              <p className="text-xs">
                Genera desde una sola palabra para un botón hasta múltiples
                párrafos para una sección de blog con un solo clic.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
