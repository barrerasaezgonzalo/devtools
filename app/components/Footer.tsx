import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto p-10 border-t border-zinc-900 text-center text-zinc-300 text-xs flex flex-col gap-2">
      <p>
        <Link href="/about">About </Link>|
        <Link href="/privacy"> Privacy policy | </Link>
        <Link href="/terms">Terms | </Link>
        <Link href="/contact">Contact</Link>
      </p>
      <p>
        © 2026 devtools.cl — Herramientas de código abierto para la comunidad.
      </p>
    </footer>
  );
}
