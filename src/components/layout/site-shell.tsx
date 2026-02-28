"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ROUTES } from "@/lib/routes";

const EXCLUDED_PREFIXES = [ROUTES.studio];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden = EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p));

  if (hidden) return <>{children}</>;

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
