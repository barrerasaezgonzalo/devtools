"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function SqlFormatter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const formatSql = (sql: string) => {
    if (!sql.trim()) {
      setOutput("");
      setStatus(null);
      return;
    }

    try {
      const keywords = [
        "INSERT INTO",
        "LEFT JOIN",
        "RIGHT JOIN",
        "INNER JOIN",
        "GROUP BY",
        "ORDER BY",
        "SELECT",
        "FROM",
        "WHERE",
        "JOIN",
        "HAVING",
        "UPDATE",
        "DELETE",
        "VALUES",
        "LIMIT",
        "SET",
        "AND",
        "OR",
        "ON",
        "AS",
        "IN",
      ];

      let formatted = sql.replace(/\s+/g, " ").trim();

      keywords.forEach((key) => {
        const regex = new RegExp(`\\b${key.replace(/\s+/g, "\\s+")}\\b`, "gi");
        formatted = formatted.replace(regex, `\n${key.toUpperCase()}`);
      });

      const finalSql = formatted
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n");

      setOutput(finalSql);
      setStatus({ type: "success", msg: "SQL formateado correctamente" });
    } catch (err) {
      console.log(err);
      setStatus({ type: "error", msg: "Error al procesar la consulta SQL" });
    }
  };

  useEffect(() => {
    formatSql(input);
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
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Input SQL
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none resize-none font-mono text-sm text-zinc-300 transition-all"
            placeholder="SELECT * FROM users WHERE id = 1..."
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-2 h-4">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
              SQL Formateado
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
            <pre
              className={`w-full h-full p-4 rounded-xl border font-mono text-sm overflow-auto custom-scrollbar transition-all whitespace-pre-wrap ${
                status?.type === "error"
                  ? "bg-red-500/5 border-red-500/20 text-red-400 italic"
                  : "bg-zinc-900 border-zinc-800 text-cyan-400"
              }`}
            >
              {output ||
                (status?.type === "error"
                  ? status.msg
                  : "// El SQL embellecido aparecerá aquí...")}
            </pre>
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Por qué formatear tus consultas SQL?
            </h2>
            <p>
              En el desarrollo de software, las consultas SQL pueden volverse
              complejas y difíciles de leer rápidamente. Un buen formateo ayuda
              a identificar errores de lógica, nombres de columnas y condiciones
              de filtrado de manera inmediata, mejorando la colaboración y el
              mantenimiento del código.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Privacidad de Datos
              </h3>
              <p className="text-xs">
                Tus consultas pueden contener nombres de tablas o estructuras
                sensibles. Al procesarse localmente en tu navegador,
                garantizamos que tu esquema de base de datos nunca salga de tu
                equipo.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Estandarización
              </h3>
              <p className="text-xs">
                Nuestra herramienta normaliza las palabras clave en mayúsculas y
                organiza las cláusulas principales en nuevas líneas, siguiendo
                las mejores prácticas de legibilidad en SQL.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
