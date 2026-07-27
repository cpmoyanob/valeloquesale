import { getProductos } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const productos = await getProductos();
  const gold = productos.filter((p) => p.veredicto === "gold");
  const trash = productos.filter((p) => p.veredicto === "trash");

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="py-12 sm:py-16 text-center">
        <p className="text-sm font-semibold text-muted uppercase tracking-wide">
          {BRAND.ml.label}
        </p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">
          Dejá de arriesgar. <span style={{ color: BRAND.verdicts.gold.color }}>Comprá lo que vale.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
          Probamos e investigamos los productos virales de Mercado Libre y te decimos, sin
          vueltas, cuáles <strong>valen lo que salen</strong> y cuáles no.
        </p>
      </section>

      {/* LO VALE */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold">✅ Lo que vale</h2>
          <span className="text-sm text-muted">{gold.length} productos aprobados</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gold.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* NO LO VALE */}
      {trash.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold">❌ No lo vale</h2>
            <span className="text-sm text-muted">te ahorramos el mal rato</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {trash.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
