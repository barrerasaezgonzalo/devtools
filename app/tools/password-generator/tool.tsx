"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect, useCallback } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = useCallback(() => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charPool = lowercase;
    if (includeUppercase) charPool += uppercase;
    if (includeNumbers) charPool += numbers;
    if (includeSymbols) charPool += symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex =
        crypto.getRandomValues(new Uint32Array(1))[0] % charPool.length;
      generatedPassword += charPool[randomIndex];
    }

    setPassword(generatedPassword);
    setStatus({ type: "success", msg: "Contraseña generada con éxito" });
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    // eslint-disable-next-line
    generatePassword();
  }, [generatePassword]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  const getStrength = (pwd: string) => {
    let score = 0;

    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1)
      return { label: "Débil", color: "text-red-400", bar: "bg-red-500" };
    if (score === 2)
      return { label: "Media", color: "text-yellow-400", bar: "bg-yellow-500" };
    if (score >= 3)
      return {
        label: "Fuerte",
        color: "text-emerald-400",
        bar: "bg-emerald-500",
      };

    return { label: "Débil", color: "text-red-400", bar: "bg-red-500" };
  };
  const strength = getStrength(password);

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
          onClick={generatePassword}
          className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          Regenerar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px] mb-12">
        <div className="flex flex-col h-full bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                Longitud: {length}
              </label>
            </div>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              Opciones
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
              <span className="text-sm text-zinc-300">Mayúsculas (A-Z)</span>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-cyan-500 focus:ring-cyan-500/20"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
              <span className="text-sm text-zinc-300">Números (0-9)</span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-cyan-500 focus:ring-cyan-500/20"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
              <span className="text-sm text-zinc-300">Símbolos (!@#$)</span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-cyan-500 focus:ring-cyan-500/20"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-2 h-4">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Contraseña Generada
            </label>
            {password && (
              <button
                onClick={copyToClipboard}
                className={`text-[10px] px-2 py-1 rounded transition-all ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {copied ? "✓ Copiado" : "Copy to clipboard"}
              </button>
            )}
          </div>
          <div className="relative flex-1 group">
            <div className="w-full h-full p-8 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden">
              <span className="font-mono text-2xl md:text-3xl text-cyan-400 break-all text-center select-all">
                {password}
              </span>
            </div>
            <div
              className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-colors ${password ? "bg-cyan-500 shadow-[0_0_10px_#06b6d4]" : "bg-zinc-800"}`}
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              <span>Seguridad</span>
              <span className={strength.color}>{strength.label}</span>
            </div>

            <div className="w-full h-1.5 bg-zinc-800 rounded">
              <div
                className={`h-1.5 rounded transition-all ${strength.bar}`}
                style={{
                  width:
                    strength.label === "Débil"
                      ? "33%"
                      : strength.label === "Media"
                        ? "66%"
                        : "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Por qué usar un generador de contraseñas aleatorias?
            </h2>
            <p>
              La seguridad en línea comienza con contraseñas fuertes y únicas.
              El uso de caracteres aleatorios, combinando mayúsculas, números y
              símbolos, hace que sea prácticamente imposible para los ataques de
              fuerza bruta descifrar tus credenciales. Nuestra herramienta te
              permite personalizar la complejidad según tus necesidades.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Privacidad Total
              </h3>
              <p className="text-xs">
                Generamos las contraseñas localmente en tu navegador. Ninguna
                clave generada viaja por internet ni se almacena en nuestros
                servidores.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Entropía y Seguridad
              </h3>
              <p className="text-xs">
                Recomendamos una longitud mínima de 12 a 16 caracteres para
                asegurar una alta entropía, protegiendo tus cuentas contra los
                métodos modernos de hacking.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
