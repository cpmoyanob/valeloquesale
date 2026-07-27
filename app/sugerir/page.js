"use client";

import { useState } from "react";
import Link from "next/link";

export default function SugerirPage() {
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.target);
    const r = await fetch("/api/sugerir", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        texto: fd.get("texto"),
        comentario: fd.get("comentario"),
        contacto: fd.get("contacto"),
      }),
    });
    setLoading(false);
    if (r.ok) setEnviado(true);
    else {
      const d = await r.json().catch(() => ({}));
      setError(d.error || "Algo falló, probá de nuevo.");
    }
  }

  const input = "w-full rounded-lg border border-border px-3 py-2 bg-card";

  if (enviado) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-4xl">🙌</p>
        <h1 className="mt-3 text-2xl font-bold">¡Gracias por la sugerencia!</h1>
        <p className="mt-2 text-muted">La sumamos a la lista de cosas para probar. Si la reseñamos, va a aparecer en la web.</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-text text-white font-semibold px-4 py-2">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-extrabold tracking-tight">¿Qué querés que probemos?</h1>
      <p className="mt-2 text-muted">
        Pasanos un producto viral de Mercado Libre y lo ponemos a prueba. Si vale la pena, lo publicamos.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Producto o link de Mercado Libre *</label>
          <input name="texto" required className={input} placeholder="Nombre del producto o https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">¿Por qué te interesa? (opcional)</label>
          <textarea name="comentario" rows={3} className={input} placeholder="Lo vi en TikTok y no sé si es un fiasco…" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tu email o usuario (opcional)</label>
          <input name="contacto" className={input} placeholder="Para avisarte si lo probamos" />
        </div>
        {error && <p className="text-sm text-trash">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-text text-white font-semibold py-2.5 disabled:opacity-50">
          {loading ? "Enviando…" : "Enviar sugerencia"}
        </button>
      </form>
    </div>
  );
}
