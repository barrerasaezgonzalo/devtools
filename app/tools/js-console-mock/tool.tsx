"use client";

import { ToolStatus } from "@/app/types";
import { useState } from "react";

export default function JsRunner() {
  const [code, setCode] = useState<string>(
    "const data = [1, 2, 3];\nconsole.log('Original:', data);\n\nconst doubled = data.map(n => n * 2);\nconsole.log('Doubled:', doubled);",
  );
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<ToolStatus | null>(null);

  const runCode = () => {
    setLogs([]);
    setStatus(null);

    const capturedLogs: string[] = [];

    const formatArgs = (args: unknown[]) =>
      args
        .map((arg) => {
          if (typeof arg === "object" && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return "[Object]";
            }
          }
          return String(arg);
        })
        .join(" ");

    const customConsole = {
      log: (...args: unknown[]) => {
        capturedLogs.push(formatArgs(args));
      },
      error: (...args: unknown[]) => {
        capturedLogs.push(`Error: ${formatArgs(args)}`);
      },
    };

    try {
      const execute = new Function("console", code) as (
        console: typeof customConsole,
      ) => void;
      execute(customConsole);

      setLogs(capturedLogs);
      setStatus({ type: "success", msg: "Código ejecutado" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);

      setLogs([...capturedLogs, `Runtime Error: ${errorMessage}`]);
      setStatus({ type: "error", msg: "Error en la ejecución" });
    }
  };

  const clear = () => {
    setCode("");
    setLogs([]);
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
          <button
            onClick={runCode}
            className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)]"
          >
            Run Script
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px] mb-12">
        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1 text-yellow-500">
            Editor JavaScript
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 custom-scrollbar w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 outline-none resize-none font-mono text-sm text-zinc-300 transition-all"
            placeholder="// Escribe tu código JS aquí..."
          />
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1 text-yellow-500">
            Consola de Salida
          </label>
          <div className="flex-1 bg-black border border-zinc-800 rounded-xl overflow-auto custom-scrollbar p-4 font-mono text-sm">
            {logs.length > 0 ? (
              logs.map((log, i) => (
                <div
                  key={i}
                  className={`mb-1 ${log.startsWith("Error") || log.startsWith("Runtime") ? "text-red-400" : "text-zinc-300"}`}
                >
                  <span className="text-zinc-600 mr-2">{">"}</span>
                  {log}
                </div>
              ))
            ) : (
              <span className="text-zinc-700 italic">
                {"// El resultado de console.log() aparecerá aquí"}
              </span>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Cómo funciona este entorno?
            </h2>
            <p>
              Este runner ejecuta tu código JavaScript directamente en el motor
              de tu navegador. Hemos interceptado el objeto `console` para
              mostrarte los resultados de manera visual sin necesidad de abrir
              las herramientas de sistema.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Sandbox Seguro
              </h3>
              <p className="text-xs">
                El código corre en el contexto de tu sesión actual. No enviamos
                el script a ningún servidor, lo que garantiza privacidad total
                en tus pruebas de lógica.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Limitaciones
              </h3>
              <p className="text-xs">
                Al ser una ejecución síncrona, procesos muy pesados podrían
                congelar la pestaña momentáneamente. Recomendado para pruebas de
                algoritmos y manipulación de datos.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
