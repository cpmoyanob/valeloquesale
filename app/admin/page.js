import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { supabaseListo, adminListProductos, adminListVendedores, adminListSugerencias } from "@/lib/admin-data";
import { actualizarSugerencia, eliminarProducto } from "@/lib/actions";
import { precio } from "@/lib/format";
import VerdictBadge from "@/components/VerdictBadge";

export const metadata = { title: "Panel", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  if (!supabaseListo) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold">Panel</h1>
        <div className="mt-4 rounded-xl border border-border bg-card p-5">
          <p className="font-semibold">Falta conectar Supabase</p>
          <p className="mt-1 text-sm text-muted">
            Cargá <code>NEXT_PUBLIC_SUPABASE_URL</code> y <code>SUPABASE_SERVICE_ROLE_KEY</code> en
            <code> .env.local</code> (y en Vercel) para usar el panel. Lo hacemos juntos.
          </p>
        </div>
      </div>
    );
  }

  const [productos, vendedores, sugerencias] = await Promise.all([
    adminListProductos(),
    adminListVendedores(),
    adminListSugerencias(),
  ]);
  const nuevas = sugerencias.filter((s) => s.estado === "nueva").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel</h1>
        <form action="/api/admin/logout" method="POST">
          <button className="text-sm text-muted hover:text-text">Salir</button>
        </form>
      </div>

      {/* Productos */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Productos ({productos.length})</h2>
          <Link href="/admin/producto/nuevo" className="rounded-lg bg-text text-white text-sm font-semibold px-3 py-1.5">
            + Nuevo producto
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {productos.length === 0 && <p className="p-4 text-sm text-muted">Todavía no cargaste productos.</p>}
          {productos.map((p) => (
            <div key={p.id} className="p-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-surface overflow-hidden shrink-0">
                {p.fotos?.[0] && /* eslint-disable-next-line @next/next/no-img-element */ (
                  <img src={p.fotos[0]} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{p.titulo}</p>
                <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                  <VerdictBadge veredicto={p.veredicto} />
                  <span>{p.estado === "publicado" ? "🟢 publicado" : "⚪ borrador"}</span>
                  <span>· {precio(p.precio, p.moneda)}</span>
                  <span>· 👆 {p.clicks} clicks</span>
                </div>
              </div>
              <Link href={`/admin/producto/${p.id}`} className="text-sm font-medium">Editar</Link>
              <form action={eliminarProducto}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-sm text-trash">Borrar</button>
              </form>
            </div>
          ))}
        </div>
      </section>

      {/* Vendedores */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Vendedores ({vendedores.length})</h2>
          <Link href="/admin/vendedor/nuevo" className="rounded-lg bg-text text-white text-sm font-semibold px-3 py-1.5">
            + Nuevo vendedor
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {vendedores.map((v) => (
            <div key={v.id} className="p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{v.cumple ? "🛡️ " : ""}{v.nombre}</p>
                <p className="text-xs text-muted">{v.reputacion}</p>
              </div>
              <Link href={`/admin/vendedor/${v.id}`} className="text-sm font-medium">Editar</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Sugerencias */}
      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">
          Sugerencias de usuarios {nuevas > 0 && <span className="text-sm text-gold">({nuevas} nuevas)</span>}
        </h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {sugerencias.length === 0 && <p className="p-4 text-sm text-muted">Sin sugerencias todavía.</p>}
          {sugerencias.map((s) => (
            <div key={s.id} className="p-3">
              <p className="font-medium break-words">{s.texto}</p>
              {s.comentario && <p className="text-sm text-muted mt-0.5">{s.comentario}</p>}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted">
                {s.contacto && <span>✉️ {s.contacto}</span>}
                <form action={actualizarSugerencia} className="ml-auto flex items-center gap-2">
                  <input type="hidden" name="id" value={s.id} />
                  <select name="estado" defaultValue={s.estado} className="rounded border border-border px-2 py-1 text-xs">
                    <option value="nueva">nueva</option>
                    <option value="en_prueba">en prueba</option>
                    <option value="publicada">publicada</option>
                    <option value="descartada">descartada</option>
                  </select>
                  <button className="rounded bg-surface px-2 py-1 font-medium">Guardar</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
