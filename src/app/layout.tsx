import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomActionBar from "@/components/BottomActionBar";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haşim Usta Kebap - Adana'nın Efsane Zırh Kıyması | QR Menü",
  description: "Adana'nın en lezzetli ocakbaşı kebapları. El yapımı zırh kıyma, fırından lezzetler ve sıcak mezeler. QR Menümüzden sipariş verin.",
  keywords: [
    "Adana Kebap",
    "Ocakbaşı",
    "Haşim Usta",
    "Zırh Kıyma",
    "Kebapçı",
    "Adana Lezzetleri",
    "Adana Restoran",
    "El Yapımı Kebap",
    "Urfa Kebap",
    "QR Menü",
    "Adana Yemek",
    "Kebap Menüsü",
  ],
  authors: [{ name: "Haşim Usta Kebap" }],
  creator: "Haşim Usta Kebap",
  publisher: "Haşim Usta Kebap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Haşim Usta Kebap - Adana'nın Efsane Zırh Kıyması",
    description: "Adana'nın en lezzetli ocakbaşı kebapları. El yapımı zırh kıyma, fırından lezzetler ve sıcak mezeler.",
    url: "https://hasimusta.com",
    siteName: "Haşim Usta Kebap",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Haşim Usta Kebap - Adana Ocakbaşı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haşim Usta Kebap - Adana'nın Efsane Zırh Kıyması",
    description: "Adana'nın en lezzetli ocakbaşı kebapları. El yapımı zırh kıyma, fırından lezzetler ve sıcak mezeler.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Haşim Usta",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0F0F0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className="min-h-screen bg-midnight">
        {/* Main Content - Scrolls normally */}
        <main className="pb-20">
          {children}
        </main>
        
        {/* Bottom Action Bar - Always visible */}
        <BottomActionBar />
      </body>
    </html>
  );
}
