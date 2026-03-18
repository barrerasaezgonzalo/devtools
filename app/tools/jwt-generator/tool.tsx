"use client";

import { ToolStatus } from "@/app/types";
import { useState, useEffect } from "react";

function base64url(input: string) {
  return btoa(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function sign(data: string, secret: string) {
  const enc = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));

  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export default function JwtGenerator() {
  const [header, setHeader] = useState(
    `{
  "alg": "HS256",
  "typ": "JWT"
}`,
  );

  const [payload, setPayload] = useState(
    `{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`,
  );

  const [secret, setSecret] = useState("my-secret");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<ToolStatus | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  const generate = async () => {
    try {
      const parsedHeader = JSON.parse(header);
      const parsedPayload = JSON.parse(payload);

      const encodedHeader = base64url(JSON.stringify(parsedHeader));
      const encodedPayload = base64url(JSON.stringify(parsedPayload));

      const data = `${encodedHeader}.${encodedPayload}`;

      const signature = await sign(data, secret);

      const jwt = `${data}.${signature}`;

      setToken(jwt);

      setStatus({
        type: "success",
        msg: "JWT generado correctamente",
      });
    } catch {
      setToken("");

      setStatus({
        type: "error",
        msg: "Header o Payload inválido",
      });
    }
  };

  const clear = () => {
    setToken("");
    setStatus(null);
  };

  const copy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
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
            className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
          >
            Clear
          </button>

          <button
            onClick={generate}
            className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-lg"
          >
            Generate JWT
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12 h-[450px]">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
            Header
          </label>

          <textarea
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">
            Payload
          </label>

          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">
          Secret
        </label>

        <input
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300"
        />
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Generated JWT
          </label>

          {token && (
            <button
              onClick={copy}
              className={`text-[10px] px-2 py-1 rounded ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
              }`}
            >
              {copied ? "✓ Copiado" : "Copy"}
            </button>
          )}
        </div>

        <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm text-cyan-400 overflow-auto">
          {token || "// El JWT generado aparecerá aquí..."}
        </pre>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-900 pb-10">
        <div className="max-w-3xl space-y-8 text-zinc-500 text-sm leading-relaxed">
          <section>
            <h2 className="text-zinc-300 font-semibold mb-2 text-base">
              ¿Qué es un JWT Generator?
            </h2>

            <p>
              Un **JWT Generator** permite crear **JSON Web Tokens** a partir de
              un header, payload y una clave secreta. Los JWT se utilizan
              ampliamente en autenticación de APIs, OAuth y sistemas de
              autorización modernos.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Uso en APIs
              </h3>

              <p className="text-xs">
                Los JWT permiten transmitir información segura entre cliente y
                servidor utilizando tokens firmados digitalmente.
              </p>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-1 text-sm">
                Generación local
              </h3>

              <p className="text-xs">
                Esta herramienta genera los tokens completamente en tu navegador
                sin enviar información a servidores externos.
              </p>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
