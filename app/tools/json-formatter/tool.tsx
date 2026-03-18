"use client";
import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorPos, setErrorPos] = useState<number | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const format = () => {
    if (!input.trim()) {
      setOutput("");
      setStatus({
        type: "error",
        msg: "Por favor, ingresa un JSON para formatear",
      });
      return;
    }

    try {
      setErrorPos(null);
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus({ type: "success", msg: "JSON formateado correctamente" });
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : "JSON inválido";
      const message = rawMessage
        .replace(/\s*\(line \d+ column \d+\)/i, "")
        .replace(/\s*\(línea \d+, columna \d+\)/i, "");
      const match = message.match(/position (\d+)/);

      if (match) {
        const pos = Number(match[1]);
        setErrorPos(pos);
        setOutput(input);
        setStatus({
          type: "error",
          msg: message,
        });
      } else {
        setErrorPos(null);
        setOutput(input);
        setStatus({ type: "error", msg: message });
      }
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
  };

  const downloadJson = () => {
    if (!output) return;

    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
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
          {status && (
            <div
              className={`text-xs flex items-center gap-2 animate-in fade-in slide-in-from-left-2 ${
                status.type === "success" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status.type === "success" ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
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

          {status?.type === "success" && (
            <button
              onClick={downloadJson}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-lg transition-all"
            >
              Download JSON
            </button>
          )}

          <button
            onClick={format}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Format JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] mb-12">
        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 custom-scrollbar w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none resize-none font-mono text-sm text-zinc-300 transition-all"
            placeholder='{ "key": "value" }'
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-2 h-4">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Output
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className={`text-[10px] px-2 py-1 rounded transition-all duration-200 ${
                  copied
                    ? "bg-emerald-600 text-white font-bold"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                }`}
              >
                {copied ? "✓ Copiado" : "Copy to clipboard"}
              </button>
            )}
          </div>
          <div className="relative flex-1 overflow-hidden">
            <pre
              className={`w-full h-full p-4 rounded-xl border font-mono text-sm overflow-auto custom-scrollbar transition-all ${
                status?.type === "error"
                  ? "bg-red-500/5 border-red-500/20 text-zinc-300"
                  : "bg-zinc-900 border-zinc-800 text-cyan-400"
              }`}
            >
              {output
                ? errorPos !== null
                  ? output.split("\n").map((line, i) => {
                      const start =
                        output.split("\n").slice(0, i).join("\n").length +
                        (i > 0 ? 1 : 0);
                      const end = start + line.length;
                      const hasError = errorPos >= start && errorPos <= end;
                      return (
                        <div
                          key={i}
                          className={
                            hasError ? "bg-red-500/20 text-red-400" : ""
                          }
                        >
                          {line}
                        </div>
                      );
                    })
                  : output
                : status?.type === "error"
                  ? status.msg
                  : "// El resultado aparecerá aquí..."}
            </pre>
            <div
              className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-colors ${output ? "bg-cyan-500 shadow-[0_0_10px_#06b6d4]" : "bg-zinc-800"}`}
            />
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un Formateador de JSON y para qué sirve?
            </h2>
            <p>
              Un **JSON Formatter** es una herramienta esencial para
              desarrolladores que permite transformar una cadena de texto JSON
              desordenada o "minificada" en un formato legible para humanos.
              Nuestra utilidad online te ayuda a estructurar datos complejos,
              facilitando el debugging y la visualización de jerarquías en
              archivos de configuración o respuestas de APIs.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Privacidad y Seguridad
              </h3>
              <p className="text-xs">
                A diferencia de otros conversores online, en **devtools.cl**
                procesamos todo de forma local. Tus datos no se envían a ningún
                servidor, garantizando que tu información sensible permanezca
                privada.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Compatibilidad Total
              </h3>
              <p className="text-xs">
                Nuestra herramienta es compatible con el estándar RFC 8259,
                permitiendo validar y limpiar objetos, arreglos y tipos de datos
                complejos de JavaScript de manera instantánea.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
