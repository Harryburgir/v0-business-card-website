import type { Metadata } from "next";
import { AdminAuth } from "@/components/admin-auth";

export const metadata: Metadata = {
  title: "Panel Administracyjny | La de Bebe mini",
  description: "Zarzadzanie produktami i kategoriami sklepu La de Bebe mini",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuth>{children}</AdminAuth>;
}
