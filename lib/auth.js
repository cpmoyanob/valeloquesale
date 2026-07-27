import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vls_admin";

// ¿La sesión actual es admin? Compara la cookie con ADMIN_PASSWORD.
export async function isAdmin() {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === pass;
}
