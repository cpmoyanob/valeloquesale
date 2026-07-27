import { notFound } from "next/navigation";
import Link from "next/link";
import { getProducto } from "@/lib/data";
import { BRAND } from "@/lib/brand";
import { precio } from "@/lib/format";
import VerdictBadge from "@/components/VerdictBadge";
import SellerBadge from "@/components/SellerBadge";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProducto(slug);
  if (!p) return {};
  const verdictLabel = p.veredicto === "trash" ? BRAND.verdicts.trash.label : BRAND.verdicts.gold.label;
  const title = `${p.titulo} — ${verdictLabel}`;
  const description = p.texto_recomendacion || p.descripcion || "";
  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${BRAND.name}`,
      description,
      images: p.fotos?.[0] ? [p.fotos[0]] : [],
      type: "article",
    },
  };
}

export default async function ProductoPage({ params }) {
  const { slug } = await params;
  const p = await getProducto(slug);
  if (!p) notFound();

  const esGold = p.veredicto === "gold";
  const color = esGold ? BRAND.verdicts.gold.color : BRAND.verdicts.trash.color;

  // schema.org Product + Review para SEO / rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.titulo,
    description: p.descripcion || undefined,
    image: p.fotos || undefined,
    review: {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: esGold ? 5 : 2, bestRating: 5 },
      author: { "@type": "Organization", name: BRAND.name },
      reviewBody: p.texto_recomendacion || undefined,
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/" className="text-sm text-muted hover:text-text">← Volver</Link>

      <div className="mt-4 grid md:grid-cols-2 gap-8">
        {/* Foto */}
        <div className="rounded-xl border border-border bg-surface overflow-hidden aspect-square">
          {p.fotos?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.fotos[0]} alt={p.titulo} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Info */}
        <div>
          <VerdictBadge veredicto={p.veredicto} size="lg" />
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">{p.titulo}</h1>
          {p.categoria && (
            <Link href={`/categoria/${encodeURIComponent(p.categoria)}`} className="text-sm text-muted hover:text-text">
              {p.categoria}
            </Link>
          )}
          {p.precio != null && <p className="mt-3 text-2xl font-bold">{precio(p.precio, p.moneda)}</p>}

          {/* Veredicto redactado */}
          {p.texto_recomendacion && (
            <div className="mt-5 rounded-xl border-l-4 p-4 bg-card" style={{ borderColor: color }}>
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color }}>
                Nuestro veredicto
              </p>
              <p className="mt-1 leading-relaxed">{p.texto_recomendacion}</p>
            </div>
          )}

          {/* Vendedor */}
          {p.vendedor && (
            <div className="mt-4 rounded-xl border border-border p-4 bg-card">
              <SellerBadge vendedor={p.vendedor} />
              {p.vendedor.reputacion && (
                <p className="mt-1 text-xs text-muted">{p.vendedor.reputacion}</p>
              )}
              {p.vendedor.nota && <p className="mt-1 text-sm">{p.vendedor.nota}</p>}
            </div>
          )}

          {/* CTA — pasa por el tracking /go */}
          {esGold ? (
            <a
              href={`/go/${p.id}`}
              rel="nofollow sponsored"
              className="mt-6 block text-center font-bold text-white rounded-xl py-3.5 hover:opacity-90 transition-opacity"
              style={{ background: BRAND.verdicts.gold.color }}
            >
              Ver en Mercado Libre →
            </a>
          ) : (
            <p className="mt-6 text-sm text-muted">
              No lo recomendamos. Mirá las alternativas en{" "}
              <Link href="/" className="underline">la lista de lo que vale</Link>.
            </p>
          )}
          <p className="mt-2 text-xs text-muted text-center">
            Comprando desde este link podemos ganar una comisión, sin costo extra para vos.
          </p>
        </div>
      </div>
    </article>
  );
}
