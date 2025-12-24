import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carinho Pet - Diretório de Serviços Pet em Três Lagoas e Região",
  description: "Encontre os melhores pet shops, clínicas veterinárias, adestradores e cuidadores de animais em Três Lagoas-MS e região. Avalie e encontre o cuidado perfeito para seu pet.",
  keywords: "pet shop, veterinário, adestrador, cuidador, três lagoas, andradina, ilha solteira, pet, cachorro, gato",
  openGraph: {
    title: "Carinho Pet - Diretório de Serviços Pet",
    description: "Encontre os melhores profissionais e empresas para cuidar do seu pet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google AdSense - Substitua pelo seu ID de cliente */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
