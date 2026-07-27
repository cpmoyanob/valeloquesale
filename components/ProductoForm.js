"use client";

import { useState } from "react";
import { guardarProducto } from "@/lib/actions";

export default function ProductoForm({ producto, vendedores }) {
  const p = producto || {};
  const [titulo, setTitulo] = useState(p.titulo || "");
  const [descripcion, setDescripcion] = useState(p.descripcion || "");
  const [precio, setPrecio] = useState(p.precio || "");
  const [veredicto, setVeredicto] = useState(p.veredicto || "gold");
  const [texto, setTexto] = useState(p.texto_recomendacion || "");
  const [generando, setGenerando] = useState(false);

  async function generar() {
    setGenerando(true);
    try {
      const r = await fetch("/api/generar", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, precio, veredicto }),
      });
      const data = await r.json();
      if (data.texto) setTexto(data.texto);
      else alert(data.error || "No se pudo generar");
    } finally {
      setGenerando(false);
    }
  }

  const input = "w-full rounded-lg border border-border px-3 py-2 bg-card";
  const label = "block text-sm font-medium mb-1 mt-4";

  return (
    <form action={guardarProducto} className="mt-6 max-w-2xl">
      {p.id && <input type="hidden" name="id" value={p.id} />}

      <label className={label}>Título</label>
      <input name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className={input} />

      <label className={label}>Descripción (specs cortas)</label>
      <textarea name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={2} className={input} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Categoría</label>
          <input name="categoria" defaultValue={p.categoria || ""} className={input} />
        </div>
        <div>
          <label className={label}>Precio (ARS)</label>
          <input name="precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} className={input} />
        </div>
      </div>

      <label className={label}>Fotos (una URL por línea)</label>
      <textarea name="fotos" defaultValue={(p.fotos || []).join("\n")} rows={2} className={input} placeholder="https://..." />

      <label className={label}>Link de afiliado (Mercado Libre)</label>
      <input name="link_afiliado" defaultValue={p.link_afiliado || ""} required className={input} placeholder="https://..." />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Veredicto</label>
          <select name="veredicto" value={veredicto} onChange={(e) => setVeredicto(e.target.value)} className={input}>
            <option value="gold">✅ LO VALE</option>
            <option value="trash">❌ NO LO VALE</option>
          </select>
        </div>
        <div>
          <label className={label}>Comisión estimada (%)</label>
          <input name="comision_estimada" type="number" step="0.1" defaultValue={p.comision_estimada || ""} className={input} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 mb-1">
        <label className="text-sm font-medium">Veredicto redactado</label>
        <button type="button" onClick={generar} disabled={generando || !titulo}
          className="text-xs font-semibold rounded-lg bg-surface px-2.5 py-1.5 disabled:opacity-50">
          {generando ? "Generando…" : "✨ Generar con IA"}
        </button>
      </div>
      <textarea name="texto_recomendacion" value={texto} onChange={(e) => setTexto(e.target.value)} rows={4} className={input} />

      <label className={label}>Vendedor</label>
      <select name="vendedor_id" defaultValue={p.vendedor_id || ""} className={input}>
        <option value="">— sin vendedor —</option>
        {vendedores.map((v) => (
          <option key={v.id} value={v.id}>{v.nombre}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>Estado</label>
          <select name="estado" defaultValue={p.estado || "borrador"} className={input}>
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>
        <label className="flex items-center gap-2 mt-9">
          <input type="checkbox" name="destacado" defaultChecked={p.destacado} />
          <span className="text-sm">Destacado</span>
        </label>
      </div>

      <button className="mt-6 w-full rounded-lg bg-text text-white font-semibold py-2.5">Guardar</button>
    </form>
  );
}
