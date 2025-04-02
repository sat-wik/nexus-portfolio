import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Satwik Pattanaik | Full Stack Developer",
  description: "Portfolio of Satwik Pattanaik, a Full Stack Developer specializing in modern web technologies.",
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#3B82F6',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  themeColor: '#0F172A',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://satwikpattanaik.com',
    title: 'Satwik Pattanaik | Full Stack Developer',
    description: 'Portfolio of Satwik Pattanaik, a Full Stack Developer specializing in modern web technologies.',
    siteName: 'Satwik Pattanaik Portfolio',
    images: [
      {
        url: '/favicon/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Satwik Pattanaik Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Satwik Pattanaik | Full Stack Developer',
    description: 'Portfolio of Satwik Pattanaik, a Full Stack Developer specializing in modern web technologies.',
    images: ['/favicon/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
