import "server-only";
import { supabaseAdmin } from "./supabase";

// Todas estas funciones requieren SUPABASE_SERVICE_ROLE_KEY (solo server).
export const supabaseListo = !!process.env.SUPABASE_SERVICE_ROLE_KEY && !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function adminListProductos() {
  const db = supabaseAdmin();
  const { data: productos } = await db
    .from("productos")
    .select("*, vendedor:vendedores(nombre, slug)")
    .order("created_at", { ascending: false });
  // conteo de clicks por producto (simple; se puede optimizar con una vista si crece)
  const { data: clicks } = await db.from("clicks").select("producto_id");
  const conteo = {};
  (clicks || []).forEach((c) => { conteo[c.producto_id] = (conteo[c.producto_id] || 0) + 1; });
  return (productos || []).map((p) => ({ ...p, clicks: conteo[p.id] || 0 }));
}

export async function adminGetProducto(id) {
  const { data } = await supabaseAdmin().from("productos").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function adminListVendedores() {
  const { data } = await supabaseAdmin().from("vendedores").select("*").order("nombre");
  return data || [];
}

export async function adminGetVendedor(id) {
  const { data } = await supabaseAdmin().from("vendedores").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function adminListSugerencias() {
  const { data } = await supabaseAdmin()
    .from("sugerencias")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}
