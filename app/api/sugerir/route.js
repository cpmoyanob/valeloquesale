import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req) {
  const { texto, comentario, contacto } = await req.json();
  if (!texto || texto.trim().length < 3) {
    return NextResponse.json({ error: "Contanos qué producto querés que probemos." }, { status: 400 });
  }

  // Si Supabase está configurado, guardamos. Si no (demo), respondemos ok igual.
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      await supabaseAdmin().from("sugerencias").insert({
        texto: texto.trim().slice(0, 500),
        comentario: comentario?.trim().slice(0, 1000) || null,
        contacto: contacto?.trim().slice(0, 200) || null,
      });
    } catch {
      return NextResponse.json({ error: "No se pudo guardar, probá de nuevo." }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true });
}
