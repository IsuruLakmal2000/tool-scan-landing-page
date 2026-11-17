import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: '%s | ToolScan',
    default: 'ToolScan - Smart AI Tool Finder',
  },
  description: "Identify hand tools instantly with ToolScan's AI camera, then get names, uses, safety tips, and learning guides for DIYers, students, and pros.",
  metadataBase: new URL('https://www.toolidentification.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ToolScan - Smart AI Tool Finder',
    description: "Identify hand tools instantly with ToolScan's AI camera, then get names, uses, safety tips, and learning guides for DIYers, students, and pros.",
    url: 'https://www.toolidentification.app',
    siteName: 'ToolScan',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolScan - Smart AI Tool Finder',
      },
    ],
  },
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
        </Script>
        <Script id="gtm-script" src="https://www.googletagmanager.com/gtm.js?id=GTM-NPLGKQTC" strategy="afterInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-X7QYQKB94V" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-X7QYQKB94V');`}
        </Script>
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NPLGKQTC" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
