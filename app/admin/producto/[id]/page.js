import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { adminGetProducto, adminListVendedores } from "@/lib/admin-data";
import ProductoForm from "@/components/ProductoForm";

export const metadata = { title: "Editar producto", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditarProducto({ params }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  const nuevo = id === "nuevo";
  const [producto, vendedores] = await Promise.all([
    nuevo ? null : adminGetProducto(id),
    adminListVendedores(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin" className="text-sm text-muted hover:text-text">← Panel</Link>
      <h1 className="text-2xl font-bold mt-2">{nuevo ? "Nuevo producto" : "Editar producto"}</h1>
      <ProductoForm producto={producto} vendedores={vendedores} />
    </div>
  );
}
