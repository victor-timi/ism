"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { HiOutlineBars3, HiTag, HiUser } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ROUTES } from "@/lib/routes";
import { navLinks } from "./data";

export function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6 lg:px-12 xl:px-16">
        {/* Logo */}
        <Link href={ROUTES.home} className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-primary text-primary-foreground rounded-lg px-2 py-1 text-sm">
            ISM
          </span>
          <span className="hidden sm:inline">International Students Movement</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="flex items-center gap-4">
              <Link
                href={ROUTES.saved}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Saved
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={ROUTES.signIn}>Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={ROUTES.signUp}>Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <HiOutlineBars3 className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <nav className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}

              {session ? (
                <>
                  <Link
                    href={ROUTES.saved}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium"
                  >
                    <HiTag className="h-5 w-5" />
                    Saved Items
                  </Link>
                  <Link
                    href={ROUTES.settings}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium"
                  >
                    <HiUser className="h-5 w-5" />
                    Settings
                  </Link>
                  <Button variant="outline" onClick={() => signOut()} className="mt-4">
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild>
                    <Link href={ROUTES.signUp} onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={ROUTES.signIn} onClick={() => setOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
