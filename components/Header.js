import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-0.5">
          <span className="text-xl font-extrabold tracking-tight">{BRAND.wordmark.a}</span>
          <span className="text-xl font-light tracking-tight text-muted">{BRAND.wordmark.b}</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-5 text-sm font-medium text-muted">
          <Link href="/" className="hover:text-text hidden sm:inline">Lo que vale</Link>
          <Link href="/vendedores" className="hover:text-text hidden sm:inline">Vendedores</Link>
          <Link href="/sugerir" className="rounded-lg bg-text text-white px-3 py-1.5 hover:opacity-90">
            Sugerir producto
          </Link>
        </nav>
      </div>
    </header>
  );
}
