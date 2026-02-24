"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
