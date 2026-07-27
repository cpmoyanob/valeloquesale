import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";

export const metadata = { title: "Admin", robots: { index: false } };

export default async function LoginPage({ searchParams }) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-xl font-bold">Panel · Valeloquesale</h1>
      <form action="/api/admin/login" method="POST" className="mt-6 space-y-3">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoFocus
          className="w-full rounded-lg border border-border px-3 py-2"
        />
        {error && <p className="text-sm text-trash">Contraseña incorrecta.</p>}
        <button className="w-full rounded-lg bg-text text-white font-semibold py-2.5">
          Entrar
        </button>
      </form>
    </div>
  );
}
