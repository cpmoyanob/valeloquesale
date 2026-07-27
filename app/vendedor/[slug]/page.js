import { notFound } from "next/navigation";
import { getVendedor } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const v = await getVendedor(slug);
  if (!v) return {};
  return {
    title: `${v.nombre} — ${BRAND.sellerSeal.label}`,
    description: v.nota || `${v.nombre}, vendedor recomendado en ${BRAND.ml.label}.`,
  };
}

export default async function VendedorPage({ params }) {
  const { slug } = await params;
  const v = await getVendedor(slug);
  if (!v) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 22 }}>{BRAND.sellerSeal.emoji}</span>
          <h1 className="text-2xl font-extrabold tracking-tight">{v.nombre}</h1>
        </div>
        {v.cumple && (
          <span className="badge mt-2" style={{ background: BRAND.sellerSeal.color }}>
            {BRAND.sellerSeal.label}
          </span>
        )}
        {v.reputacion && <p className="mt-3 text-sm text-muted">{v.reputacion}</p>}
        {v.nota && <p className="mt-1">{v.nota}</p>}
      </div>

      {v.productos?.length > 0 && (
        <>
          <h2 className="mt-8 mb-4 text-lg font-bold">Productos de este vendedor</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {v.productos.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
