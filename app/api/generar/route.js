import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

// Genera el "veredicto" redactado a partir de los datos del producto (Claude Haiku).
export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ error: "Falta ANTHROPIC_API_KEY" }, { status: 400 });

  const { titulo, descripcion, precio, veredicto } = await req.json();
  const esGold = veredicto !== "trash";

  const prompt = `Sos el editor de "Valeloquesale", una web que prueba productos virales de Mercado Libre y dice honestamente si valen lo que salen. Escribí el veredicto de este producto en español argentino (voseo), tono directo y honesto, primera persona plural ("lo probamos", "comparamos"). 2 a 3 oraciones. Terminá con "${esGold ? "LO VALE" : "NO LO VALE"}".

Producto: ${titulo}
${descripcion ? "Detalle: " + descripcion : ""}
${precio ? "Precio: $" + precio : ""}
Veredicto: ${esGold ? "aprobado (LO VALE)" : "no lo recomendamos (NO LO VALE)"}

Devolvé SOLO el texto del veredicto, sin comillas ni títulos.`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await r.json();
    if (!r.ok) return NextResponse.json({ error: data?.error?.message || "Error de Claude" }, { status: 500 });
    const texto = data.content?.[0]?.text?.trim() || "";
    return NextResponse.json({ texto });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
