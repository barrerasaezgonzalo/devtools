import { ToolCardProps } from "../types";

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <a
      href={`/tools/${tool.slug}`}
      className="group relative p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between min-h-[140px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:bg-zinc-700 group-hover:border-cyan-500/50 transition-colors">
            <svg
              className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
        </div>

        <h3 className="font-semibold text-zinc-100  mb-1">{tool.name}</h3>

        <p className="text-xs leading-relaxed text-zinc-400 group-hover:text-zinc-400 line-clamp-2">
          {tool.description}
        </p>
      </div>

      <div className="mt-4 flex items-center text-[11px] font-medium text-cyan-500/0 group-hover:text-cyan-500/80 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
        Usar herramienta <span className="ml-1">→</span>
      </div>
    </a>
  );
}
