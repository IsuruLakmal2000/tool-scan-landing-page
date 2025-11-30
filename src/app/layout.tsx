import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: '%s | ToolScan',
    default: 'ToolScan - Smart AI Tool Finder',
  },
  description: "Discover, recognize, and learn about hand tools instantly with AI.",
  metadataBase: new URL('https://www.toolidentification.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ToolScan - Smart AI Tool Finder',
    description: 'Discover, recognize, and learn about hand tools instantly with AI.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
