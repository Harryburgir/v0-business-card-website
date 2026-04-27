import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Administracyjny | La de Bebe mini",
  description: "Zarzadzanie produktami i kategoriami sklepu La de Bebe mini",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
