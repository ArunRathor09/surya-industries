import type { Metadata } from "next";
import { AdminProductDashboard } from "@/components/admin/admin-product-dashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Product admin",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return <AdminProductDashboard />;
}
