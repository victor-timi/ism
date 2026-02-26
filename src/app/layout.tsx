import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { SiteShell } from "@/components/layout/site-shell";
import { GlobalEffects } from "@/components/layout/global-effects";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ISM — International Students Movement",
    template: "%s | ISM",
  },
  description:
    "Join the movement. Find jobs, housing, and discounts for international students in Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ism-theme");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
          <GlobalEffects />
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
