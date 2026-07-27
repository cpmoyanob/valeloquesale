import { getProductos } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ params }) {
  const { categoria } = await params;
  const cat = decodeURIComponent(categoria);
  return { title: `${cat} — lo que vale`, description: `Los mejores productos de ${cat} en Mercado Libre, probados y aprobados.` };
}

export default async function CategoriaPage({ params }) {
  const { categoria } = await params;
  const cat = decodeURIComponent(categoria);
  const productos = await getProductos({ categoria: cat });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-extrabold tracking-tight">{cat}</h1>
      <p className="text-sm text-muted mt-1">{productos.length} productos</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}
