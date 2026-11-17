import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminProductDashboard } from "@/components/admin/admin-product-dashboard";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Product admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!isAdminConfigured() || !(await hasAdminSession())) {
    redirect("/admin/login");
  }

  return <AdminProductDashboard mode="dashboard" />;
}
