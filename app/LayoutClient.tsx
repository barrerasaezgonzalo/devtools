"use client";

import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div
        className={`
                    fixed top-0 left-0 h-full w-64 z-50 bg-zinc-950 border-r border-zinc-900
                    transition-transform duration-200
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                    `}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <div className="lg:hidden w-full px-4 pt-4 flex justify-start">
          <button
            onClick={() => setOpen(true)}
            className="text-zinc-300 text-xl"
          >
            ☰
          </button>
        </div>

        <main className="flex-1 p-6 lg:p-12 w-full max-w-7xl mx-auto">
          {children}
          <Analytics />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
