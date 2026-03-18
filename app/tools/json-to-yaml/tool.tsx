"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";
import yaml from "js-yaml";

export default function JsonToYamlConverter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      setStatus({ type: "error", msg: "Por favor, ingresa un JSON válido" });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const yamlOutput = yaml.dump(parsed, { indent: 2 });
      setOutput(yamlOutput);
      setStatus({ type: "success", msg: "Conversión realizada correctamente" });
    } catch (err) {
      setOutput("");
      setStatus({ type: "error", msg: "JSON inválido: revisa la sintaxis" });
    }
  };

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
            <div className="text-xs flex items-center gap-2 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {status.msg}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={clear}
            className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Clear
          </button>

          <button
            onClick={convert}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Convert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] mb-12">
        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            JSON Input
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500/50 outline-none resize-none font-mono text-sm text-zinc-300"
            placeholder='{ "name": "devtools", "version": 1 }'
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-2 h-4">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
              YAML Output
            </label>

            {output && (
              <button
                onClick={copyToClipboard}
                className={`text-[10px] px-2 py-1 rounded transition-all ${
                  copied
                    ? "bg-emerald-600 text-white font-bold"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                }`}
              >
                {copied ? "✓ Copiado" : "Copy"}
              </button>
            )}
          </div>

          <pre className="w-full h-full p-4 rounded-xl border font-mono text-sm overflow-auto custom-scrollbar bg-zinc-900 border-zinc-800 text-cyan-400">
            {output || "// El resultado aparecerá aquí..."}
          </pre>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un JSON → YAML Converter?
            </h2>

            <p>
              Un **JSON a YAML Converter** permite transformar estructuras de
              datos en formato JSON a YAML. Ambos formatos son ampliamente
              utilizados para configuraciones, APIs y archivos de
              infraestructura como código.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Uso común en DevOps
              </h3>

              <p className="text-xs">
                YAML es utilizado en herramientas como Kubernetes, Docker
                Compose y GitHub Actions. Convertir JSON a YAML permite adaptar
                configuraciones rápidamente.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Procesamiento local
              </h3>

              <p className="text-xs">
                Esta herramienta procesa los datos directamente en tu navegador.
                Ningún contenido es enviado a servidores externos, garantizando
                privacidad y seguridad.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
