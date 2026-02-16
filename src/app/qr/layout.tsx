import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Kod Menü - Haşim Usta Kebap",
  description: "Dijital menü QR kodu oluşturun ve indirin",
};

export default function QRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
