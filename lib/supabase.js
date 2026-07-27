import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cliente público (anon). Sirve para lecturas del catálogo (RLS: solo lo publicado).
// Si no hay env (modo demo) queda null y data.js usa los datos de ejemplo.
export const supabase =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;

// Cliente admin (service role) — SOLO en el servidor (rutas /api, server actions).
// NUNCA importar esto en un componente cliente: la key salta las RLS.
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
