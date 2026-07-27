export function precio(valor, moneda = "ARS") {
  if (valor == null) return "";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(valor);
}
