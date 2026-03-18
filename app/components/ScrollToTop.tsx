"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="cursor-pointer fixed bottom-6 right-6 z-50 w-12 h-12 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full flex items-center justify-center shadow-lg transition-all"
    >
      ↑
    </button>
  );
}
