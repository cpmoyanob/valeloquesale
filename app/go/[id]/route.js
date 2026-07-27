import { NextResponse } from "next/server";
import { getLinkAfiliado } from "@/lib/data";
import { supabaseAdmin } from "@/lib/supabase";

// Redirect con tracking: /go/{id} → registra el click y manda al link de afiliado.
export async function GET(req, { params }) {
  const { id } = await params;
  const destino = await getLinkAfiliado(id);

  if (!destino) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Registrar el click (fire-and-forget, no bloquea el redirect).
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      await supabaseAdmin()
        .from("clicks")
        .insert({
          producto_id: id,
          referrer: req.headers.get("referer") || null,
          user_agent: req.headers.get("user-agent") || null,
        });
    } catch {
      // si falla el tracking, igual redirigimos
    }
  }

  return NextResponse.redirect(destino, { status: 302 });
}
