"use client";

import { ToolStatus } from "@/app/types";
import { useState } from "react";

type DiffItem = {
  path: string;
  type: "added" | "removed" | "changed";
  before?: any;
  after?: any;
};

export default function JsonDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diff, setDiff] = useState<DiffItem[]>([]);
  const [status, setStatus] = useState<ToolStatus | null>(null);

  const compare = () => {
    try {
      const a = JSON.parse(left);
      const b = JSON.parse(right);

      const result: DiffItem[] = [];

      const walk = (obj1: any, obj2: any, path = "") => {
        const keys = new Set([
          ...Object.keys(obj1 || {}),
          ...Object.keys(obj2 || {}),
        ]);

        keys.forEach((key) => {
          const newPath = path ? `${path}.${key}` : key;

          if (!(key in obj1)) {
            result.push({ path: newPath, type: "added", after: obj2[key] });
          } else if (!(key in obj2)) {
            result.push({ path: newPath, type: "removed", before: obj1[key] });
          } else if (
            typeof obj1[key] === "object" &&
            typeof obj2[key] === "object"
          ) {
            walk(obj1[key], obj2[key], newPath);
          } else if (obj1[key] !== obj2[key]) {
            result.push({
              path: newPath,
              type: "changed",
              before: obj1[key],
              after: obj2[key],
            });
          }
        });
      };

      walk(a, b);

      setDiff(result);

      setStatus({
        type: "success",
        msg: `${result.length} diferencia${result.length === 1 ? "" : "s"} encontrada${result.length === 1 ? "" : "s"}`,
      });
    } catch {
      setDiff([]);
      setStatus({ type: "error", msg: "JSON inválido" });
    }
  };

  const clear = () => {
    setLeft("");
    setRight("");
    setDiff([]);
    setStatus(null);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-full">
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
            onClick={compare}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg"
          >
            Compare
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[450px] mb-12">
        <div className="flex flex-col h-full">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
            JSON A
          </label>

          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300 resize-none"
            placeholder='{ "name": "api", "version": 1 }'
          />
        </div>

        <div className="flex flex-col h-full">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
            JSON B
          </label>

          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300 resize-none"
            placeholder='{ "name": "api", "version": 2 }'
          />
        </div>
      </div>

      <div className="mb-12">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">
          Differences
        </label>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden font-mono text-sm">
          {diff.length === 0 && (
            <div className="p-4 text-zinc-500">
              // Las diferencias aparecerán aquí...
            </div>
          )}

          {diff.map((d, i) => (
            <div key={i} className="border-b border-zinc-800 p-3">
              <div className="text-xs text-zinc-500 mb-1">{d.path}</div>

              {d.type === "added" && (
                <div className="text-emerald-400">
                  + {JSON.stringify(d.after)}
                </div>
              )}

              {d.type === "removed" && (
                <div className="text-red-400">- {JSON.stringify(d.before)}</div>
              )}

              {d.type === "changed" && (
                <div className="space-y-1">
                  <div className="text-red-400">
                    - {JSON.stringify(d.before)}
                  </div>
                  <div className="text-emerald-400">
                    + {JSON.stringify(d.after)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es JSON Diff?
            </h2>

            <p>
              **JSON Diff** permite comparar dos objetos JSON y detectar las
              diferencias entre ellos. Esta herramienta es útil para analizar
              cambios en respuestas de APIs, configuraciones o estructuras de
              datos.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Debugging de APIs
              </h3>

              <p className="text-xs">
                Comparar respuestas JSON permite identificar rápidamente cambios
                en versiones de APIs o diferencias entre entornos.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Análisis de configuraciones
              </h3>

              <p className="text-xs">
                También es útil para revisar diferencias entre archivos de
                configuración o estructuras de datos complejas.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
