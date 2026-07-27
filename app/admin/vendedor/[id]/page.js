import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { adminGetVendedor } from "@/lib/admin-data";
import { guardarVendedor } from "@/lib/actions";

export const metadata = { title: "Editar vendedor", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditarVendedor({ params }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  const nuevo = id === "nuevo";
  const v = nuevo ? {} : (await adminGetVendedor(id)) || {};

  const input = "w-full rounded-lg border border-border px-3 py-2 bg-card";
  const label = "block text-sm font-medium mb-1 mt-4";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin" className="text-sm text-muted hover:text-text">← Panel</Link>
      <h1 className="text-2xl font-bold mt-2">{nuevo ? "Nuevo vendedor" : "Editar vendedor"}</h1>

      <form action={guardarVendedor} className="mt-6">
        {v.id && <input type="hidden" name="id" value={v.id} />}

        <label className={label}>Nombre</label>
        <input name="nombre" defaultValue={v.nombre || ""} required className={input} />

        <label className={label}>Reputación (ej: MercadoLíder Platinum)</label>
        <input name="reputacion" defaultValue={v.reputacion || ""} className={input} />

        <label className={label}>ID de vendedor en ML (opcional)</label>
        <input name="ml_seller_id" defaultValue={v.ml_seller_id || ""} className={input} />

        <label className={label}>Nota (tu comentario sobre el vendedor)</label>
        <textarea name="nota" defaultValue={v.nota || ""} rows={3} className={input} />

        <label className="flex items-center gap-2 mt-4">
          <input type="checkbox" name="cumple" defaultChecked={v.cumple ?? true} />
          <span className="text-sm">Lleva el sello "Vendedor que cumple"</span>
        </label>

        <button className="mt-6 w-full rounded-lg bg-text text-white font-semibold py-2.5">Guardar</button>
      </form>
    </div>
  );
}
