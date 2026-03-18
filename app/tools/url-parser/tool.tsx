"use client";

import { ToolStatus } from "@/app/types";
import { useState } from "react";

export default function UrlParser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [status, setStatus] = useState<ToolStatus | null>(null);

  const parseUrl = () => {
    if (!input.trim()) {
      setStatus({ type: "error", msg: "Ingresa una URL válida" });
      setResult(null);
      return;
    }

    try {
      const url = new URL(input);

      const params: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      setResult({
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port || "(default)",
        pathname: url.pathname,
        query: url.search,
        hash: url.hash,
        params,
      });

      setStatus({
        type: "success",
        msg: "URL analizada correctamente",
      });
    } catch {
      setResult(null);
      setStatus({ type: "error", msg: "URL inválida" });
    }
  };

  const clear = () => {
    setInput("");
    setResult(null);
    setStatus(null);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div className="flex-1">
          {status && (
            <div
              className={`text-xs flex items-center gap-2 ${
                status.type === "error" ? "text-red-400" : "text-emerald-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status.type === "error" ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
              {status.msg}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={clear}
            className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
          >
            Clear
          </button>

          <button
            onClick={parseUrl}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg"
          >
            Parse URL
          </button>
        </div>
      </div>

      <div className="mb-12">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">
          URL
        </label>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com:8080/path?name=devtools&id=123#top"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300"
        />
      </div>

      {result && (
        <div className="mb-12">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">
            Components
          </label>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden font-mono text-sm">
            <Row label="protocol" value={result.protocol} />
            <Row label="hostname" value={result.hostname} />
            <Row label="port" value={result.port} />
            <Row label="pathname" value={result.pathname} />
            <Row label="query" value={result.query || "(none)"} />
            <Row label="hash" value={result.hash || "(none)"} />
          </div>

          {Object.keys(result.params).length > 0 && (
            <div className="mt-6">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">
                Query Parameters
              </label>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden font-mono text-sm">
                {Object.entries(result.params).map(([k, v]) => (
                  <Row key={k} label={k} value={String(v)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un URL Parser?
            </h2>

            <p>
              Un **URL Parser** permite analizar una dirección web y separar sus
              componentes como protocolo, dominio, puerto, ruta y parámetros de
              consulta. Esta herramienta es útil para debugging, análisis de
              URLs y desarrollo de APIs.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Debugging de URLs
              </h3>

              <p className="text-xs">
                Analizar URLs permite entender cómo se estructuran los
                parámetros enviados a APIs o aplicaciones web.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Desarrollo web
              </h3>

              <p className="text-xs">
                Los desarrolladores utilizan herramientas de parsing de URLs
                para inspeccionar rutas, query strings y fragmentos.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-zinc-800 px-4 py-2">
      <span className="text-zinc-500">{label}</span>
      <span className="text-cyan-400">{value}</span>
    </div>
  );
}
