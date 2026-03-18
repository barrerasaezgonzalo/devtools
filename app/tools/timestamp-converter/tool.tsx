"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [utc, setUtc] = useState<string>("");
  const [local, setLocal] = useState<string>("");
  const [unix, setUnix] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const fromTimestamp = () => {
    if (!timestamp.trim()) {
      setStatus({ type: "error", msg: "Ingresa un timestamp válido" });
      return;
    }

    try {
      const ts = Number(timestamp) * 1000;
      const date = new Date(ts);

      if (isNaN(date.getTime())) throw new Error();

      setUtc(date.toUTCString());
      setLocal(date.toString());
      setStatus({ type: "success", msg: "Conversión realizada correctamente" });
    } catch {
      setUtc("");
      setLocal("");
      setStatus({ type: "error", msg: "Timestamp inválido" });
    }
  };

  const fromDate = () => {
    if (!dateInput) {
      setStatus({ type: "error", msg: "Selecciona una fecha válida" });
      return;
    }

    const date = new Date(dateInput);
    const ts = Math.floor(date.getTime() / 1000);

    setUnix(String(ts));
    setStatus({ type: "success", msg: "Timestamp generado correctamente" });
  };

  const copy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
  };

  const clear = () => {
    setTimestamp("");
    setDateInput("");
    setUtc("");
    setLocal("");
    setUnix("");
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Unix Timestamp
          </label>

          <input
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1710672000"
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-sm"
          />

          <button
            onClick={fromTimestamp}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg"
          >
            Convert to Date
          </button>

          {utc && (
            <div className="space-y-2">
              <div className="text-xs text-zinc-500">UTC</div>
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded p-3 font-mono text-sm text-cyan-400">
                {utc}
                <button
                  onClick={() => copy(utc, "utc")}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  {copied === "utc" ? "✓" : "Copy"}
                </button>
              </div>

              <div className="text-xs text-zinc-500">Local</div>
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded p-3 font-mono text-sm text-cyan-400">
                {local}
                <button
                  onClick={() => copy(local, "local")}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  {copied === "local" ? "✓" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Date → Unix Timestamp
          </label>

          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-sm"
          />

          <button
            onClick={fromDate}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg"
          >
            Convert to Timestamp
          </button>

          {unix && (
            <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded p-3 font-mono text-sm text-cyan-400">
              {unix}
              <button
                onClick={() => copy(unix, "unix")}
                className="text-xs text-zinc-400 hover:text-white"
              >
                {copied === "unix" ? "✓" : "Copy"}
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un Unix Timestamp?
            </h2>

            <p>
              Un **Unix Timestamp** representa la cantidad de segundos que han
              pasado desde el 1 de enero de 1970 a las 00:00:00 UTC, conocido
              como el **Unix Epoch**. Es una forma estándar de representar
              fechas utilizada en sistemas operativos, bases de datos y APIs.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Uso común en desarrollo
              </h3>

              <p className="text-xs">
                Los timestamps Unix se utilizan en logs, tokens, bases de datos,
                APIs y sistemas distribuidos para almacenar fechas de manera
                eficiente e independiente del huso horario.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Conversión rápida
              </h3>

              <p className="text-xs">
                Esta herramienta permite convertir timestamps a fechas legibles
                y generar timestamps desde una fecha específica de forma
                instantánea.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
