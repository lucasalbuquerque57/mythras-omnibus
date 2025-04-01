import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@authMain';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bearnardo',
  description: 'A Mythras fan made app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <>
            <SessionProvider session={session}>
                <Analytics/>
                <html lang='en' suppressHydrationWarning>
                  <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                  >
                  <ThemeProvider
                      attribute="class"
                      defaultTheme="system"
                      enableSystem
                      disableTransitionOnChange
                  >
                    {children}
                    <SpeedInsights />
                  </ThemeProvider>
                  </body>
                </html>
            </SessionProvider>
        </>
    );
}
