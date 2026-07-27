import { BRAND } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted">
        <p className="font-semibold text-text">{BRAND.name}</p>
        <p className="mt-1 max-w-md">{BRAND.claim}</p>
        <p className="mt-4 text-xs">
          {BRAND.name} participa del programa de afiliados de {BRAND.ml.label}. Al comprar
          desde nuestros links podemos ganar una comisión, sin costo extra para vos.
        </p>
      </div>
    </footer>
  );
}
