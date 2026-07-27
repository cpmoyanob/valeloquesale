"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./supabase";
import { isAdmin } from "./auth";

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // saca acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("No autorizado");
}

// ── Producto ──
export async function guardarProducto(formData) {
  await requireAdmin();
  const id = formData.get("id") || null;
  const titulo = formData.get("titulo");
  const fotos = String(formData.get("fotos") || "")
    .split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);

  const row = {
    titulo,
    slug: formData.get("slug") || slugify(titulo),
    descripcion: formData.get("descripcion") || null,
    categoria: formData.get("categoria") || null,
    precio: formData.get("precio") ? Number(formData.get("precio")) : null,
    fotos,
    link_afiliado: formData.get("link_afiliado"),
    comision_estimada: formData.get("comision_estimada") ? Number(formData.get("comision_estimada")) : null,
    veredicto: formData.get("veredicto") || "gold",
    texto_recomendacion: formData.get("texto_recomendacion") || null,
    vendedor_id: formData.get("vendedor_id") || null,
    estado: formData.get("estado") || "borrador",
    destacado: formData.get("destacado") === "on",
    updated_at: new Date().toISOString(),
  };

  const db = supabaseAdmin();
  if (id) await db.from("productos").update(row).eq("id", id);
  else await db.from("productos").insert(row);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function eliminarProducto(formData) {
  await requireAdmin();
  await supabaseAdmin().from("productos").delete().eq("id", formData.get("id"));
  revalidatePath("/");
  revalidatePath("/admin");
}

// ── Vendedor ──
export async function guardarVendedor(formData) {
  await requireAdmin();
  const id = formData.get("id") || null;
  const nombre = formData.get("nombre");
  const row = {
    nombre,
    slug: formData.get("slug") || slugify(nombre),
    ml_seller_id: formData.get("ml_seller_id") || null,
    cumple: formData.get("cumple") === "on",
    reputacion: formData.get("reputacion") || null,
    nota: formData.get("nota") || null,
  };
  const db = supabaseAdmin();
  if (id) await db.from("vendedores").update(row).eq("id", id);
  else await db.from("vendedores").insert(row);
  revalidatePath("/admin");
  redirect("/admin");
}

// ── Sugerencias (cambiar estado) ──
export async function actualizarSugerencia(formData) {
  await requireAdmin();
  await supabaseAdmin()
    .from("sugerencias")
    .update({ estado: formData.get("estado") })
    .eq("id", formData.get("id"));
  revalidatePath("/admin");
}
