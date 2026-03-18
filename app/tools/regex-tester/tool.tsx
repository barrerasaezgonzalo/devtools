"use client";

import { ToolStatus } from "@/app/types";
import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>("");
  const [flags, setFlags] = useState<string>("g");
  const [text, setText] = useState<string>("");
  const [matches, setMatches] = useState<any[]>([]);
  const [highlighted, setHighlighted] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);

  const escapeHtml = (str: string) =>
    str.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[m]!,
    );

  const testRegex = () => {
    if (!pattern.trim()) {
      setMatches([]);
      setHighlighted("");
      setStatus({ type: "error", msg: "Ingresa una expresión regular" });
      return;
    }

    try {
      const regex = new RegExp(
        pattern,
        flags.includes("g") ? flags : flags + "g",
      );
      const results = [];
      let match;
      let lastIndex = 0;
      let output = "";

      while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        output += escapeHtml(text.slice(lastIndex, start));
        output += `<mark class="bg-cyan-500/30 text-cyan-300 px-0.5 rounded">${escapeHtml(match[0])}</mark>`;
        lastIndex = end;

        results.push({
          value: match[0],
          index: start,
          groups: match.slice(1),
        });

        if (match[0].length === 0) regex.lastIndex++;
      }

      output += escapeHtml(text.slice(lastIndex));

      setHighlighted(output);
      setMatches(results);

      setStatus({
        type: "success",
        msg: `${results.length} coincidencia${results.length === 1 ? "" : "s"} encontrada${results.length === 1 ? "" : "s"}`,
      });
    } catch {
      setMatches([]);
      setHighlighted("");
      setStatus({ type: "error", msg: "Expresión regular inválida" });
    }
  };

  const clear = () => {
    setPattern("");
    setText("");
    setMatches([]);
    setHighlighted("");
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
            className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Clear
          </button>

          <button
            onClick={testRegex}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Test Regex
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="Expresión regular (ej: \\d+)"
          className="flex-1 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-sm outline-none focus:border-cyan-500"
        />

        <input
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="flags (g, i, m...)"
          className="w-28 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-sm outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] mb-12">
        <div className="flex flex-col h-full">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Text
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 outline-none resize-none font-mono text-sm text-zinc-300"
            placeholder="Texto donde probar la expresión regular..."
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
            Highlighted Matches
          </label>

          <div
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 overflow-auto font-mono text-sm text-zinc-300 custom-scrollbar whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html:
                highlighted ||
                `<span class="text-zinc-600">// Las coincidencias aparecerán aquí...</span>`,
            }}
          />
        </div>
      </div>

      {matches.length > 0 && (
        <div className="mb-12">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 ml-1 block">
            Matches
          </label>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden text-sm font-mono">
            {matches.map((m, i) => (
              <div
                key={i}
                className="border-b border-zinc-800 p-3 text-cyan-400"
              >
                <div className="text-xs text-zinc-500 mb-1">
                  Match {i + 1} • index {m.index}
                </div>

                <div>{m.value}</div>

                {m.groups.length > 0 && (
                  <div className="mt-2 text-xs text-zinc-400 space-y-1">
                    {m.groups.map((g: string, gi: number) => (
                      <div key={gi}>
                        Group {gi + 1}:{" "}
                        <span className="text-cyan-300">{g}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un Regex Tester?
            </h2>

            <p>
              Un **Regex Tester** permite probar expresiones regulares contra
              texto para verificar coincidencias y validar patrones. Las
              expresiones regulares son utilizadas ampliamente para búsqueda de
              texto, validación de datos y procesamiento de strings en muchos
              lenguajes de programación.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Resaltado de Coincidencias
              </h3>

              <p className="text-xs">
                Visualiza directamente dentro del texto todas las coincidencias
                encontradas por la expresión regular, facilitando el debugging
                de patrones complejos.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Grupos Capturados
              </h3>

              <p className="text-xs">
                Esta herramienta también muestra los grupos capturados de cada
                coincidencia, permitiendo analizar cómo se comportan las
                subexpresiones dentro del patrón.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
