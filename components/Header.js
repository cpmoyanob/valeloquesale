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
        <nav className="flex items-center gap-5 text-sm font-medium text-muted">
          <Link href="/" className="hover:text-text">Lo que vale</Link>
          <Link href="/vendedores" className="hover:text-text">Vendedores</Link>
        </nav>
      </div>
    </header>
  );
}
