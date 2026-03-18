"use client";

import { useState, useEffect } from "react";

export default function CronEditor() {
  const [cron, setCron] = useState({
    m: "*",
    h: "*",
    dom: "*",
    mon: "*",
    dow: "*",
  });
  const [humanText, setHumanText] = useState("");
  const [copied, setCopied] = useState(false);

  const fullExpression = `${cron.m} ${cron.h} ${cron.dom} ${cron.mon} ${cron.dow}`;

  const describeField = (value: string, unit: string) => {
    if (value === "*") return `cada ${unit}`;

    if (value.startsWith("*/")) {
      return `cada ${value.slice(2)} ${unit}s`;
    }

    if (value.includes("-")) {
      const [start, end] = value.split("-");
      return `desde ${start} hasta ${end} (${unit}s)`;
    }

    if (value.includes(",")) {
      return `${unit}s ${value.split(",").join(", ")}`;
    }

    return `${unit} ${value}`;
  };

  const translateCron = () => {
    const { m, h, dom, mon, dow } = cron;

    if (m === "*" && h === "*" && dom === "*" && mon === "*" && dow === "*") {
      setHumanText("Se ejecuta cada minuto.");
      return;
    }

    let description = "Se ejecuta ";

    const minutePart = describeField(m, "minuto");
    const hourPart = describeField(h, "hora");

    description += `${minutePart} de ${hourPart}`;

    if (dom !== "*") description += ` el día ${dom}`;
    if (mon !== "*") description += ` del mes ${mon}`;
    if (dow !== "*") description += ` los días ${dow} de la semana`;

    description += ".";

    setHumanText(description);
  };

  const isValidCron = (value: string, min: number, max: number) => {
    if (value === "*") return true;

    if (/^\*\/\d+$/.test(value)) return true;

    if (/^\d+$/.test(value)) {
      const n = Number(value);
      return n >= min && n <= max;
    }

    if (/^\d+-\d+$/.test(value)) {
      const [start, end] = value.split("-").map(Number);
      return start >= min && end <= max;
    }

    if (/^\d+(,\d+)+$/.test(value)) return true;

    return false;
  };

  useEffect(() => {
    if (!isValidCron(cron.m, 0, 59)) {
      setHumanText("Minuto inválido (0-59)");
      return;
    }

    if (!isValidCron(cron.h, 0, 23)) {
      setHumanText("Hora inválida (0-23)");
      return;
    }

    if (!isValidCron(cron.dom, 1, 31)) {
      setHumanText("Día del mes inválido (1-31)");
      return;
    }

    if (!isValidCron(cron.mon, 1, 12)) {
      setHumanText("Mes inválido (1-12)");
      return;
    }

    if (!isValidCron(cron.dow, 0, 7)) {
      setHumanText("Día de semana inválido (0-7)");
      return;
    }

    translateCron();
  }, [cron]);

  const handlePreset = (preset: string) => {
    const parts = preset.split(" ");
    setCron({
      m: parts[0],
      h: parts[1],
      dom: parts[2],
      mon: parts[3],
      dow: parts[4],
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
        <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
          Configurador de Tareas
        </h2>
        <div className="flex gap-2">
          {[
            { label: "Cada Minuto", val: "* * * * *" },
            { label: "Cada Hora", val: "0 * * * *" },
            { label: "Medianoche", val: "0 0 * * *" },
          ].map((p) => (
            <button
              key={p.label}
              onClick={() => handlePreset(p.val)}
              className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {[
          { id: "m", label: "Minuto", placeholder: "0-59" },
          { id: "h", label: "Hora", placeholder: "0-23" },
          { id: "dom", label: "Día (Mes)", placeholder: "1-31" },
          { id: "mon", label: "Mes", placeholder: "1-12" },
          { id: "dow", label: "Día (Semana)", placeholder: "0-6" },
        ].map((field) => (
          <div key={field.id} className="flex flex-col">
            <label className="text-[10px] uppercase text-zinc-500 font-bold mb-2 ml-1">
              {field.label}
            </label>
            <input
              type="text"
              value={cron[field.id as keyof typeof cron]}
              onChange={(e) => setCron({ ...cron, [field.id]: e.target.value })}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center font-mono text-xl text-cyan-400 outline-none focus:border-cyan-500/50 transition-all"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              Expresión Generada
            </span>
            <div className="font-mono text-3xl text-zinc-100 tracking-tighter">
              {fullExpression}
            </div>
            <p className="text-emerald-400 text-sm italic">“{humanText}”</p>
          </div>
          <button
            onClick={copyToClipboard}
            className={`px-8 py-4 rounded-xl font-bold transition-all ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            }`}
          >
            {copied ? "✓ Copiado" : "Copiar Cron Expression"}
          </button>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es una expresión Cron?
            </h2>
            <p>
              Una expresión **Cron** es una cadena de texto utilizada para
              programar tareas automáticas en sistemas Unix, servidores Linux y
              plataformas de automatización. Define cuándo debe ejecutarse un
              proceso mediante cinco campos que representan minuto, hora, día
              del mes, mes y día de la semana. Con este editor puedes generar
              expresiones Cron rápidamente y entender su significado en lenguaje
              humano.
            </p>
          </section>
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Sintaxis Crontab
              </h3>
              <p className="text-xs">
                {/* eslint-disable-next-line */}
                El formato estándar utiliza cinco campos: Minuto, Hora, Día del
                mes, Mes y Día de la semana. El asterisco (*) significa "todos".
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Consejo de Pro
              </h3>
              <p className="text-xs">
                Para el día de la semana, 0 y 7 suelen representar el Domingo.
                Asegúrate de verificar la zona horaria de tu servidor antes de
                programar tareas críticas.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
