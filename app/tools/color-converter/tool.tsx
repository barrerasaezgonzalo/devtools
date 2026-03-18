"use client";

import { ToolStatus } from "@/app/types";
import { useState } from "react";

export default function ColorConverter() {
  const [hex, setHex] = useState<string>("#06b6d4");
  const [rgb, setRgb] = useState<string>("rgb(6, 182, 212)");
  const [hsl, setHsl] = useState<string>("hsl(189, 95%, 43%)");
  const [cmyk, setCmyk] = useState<string>("cmyk(97%, 14%, 0%, 17%)");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - r / 255,
      m = 1 - g / 255,
      y = 1 - b / 255,
      k = Math.min(c, m, y);
    if (k === 1) return "cmyk(0%, 0%, 0%, 100%)";
    c = Math.round(((c - k) / (1 - k)) * 100);
    m = Math.round(((m - k) / (1 - k)) * 100);
    y = Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);
    return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
  };

  const handleHexChange = (value: string) => {
    const cleanHex = value.startsWith("#") ? value : `#${value}`;
    setHex(cleanHex);
    if (/^#[0-9A-F]{6}$/i.test(cleanHex)) {
      const { r, g, b } = hexToRgb(cleanHex);
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHsl(rgbToHsl(r, g, b));
      setCmyk(rgbToCmyk(r, g, b));
      setStatus(null);
    } else {
      setStatus({ type: "error", msg: "HEX inválido" });
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div className="flex-1">
          {status?.type === "error" && (
            <div className="text-xs flex items-center gap-2 text-red-400 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {status.msg}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="flex flex-col space-y-6">
          <div
            className="w-full h-64 rounded-3xl shadow-2xl transition-all border border-white/10"
            style={{ backgroundColor: hex }}
          />

          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
              HEX Actual
            </label>
            <div className="flex gap-2">
              <input
                readOnly
                value={hex.toUpperCase()}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 font-mono text-zinc-200 outline-none"
              />
              <button
                onClick={() => copyToClipboard(hex, "HEX_PREVIEW")}
                className={`px-4 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  copiedField === "HEX_PREVIEW"
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {copiedField === "HEX_PREVIEW" ? "Copiado" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
              Selector / Editar HEX
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 cursor-pointer overflow-hidden"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 font-mono text-cyan-400 outline-none focus:border-cyan-500/50 uppercase"
              />
            </div>
          </div>

          {[
            { label: "RGB", value: rgb },
            { label: "HSL", value: hsl },
            { label: "CMYK", value: cmyk },
          ].map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1">
                {field.label}
              </label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={field.value}
                  className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 font-mono text-sm text-zinc-400 outline-none"
                />
                <button
                  onClick={() => copyToClipboard(field.value, field.label)}
                  className={`px-4 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    copiedField === field.label
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {copiedField === field.label ? "Copiado" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un convertidor de colores?
            </h2>
            <p>
              Los distintos sistemas de color se utilizan según el contexto:
              **HEX y RGB** son comunes en desarrollo web y aplicaciones
              digitales, **HSL** facilita el ajuste de tono, saturación y
              luminosidad para diseño de interfaces, mientras que **CMYK** se
              utiliza principalmente en impresión. Esta herramienta permite
              convertir entre estos formatos de manera inmediata para mantener
              consistencia visual entre distintos medios.
            </p>
          </section>
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Espacios de Color
              </h3>
              <p className="text-xs">
                Convierte instantáneamente entre formatos digitales y de
                impresión. Ideal para mantener la consistencia cromática en
                diferentes medios.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Precisión
              </h3>
              <p className="text-xs">
                Algoritmos estándar para el mapeo de coordenadas cromáticas,
                asegurando que el color se mantenga fiel en todas las
                conversiones.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
