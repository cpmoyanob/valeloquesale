import { supabase } from "./supabase";
import { DEMO_PRODUCTOS, DEMO_VENDEDORES } from "./demo";

// ¿Hay Supabase configurado? Si no, usamos datos demo (para poder previsualizar).
export const usingDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL;

// Une un producto con su vendedor (para los datos demo).
function withVendedorDemo(p) {
  return { ...p, vendedor: DEMO_VENDEDORES.find((v) => v.id === p.vendedor_id) || null };
}

// ── Listado de productos publicados (con filtros opcionales) ──
export async function getProductos({ categoria, veredicto } = {}) {
  if (usingDemo) {
    return DEMO_PRODUCTOS
      .filter((p) => (categoria ? p.categoria === categoria : true))
      .filter((p) => (veredicto ? p.veredicto === veredicto : true))
      .map(withVendedorDemo);
  }
  let q = supabase
    .from("productos")
    .select("*, vendedor:vendedores(*)")
    .eq("estado", "publicado")
    .order("destacado", { ascending: false })
    .order("created_at", { ascending: false });
  if (categoria) q = q.eq("categoria", categoria);
  if (veredicto) q = q.eq("veredicto", veredicto);
  const { data, error } = await q;
  if (error) return [];
  return data || [];
}

// ── Un producto por slug ──
export async function getProducto(slug) {
  if (usingDemo) {
    const p = DEMO_PRODUCTOS.find((x) => x.slug === slug);
    return p ? withVendedorDemo(p) : null;
  }
  const { data } = await supabase
    .from("productos")
    .select("*, vendedor:vendedores(*)")
    .eq("slug", slug)
    .eq("estado", "publicado")
    .maybeSingle();
  return data || null;
}

// ── Producto por id (para el redirect /go) — devuelve el link de afiliado ──
export async function getLinkAfiliado(id) {
  if (usingDemo) {
    const p = DEMO_PRODUCTOS.find((x) => x.id === id);
    return p?.link_afiliado || null;
  }
  const { data } = await supabase
    .from("productos")
    .select("link_afiliado")
    .eq("id", id)
    .maybeSingle();
  return data?.link_afiliado || null;
}

// ── Un vendedor por slug + sus productos ──
export async function getVendedor(slug) {
  if (usingDemo) {
    const v = DEMO_VENDEDORES.find((x) => x.slug === slug);
    if (!v) return null;
    const productos = DEMO_PRODUCTOS.filter((p) => p.vendedor_id === v.id).map(withVendedorDemo);
    return { ...v, productos };
  }
  const { data: v } = await supabase.from("vendedores").select("*").eq("slug", slug).maybeSingle();
  if (!v) return null;
  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .eq("vendedor_id", v.id)
    .eq("estado", "publicado");
  return { ...v, productos: productos || [] };
}

// ── Todos los vendedores ──
export async function getVendedores() {
  if (usingDemo) return DEMO_VENDEDORES;
  const { data } = await supabase.from("vendedores").select("*").order("nombre");
  return data || [];
}

// ── Categorías únicas (para el nav / SEO) ──
export async function getCategorias() {
  const productos = await getProductos();
  return [...new Set(productos.map((p) => p.categoria).filter(Boolean))];
}
