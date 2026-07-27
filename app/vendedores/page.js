import Link from "next/link";
import { getVendedores } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "Vendedores que cumplen",
  description: "Los vendedores de Mercado Libre que recomendamos: entregan, responden y cumplen.",
};

export default async function VendedoresPage() {
  const vendedores = await getVendedores();
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-extrabold tracking-tight">🛡️ Vendedores que cumplen</h1>
      <p className="text-sm text-muted mt-1">Los que entregan, responden y no te dejan a pie.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {vendedores.map((v) => (
          <Link
            key={v.id}
            href={`/vendedor/${v.slug}`}
            className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <span>{BRAND.sellerSeal.emoji}</span>
              <span className="font-bold">{v.nombre}</span>
            </div>
            {v.reputacion && <p className="mt-1 text-xs text-muted">{v.reputacion}</p>}
            {v.nota && <p className="mt-1 text-sm">{v.nota}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
