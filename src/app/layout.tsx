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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carinhopet.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Onde encontrar pet shop e veterinário em Três Lagoas? | Carinho Pet",
    template: "%s | Carinho Pet"
  },
  description: "Procurando pet shop, clínica veterinária ou cuidador de pets em Três Lagoas-MS? O Carinho Pet é o maior diretório gratuito de serviços pet da região, com empresas em Três Lagoas, Andradina, Ilha Solteira e mais 4 cidades num raio de 100km.",
  keywords: [
    "pet shop três lagoas",
    "veterinário três lagoas",
    "clínica veterinária três lagoas",
    "adestrador de cães três lagoas",
    "cuidador de pets",
    "hotel pet três lagoas",
    "banho e tosa três lagoas",
    "pet shop andradina",
    "veterinário ilha solteira",
    "serviços pet MS"
  ],
  authors: [{ name: "Carinho Pet" }],
  creator: "Carinho Pet",
  publisher: "Carinho Pet",
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Carinho Pet",
    title: "Carinho Pet - Diretório de Serviços Pet em Três Lagoas e Região",
    description: "Encontre os melhores pet shops, clínicas veterinárias, adestradores e cuidadores de animais em Três Lagoas-MS e região. Avalie e encontre o cuidado perfeito para seu pet.",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Carinho Pet - Diretório de Serviços Pet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carinho Pet - Diretório de Serviços Pet",
    description: "Encontre os melhores profissionais e empresas para cuidar do seu pet em Três Lagoas e região.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// Schema.org JSON-LD
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Carinho Pet",
  "description": "Diretório de serviços pet em Três Lagoas e região. Encontre pet shops, clínicas veterinárias, adestradores e cuidadores de animais.",
  "url": siteUrl,
  "logo": `${siteUrl}/images/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-66-99669-1709",
    "email": "admfernandoth@gmail.com",
    "contactType": "customer service",
    "areaServed": ["BR-MS", "BR-SP"],
    "availableLanguage": "Portuguese"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Três Lagoas",
    "addressRegion": "MS",
    "addressCountry": "BR"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Carinho Pet",
  "description": "Onde encontrar os melhores serviços pet em Três Lagoas e região?",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/empresas?busca={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Carinho Pet - Diretório Pet",
  "description": "Diretório online gratuito de pet shops, clínicas veterinárias, adestradores e cuidadores em Três Lagoas-MS e região num raio de 100km.",
  "url": siteUrl,
  "telephone": "+55-66-99669-1709",
  "email": "admfernandoth@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Três Lagoas",
    "addressRegion": "MS",
    "postalCode": "79600-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-20.7849",
    "longitude": "-51.7008"
  },
  "areaServed": [
    { "@type": "City", "name": "Três Lagoas" },
    { "@type": "City", "name": "Andradina" },
    { "@type": "City", "name": "Ilha Solteira" },
    { "@type": "City", "name": "Castilho" },
    { "@type": "City", "name": "Brasilândia" },
    { "@type": "City", "name": "Selvíria" },
    { "@type": "City", "name": "Mirandópolis" }
  ],
  "priceRange": "Gratuito"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
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
