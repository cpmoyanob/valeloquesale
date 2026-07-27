// ─────────────────────────────────────────────────────────────
// MARCA — todo el branding vive acá. Cambiar el nombre = cambiar
// una línea. El resto de la app importa desde este archivo.
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: "Valeloquesale",
  // Se muestra en el logo/título. Podés partirlo en dos para estilarlo.
  wordmark: { a: "Vale", b: "lo que sale" },
  tagline: "El filtro honesto de Mercado Libre",
  claim: "Probamos e investigamos para que compres tranquilo.",
  domain: "valeloquesale.com", // placeholder, cambialo cuando registres
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://valeloquesale.com",

  // País / sitio de Mercado Libre donde operás
  ml: { site: "MLA", label: "Mercado Libre Argentina" },

  // Sellos / veredictos (el corazón de la marca)
  verdicts: {
    gold: { key: "gold", label: "LO VALE", emoji: "✅", color: "#1f8a4c" },
    trash: { key: "trash", label: "NO LO VALE", emoji: "❌", color: "#c0392b" },
  },
  // Sello de vendedor (tu diferencial vs KYD)
  sellerSeal: { label: "Vendedor que cumple", emoji: "🛡️", color: "#2563eb" },
};

// Paleta (tokens — no hardcodear colores en los componentes)
export const COLORS = {
  bg: "#faf9f7",
  surface: "#f2f0ec",
  card: "#ffffff",
  border: "#e6e2db",
  text: "#1a1a1a",
  muted: "#6b665e",
  accent: "#111111",
  gold: "#1f8a4c", // LO VALE
  trash: "#c0392b", // NO LO VALE
  seller: "#2563eb", // vendedor que cumple
  star: "#e0a80d",
};
