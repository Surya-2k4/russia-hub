import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Russia International Student Hub | Visa, University & Finance Guide',
  description: 'Everything Indian and International students need for studying in Russia: Visa progress tracker, university finder, RUB currency converter, and community maps.',
  keywords: 'Study in Russia, Russian University Finder, Russian Visa Tracker, RUB to INR Converter, International Students Russia',
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Placeholder for Google AdSense Script */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-blue-500/30 bg-background text-foreground">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-1 pb-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
