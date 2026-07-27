import Link from "next/link";
import VerdictBadge from "./VerdictBadge";
import SellerBadge from "./SellerBadge";
import { precio } from "@/lib/format";

export default function ProductCard({ producto }) {
  const foto = producto.fotos?.[0];
  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-surface overflow-hidden">
        {foto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto}
            alt={producto.titulo}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
          />
        )}
        <div className="absolute top-2 left-2">
          <VerdictBadge veredicto={producto.veredicto} />
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs text-muted">{producto.categoria}</p>
        <h3 className="mt-0.5 font-semibold leading-snug line-clamp-2">{producto.titulo}</h3>
        {producto.precio != null && (
          <p className="mt-2 font-bold">{precio(producto.precio, producto.moneda)}</p>
        )}
        {producto.vendedor && (
          <div className="mt-2">
            <SellerBadge vendedor={producto.vendedor} asLink={false} />
          </div>
        )}
      </div>
    </Link>
  );
}
