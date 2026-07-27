// Datos de ejemplo — se usan como fallback cuando Supabase todavía no está
// configurado (env vacías) o falla la consulta. Así el sitio se ve andando de una.

export const DEMO_VENDEDORES = [
  { id: "v1", slug: "tecnomundo", nombre: "TecnoMundo Oficial", cumple: true, reputacion: "MercadoLíder Platinum", nota: "Envíos rápidos, responde siempre, garantía real." },
  { id: "v2", slug: "hogar-store", nombre: "Hogar Store", cumple: true, reputacion: "MercadoLíder", nota: "Buen packaging, cumple los tiempos." },
];

export const DEMO_PRODUCTOS = [
  {
    id: "p1", slug: "auriculares-anc-viral",
    titulo: "Auriculares Bluetooth con Cancelación de Ruido",
    descripcion: "ANC real, batería 30h, estuche de carga. Uno de los más vendidos de la categoría.",
    categoria: "Tecnología", precio: 24999, moneda: "ARS",
    fotos: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    link_afiliado: "https://www.mercadolibre.com.ar/#ejemplo-1",
    comision_estimada: 6.5, veredicto: "gold", destacado: true, estado: "publicado",
    texto_recomendacion: "Lo probamos contra tres alternativas más baratas y ganó por lejos: la cancelación de ruido funciona de verdad y la batería aguanta lo que promete. A este precio, LO VALE.",
    vendedor_id: "v1",
  },
  {
    id: "p2", slug: "organizador-cocina-viral",
    titulo: "Organizador de Cocina Extensible",
    descripcion: "Bandeja extensible para cajones, bambú. Súper viral en TikTok.",
    categoria: "Hogar", precio: 8999, moneda: "ARS",
    fotos: ["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"],
    link_afiliado: "https://www.mercadolibre.com.ar/#ejemplo-2",
    comision_estimada: 5.0, veredicto: "gold", destacado: false, estado: "publicado",
    texto_recomendacion: "Cumple lo que muestra el video: se extiende bien y el bambú es macizo, no chapa fina. Para ordenar cajones caóticos, LO VALE.",
    vendedor_id: "v2",
  },
  {
    id: "p3", slug: "reloj-inteligente-generico",
    titulo: 'Smartwatch Genérico "Ultra"',
    descripcion: "Copia de smartwatch premium. Mucha publicidad, poca sustancia.",
    categoria: "Tecnología", precio: 15999, moneda: "ARS",
    fotos: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"],
    link_afiliado: "https://www.mercadolibre.com.ar/#ejemplo-3",
    comision_estimada: 4.0, veredicto: "trash", destacado: false, estado: "publicado",
    texto_recomendacion: "Las fotos prometen un reloj premium y llega un plástico que mide mal las pulsaciones y se descarga en un día. NO LO VALE: por poco más conseguís uno que cumple.",
    vendedor_id: null,
  },
];
