import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
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
    <html lang="en">
      <body className={`${googleSansFlex.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
