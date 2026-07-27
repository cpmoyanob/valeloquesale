import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function SellerBadge({ vendedor, asLink = true }) {
  if (!vendedor) return null;
  const s = BRAND.sellerSeal;
  const inner = (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold"
      style={{ color: s.color }}
    >
      <span>{s.emoji}</span>
      {vendedor.nombre}
      {vendedor.cumple && <span className="text-muted font-normal">· {s.label}</span>}
    </span>
  );
  if (asLink) return <Link href={`/vendedor/${vendedor.slug}`}>{inner}</Link>;
  return inner;
}
