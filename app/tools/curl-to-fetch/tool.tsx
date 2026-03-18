"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function CurlToFetch() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const parseCurl = (cmd: string) => {
    const normalized = cmd.replace(/\\\n/g, " ").replace(/\s+/g, " ");

    const urlMatch = normalized.match(/curl\s+['"]?([^'"\s]+)['"]?/);
    const methodMatch = normalized.match(/-X\s+(\w+)|--request\s+(\w+)/);

    const headerMatches = [
      ...normalized.matchAll(/(?:-H|--header)\s+['"]([^'"]+)['"]/g),
    ];

    const dataMatch = normalized.match(
      /(?:--data|-d|--data-raw|--data-binary)\s+(.+)/,
    );

    const url = urlMatch ? urlMatch[1] : "";
    const method = methodMatch
      ? (methodMatch[1] || methodMatch[2]).toUpperCase()
      : dataMatch
        ? "POST"
        : "GET";

    const headers: Record<string, string> = {};

    headerMatches.forEach((h) => {
      const [key, value] = h[1].split(": ");
      headers[key] = value;
    });

    let body: string | null = null;

    if (dataMatch) {
      body = dataMatch[1].trim();

      if (
        (body.startsWith("'") && body.endsWith("'")) ||
        (body.startsWith('"') && body.endsWith('"'))
      ) {
        body = body.slice(1, -1);
      }
    }

    return { url, method, headers, body };
  };

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      setStatus({ type: "error", msg: "Ingresa un comando curl válido" });
      return;
    }

    try {
      const { url, method, headers, body } = parseCurl(input);

      let code = `fetch("${url}", {\n`;
      code += `  method: "${method}",\n`;

      if (Object.keys(headers).length) {
        code += `  headers: ${JSON.stringify(headers, null, 2)},\n`;
      }

      if (body) {
        code += `  body: ${body},\n`;
      }

      code += `})\n`;
      code += `.then(res => res.json())\n`;
      code += `.then(data => console.log(data))\n`;
      code += `.catch(err => console.error(err));`;

      setOutput(code);

      setStatus({
        type: "success",
        msg: "Conversión realizada correctamente",
      });
    } catch {
      setOutput("");
      setStatus({
        type: "error",
        msg: "No se pudo interpretar el comando curl",
      });
    }
  };

  const copy = () => {
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
            onClick={convert}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg"
          >
            Convert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] mb-12">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
            Curl Command
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300 resize-none"
            placeholder='curl https://api.example.com/users -H "Authorization: Bearer TOKEN"'
          />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              Fetch Output
            </label>

            {output && (
              <button
                onClick={copy}
                className={`text-[10px] px-2 py-1 rounded ${
                  copied
                    ? "bg-emerald-600 text-white font-bold"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                }`}
              >
                {copied ? "✓ Copiado" : "Copy"}
              </button>
            )}
          </div>

          <pre className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-cyan-400 overflow-auto">
            {output || "// El código fetch aparecerá aquí..."}
          </pre>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es Curl → Fetch?
            </h2>

            <p>
              Esta herramienta convierte comandos **curl** en código **fetch()
              de JavaScript**, permitiendo reutilizar solicitudes HTTP
              directamente en aplicaciones frontend o Node.js.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Uso común en APIs
              </h3>

              <p className="text-xs">
                Muchas documentaciones de APIs muestran ejemplos en curl.
                Convertirlos a fetch permite integrarlos rápidamente en
                aplicaciones web modernas.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Desarrollo JavaScript
              </h3>

              <p className="text-xs">
                Fetch es la API estándar para realizar peticiones HTTP en
                navegadores modernos y frameworks JavaScript.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
