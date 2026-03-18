"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export default function HashGenerator() {
  const [input, setInput] = useState<string>("");
  const [md5, setMd5] = useState<string>("");
  const [sha1, setSha1] = useState<string>("");
  const [sha256, setSha256] = useState<string>("");
  const [sha512, setSha512] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const generate = () => {
    if (!input.trim()) {
      setMd5("");
      setSha1("");
      setSha256("");
      setSha512("");
      setStatus({ type: "error", msg: "Ingresa texto para generar hashes" });
      return;
    }

    setMd5(CryptoJS.MD5(input).toString());
    setSha1(CryptoJS.SHA1(input).toString());
    setSha256(CryptoJS.SHA256(input).toString());
    setSha512(CryptoJS.SHA512(input).toString());

    setStatus({ type: "success", msg: "Hashes generados correctamente" });
  };

  const copy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
  };

  const clear = () => {
    setInput("");
    setMd5("");
    setSha1("");
    setSha256("");
    setSha512("");
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
            onClick={generate}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Generate Hash
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
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none resize-none font-mono text-sm text-zinc-300 transition-all"
            placeholder="Texto para generar hash..."
          />
        </div>

        <div className="flex flex-col gap-4 overflow-auto custom-scrollbar">
          {[
            { label: "MD5", value: md5 },
            { label: "SHA-1", value: sha1 },
            { label: "SHA-256", value: sha256 },
            { label: "SHA-512", value: sha512 },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  {item.label}
                </span>

                {item.value && (
                  <button
                    onClick={() => copy(item.value, item.label)}
                    className={`text-[10px] px-2 py-1 rounded transition-all duration-200 ${
                      copied === item.label
                        ? "bg-emerald-600 text-white font-bold"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    }`}
                  >
                    {copied === item.label ? "✓ Copiado" : "Copy"}
                  </button>
                )}
              </div>

              <pre className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-cyan-400 font-mono text-xs overflow-auto">
                {item.value || "..."}
              </pre>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un Hash Generator?
            </h2>
            <p>
              Un **Hash Generator** permite convertir texto en un identificador
              criptográfico único utilizando algoritmos como **MD5, SHA-1,
              SHA-256 o SHA-512**. Estos hashes se utilizan comúnmente para
              verificar integridad de datos, almacenar contraseñas de forma
              segura y generar identificadores únicos en sistemas distribuidos.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Procesamiento Local
              </h3>
              <p className="text-xs">
                Todo el cálculo de hashes se realiza directamente en tu
                navegador. Ningún texto es enviado a servidores externos,
                manteniendo tu información completamente privada.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Múltiples Algoritmos
              </h3>
              <p className="text-xs">
                Esta herramienta soporta los algoritmos más utilizados por
                desarrolladores: **MD5**, **SHA-1**, **SHA-256** y **SHA-512**,
                permitiendo comparar resultados rápidamente.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
