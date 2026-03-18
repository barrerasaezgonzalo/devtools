"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
    setHistory((prev) => [newUuid, ...prev].slice(0, 10));
    setStatus({ type: "success", msg: "UUID v4 generado" });
  };

  useEffect(() => {
    generateUuid();
  }, []);

  useEffect(() => {
    if (copiedId) {
      const timer = setTimeout(() => setCopiedId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
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
          onClick={generateUuid}
          className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          Generar Nuevo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px] mb-12">
        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            UUID v4
          </label>
          <div className="flex-1 relative group bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col items-center justify-center p-8">
            <span className="font-mono text-xl md:text-2xl text-cyan-400 break-all text-center select-all">
              {uuid}
            </span>
            <button
              onClick={() => copyToClipboard(uuid)}
              className={`mt-6 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                copiedId === uuid
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {copiedId === uuid ? "✓ Copiado" : "Copiar UUID"}
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Últimos 10 generados
          </label>
          <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-y-auto custom-scrollbar p-2">
            {history.length > 0 ? (
              history.map((id) => (
                <div
                  key={id}
                  className="group flex items-center justify-between p-3 hover:bg-zinc-800/50 rounded-lg transition-colors border-b border-zinc-800/50 last:border-0"
                >
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-300 truncate mr-4">
                    {id}
                  </span>
                  <button
                    onClick={() => copyToClipboard(id)}
                    className={`text-[10px] px-2 py-1 rounded font-bold uppercase transition-all ${
                      copiedId === id
                        ? "text-emerald-400"
                        : "text-zinc-600 hover:text-cyan-400"
                    }`}
                  >
                    {copiedId === id ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-600 text-xs italic">
                No hay historial todavía
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un UUID v4?
            </h2>
            <p>
              Un Identificador Único Universal (UUID) es un número de 128 bits
              utilizado para identificar información en sistemas informáticos.
              La versión 4 se genera de forma completamente aleatoria, lo que
              garantiza una probabilidad de duplicación prácticamente nula,
              ideal para claves primarias en bases de datos o identificadores de
              sesión.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Generación Segura
              </h3>
              <p className="text-xs">
                Utilizamos la API nativa `crypto.randomUUID()` del navegador, la
                cual emplea un generador de números aleatorios
                criptográficamente seguro.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Privacidad
              </h3>
              <p className="text-xs">
                Al igual que el resto de nuestras herramientas, los UUIDs se
                generan localmente. Nada se envía a nuestros servidores,
                manteniendo tus procesos de desarrollo privados.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
