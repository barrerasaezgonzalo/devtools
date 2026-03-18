"use client";

import { tools } from "../lib/tools";
import { usePathname } from "next/navigation";
import { Tool } from "../types";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 text-xl bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-black group-hover:bg-cyan-400 transition-colors">
            dt
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            devtools<span className="text-cyan-500">.cl</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-8 custom-scrollbar">
        <div>
          <h3 className="px-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">
            Utilidades Disponibles
          </h3>

          <div className="space-y-1">
            {tools.map((tool: Tool) => {
              const isActive = pathname === `/tools/${tool.slug}`;

              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className={`
                    group flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200
                    ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent"
                    }
                  `}
                >
                  <span className="truncate">{tool.name}</span>

                  {!isActive && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-zinc-600">
                      →
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 bg-zinc-900/30 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/barrerasaezgonzalo/devtools"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Repository
          </Link>
        </div>
      </div>
    </aside>
  );
}
