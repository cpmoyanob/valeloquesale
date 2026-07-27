-- ─────────────────────────────────────────────────────────────
-- Datos de prueba (opcional). Pegar DESPUÉS de schema.sql.
-- Sirven para ver el catálogo funcionando antes de cargar productos reales.
-- ─────────────────────────────────────────────────────────────

insert into public.vendedores (slug, nombre, cumple, reputacion, nota) values
  ('tecnomundo', 'TecnoMundo Oficial', true, 'MercadoLíder Platinum', 'Envíos rápidos, responde siempre, garantía real.'),
  ('hogar-store', 'Hogar Store', true, 'MercadoLíder', 'Buen packaging, cumple los tiempos.')
on conflict (slug) do nothing;

insert into public.productos
  (slug, titulo, descripcion, categoria, precio, fotos, link_afiliado, comision_estimada, veredicto, texto_recomendacion, vendedor_id, estado, destacado)
values
  (
    'auriculares-anc-viral',
    'Auriculares Bluetooth con Cancelación de Ruido',
    'ANC real, batería 30h, estuche de carga. Uno de los más vendidos de la categoría.',
    'Tecnología', 24999.00,
    '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"]'::jsonb,
    'https://www.mercadolibre.com.ar/#ejemplo-1',
    6.5, 'gold',
    'Lo probamos contra tres alternativas más baratas y ganó por lejos: la cancelación de ruido funciona de verdad y la batería aguanta lo que promete. A este precio, LO VALE.',
    (select id from public.vendedores where slug = 'tecnomundo'),
    'publicado', true
  ),
  (
    'organizador-cocina-viral',
    'Organizador de Cocina Extensible',
    'Bandeja extensible para cajones, bambú. Súper viral en TikTok.',
    'Hogar', 8999.00,
    '["https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"]'::jsonb,
    'https://www.mercadolibre.com.ar/#ejemplo-2',
    5.0, 'gold',
    'Cumple lo que muestra el video: se extiende bien y el bambú es macizo, no chapa fina. Para ordenar cajones caóticos, LO VALE.',
    (select id from public.vendedores where slug = 'hogar-store'),
    'publicado', false
  ),
  (
    'reloj-inteligente-generico',
    'Smartwatch Genérico "Ultra"',
    'Copia de smartwatch premium. Mucha publicidad, poca sustancia.',
    'Tecnología', 15999.00,
    '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"]'::jsonb,
    'https://www.mercadolibre.com.ar/#ejemplo-3',
    4.0, 'trash',
    'Las fotos prometen un reloj premium y llega un plástico que mide mal las pulsaciones y se descarga en un día. NO LO VALE: por poco más conseguís uno que cumple.',
    null,
    'publicado', false
  )
on conflict (slug) do nothing;
