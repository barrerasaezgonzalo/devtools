"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function Base64Tool() {
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

  const handleEncode = () => {
    if (!input.trim()) {
      setOutput("");
      setStatus({ type: "error", msg: "Ingresa texto para codificar" });
      return;
    }

    try {
      const bytes = new TextEncoder().encode(input);
      const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
      const encoded = btoa(binary);
      setOutput(encoded);
      setStatus({
        type: "success",
        msg: "Texto codificado a Base64 correctamente",
      });
    } catch {
      setOutput("");
      setStatus({ type: "error", msg: "Error al codificar el texto" });
    }
  };

  const handleDecode = () => {
    if (!input.trim()) {
      setOutput("");
      setStatus({
        type: "error",
        msg: "Ingresa un código Base64 para decodificar",
      });
      return;
    }

    try {
      const binary = atob(input);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
      setStatus({ type: "success", msg: "Base64 decodificado correctamente" });
    } catch {
      setOutput("");
      setStatus({ type: "error", msg: "Base64 inválido: revisa el formato" });
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
            <div className="text-xs flex items-center gap-2 animate-in fade-in slide-in-from-left-2 text-emerald-400">
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
            onClick={handleEncode}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-bold rounded-lg transition-all"
          >
            Encode
          </button>
          <button
            onClick={handleDecode}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] mb-12">
        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Input (Texto o Base64)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none resize-none font-mono text-sm text-zinc-300 transition-all"
            placeholder="Escribe aquí..."
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-2 h-4">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Resultado
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
              className={`w-full h-full p-4 rounded-xl border font-mono text-sm overflow-auto custom-scrollbar transition-all whitespace-pre-wrap break-all ${
                status?.type === "error"
                  ? "bg-red-500/5 border-red-500/20 text-red-400 italic"
                  : "bg-zinc-900 border-zinc-800 text-cyan-400"
              }`}
            >
              {output ||
                (status?.type === "error"
                  ? status.msg
                  : "// El resultado aparecerá aquí...")}
            </pre>
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es la codificación Base64 y para qué sirve?
            </h2>
            <p>
              Base64 es un sistema de numeración posicional que usa 64 como
              base. Es comúnmente utilizado para transmitir datos binarios sobre
              medios que están diseñados para manejar solo texto, como correos
              electrónicos o archivos JSON. Nuestra herramienta permite tanto la
              **codificación** como la **decodificación** de forma instantánea.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Privacidad Local
              </h3>
              <p className="text-xs">
                Al igual que todas nuestras utilidades, el proceso ocurre en tu
                navegador. Esto es vital cuando decodificas tokens o datos que
                no deben viajar por la red.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Manejo de Caracteres
              </h3>
              <p className="text-xs">
                Utilizamos métodos de codificación compatibles con UTF-8 para
                asegurar que los acentos y caracteres especiales no se rompan
                durante el proceso de conversión.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
