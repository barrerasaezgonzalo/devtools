"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

export default function JwtDebugger() {
  const [input, setInput] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState<"header" | "payload" | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const decodeJwt = (token: string) => {
    if (!token.trim()) {
      setHeader("");
      setPayload("");
      setStatus(null);
      return;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      setStatus({
        type: "error",
        msg: "JWT inválido: debe tener 3 partes separadas por puntos",
      });
      setHeader("");
      setPayload("");
      return;
    }

    try {
      const base64UrlDecode = (str: string) => {
        const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        return decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        );
      };

      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));
      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setStatus({ type: "success", msg: "JWT decodificado correctamente" });
    } catch (err) {
      console.log(err);
      setStatus({
        type: "error",
        msg: "Error al decodificar: formato Base64 no válido",
      });
      setHeader("");
      setPayload("");
    }
  };

  const copyHeader = () => {
    if (!header) return;
    navigator.clipboard.writeText(header);
    setCopied("header");
  };

  const copyPayload = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload);
    setCopied("payload");
  };

  const clear = () => {
    setInput("");
    setHeader("");
    setPayload("");
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px] mb-12">
        <div className="flex flex-col h-full overflow-hidden">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 ml-1 text-rose-400">
            Encoded (JWT)
          </label>
          <textarea
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              setInput(value);
              decodeJwt(value);
            }}
            spellCheck={false}
            className="flex-1 w-full p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:border-rose-500/30 focus:ring-1 focus:ring-rose-500/20 outline-none resize-none font-mono text-sm text-rose-200 transition-all break-all"
            placeholder="Pega tu JWT aquí..."
          />
        </div>

        <div className="flex flex-col h-full gap-4 overflow-hidden">
          <div className="flex-none h-[180px] flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1 text-cyan-400">
                Header (Algorithm & Type)
              </label>
              {header && (
                <button
                  onClick={copyHeader}
                  className={`text-[10px] px-2 py-0.5 rounded transition-all ${
                    copied === "header"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {copied === "header" ? "✓ Copiado" : "Copy"}
                </button>
              )}
            </div>
            <pre
              className={`flex-1 p-4 rounded-xl border border-zinc-800 bg-zinc-900 font-mono text-xs overflow-auto custom-scrollbar transition-all ${
                status?.type === "error"
                  ? "text-red-400 italic"
                  : "text-cyan-400"
              }`}
            >
              {header ||
                (status?.type === "error"
                  ? status.msg
                  : "// Decoded header...")}
            </pre>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1 text-purple-400">
                Payload (Data)
              </label>
              {payload && (
                <button
                  onClick={copyPayload}
                  className={`text-[10px] px-2 py-0.5 rounded transition-all ${
                    copied === "payload"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {copied === "payload" ? "✓ Copiado" : "Copy"}
                </button>
              )}
            </div>
            <pre
              className={`flex-1 p-4 rounded-xl border border-zinc-800 bg-zinc-900 font-mono text-xs overflow-auto custom-scrollbar transition-all ${
                status?.type === "error"
                  ? "text-red-400 italic"
                  : "text-purple-400"
              }`}
            >
              {payload ||
                (status?.type === "error"
                  ? status.msg
                  : "// Decoded payload...")}
            </pre>
          </div>
        </div>
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed">
        Esta herramienta es especialmente útil cuando trabajas con autenticación
        basada en tokens, ya que los JWT suelen venir en un formato compacto
        difícil de leer. Al decodificarlos, puedes inspeccionar fácilmente el
        header, payload y signature, lo que permite verificar información como
        expiración, permisos o datos del usuario. Es ideal para debugging en
        aplicaciones frontend y backend, integración con APIs seguras o análisis
        rápido de tokens durante el desarrollo.
      </p>
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        <div>
          <h3 className="text-zinc-300 font-medium mb-1 text-sm">
            Privacidad y Seguridad
          </h3>
          <p className="text-sm text-zinc-500">
            Todo el procesamiento se realiza localmente en tu navegador. Ningún
            token es enviado a servidores externos, lo que garantiza que tu
            información permanezca privada. Aun así, se recomienda no utilizar
            tokens sensibles en entornos públicos o compartidos.
          </p>
        </div>
        <div>
          <h3 className="text-zinc-300 font-medium mb-1 text-sm">
            Estructura del JWT
          </h3>
          <p className="text-sm text-zinc-500">
            Un JSON Web Token está compuesto por tres partes: header, payload y
            signature. El header define el algoritmo, el payload contiene la
            información (claims) y la signature asegura la integridad del token.
            Nuestra herramienta permite visualizar cada sección de forma clara y
            estructurada.
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-zinc-300 font-semibold mb-2 text-base">
          ¿Cuándo deberías usar un JWT Debugger?
        </h2>
        <p className="text-sm text-zinc-500">
          Utilizar un JWT Debugger es fundamental cuando necesitas analizar
          tokens generados por sistemas de autenticación, verificar fechas de
          expiración o entender qué información está siendo transmitida entre
          servicios. También es útil para detectar errores en la generación de
          tokens, validar integraciones con APIs protegidas o simplemente
          inspeccionar rápidamente el contenido de un JWT durante el desarrollo.
        </p>
      </section>
      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un JWT y por qué inspeccionarlo?
            </h2>
            <p>
              JSON Web Token (JWT) es un estándar abierto basado en JSON para la
              creación de tokens de acceso. Nuestro depurador te permite
              decodificar la información contenida en el Header y el Payload de
              forma instantánea para verificar claims, fechas de expiración
              (exp) y algoritmos utilizados.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Privacidad Crítica
              </h3>
              <p className="text-xs">
                Los tokens suelen contener información sensible. En
                **devtools.cl**, el proceso de decodificación ocurre 100% en tu
                navegador, asegurando que tu secreto o tus datos no se filtren a
                través de la red.
              </p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Nota sobre la Firma
              </h3>
              <p className="text-xs">
                Esta herramienta se enfoca en la decodificación de datos
                legibles. Para verificar la integridad de la firma (Signature),
                necesitarías proporcionar la clave secreta o pública
                correspondiente.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
