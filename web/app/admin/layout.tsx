import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false }, // Google-a düşməsin
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
