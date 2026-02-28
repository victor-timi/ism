"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "@/components/icons";
import { navItems, accountLinks } from "./data";
import { mobileItem } from "./variants";
import { LogoTilt } from "./logo-tilt";
import { ROUTES } from "@/lib/routes";

export function Navigation() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const openDropdown = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const activeItem = navItems.find((item) => item.label === activeDropdown && item.children);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  let counter = 0;

  return (
    <>
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          activeItem || activeDropdown === "Account"
            ? "rounded-b-2xl"
            : ""
        }`}
        style={{
          backgroundColor: scrolled || activeDropdown ? "var(--ism-bg)" : "transparent",
          boxShadow:
            activeItem || activeDropdown === "Account"
              ? "0 8px 32px -4px rgba(0,0,0,0.2), 0 2px 8px -2px rgba(0,0,0,0.12)"
              : scrolled
                ? "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)"
                : "none",
          overflow: activeItem || activeDropdown === "Account" ? "hidden" : undefined,
        }}
        onMouseLeave={closeDropdown}
      >
        <div className="flex h-16 items-center justify-between px-6 lg:h-20 lg:px-12 xl:px-16">
          {/* Logo with 3D tilt */}
          <LogoTilt onHover={closeDropdown} />

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {navItems.map((item) =>
              item.children ? (
                <button
                  key={item.label}
                  className="flex items-center gap-1 text-xs font-medium tracking-[0.15em] text-[var(--ism-fg)] uppercase transition-opacity hover:opacity-70"
                  onMouseEnter={() => openDropdown(item.label)}
                >
                  {item.label}
                  <ChevronDown open={activeDropdown === item.label} />
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium tracking-[0.15em] text-[var(--ism-fg)] uppercase transition-opacity hover:opacity-70"
                  onMouseEnter={closeDropdown}
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="ml-2 h-5 w-px bg-[var(--ism-border)]" onMouseEnter={closeDropdown} />

            {session ? (
              <button
                className="flex items-center gap-1 text-xs font-medium tracking-[0.15em] text-[var(--ism-fg)] uppercase transition-opacity hover:opacity-70"
                onMouseEnter={() => openDropdown("Account")}
              >
                {session.user?.name?.split(" ")[0] || "Account"}
                <ChevronDown open={activeDropdown === "Account"} />
              </button>
            ) : (
              <div className="flex items-center gap-4" onMouseEnter={closeDropdown}>
                <Link
                  href={ROUTES.signIn}
                  className="text-xs font-medium tracking-[0.15em] text-[var(--ism-fg)] uppercase transition-opacity hover:opacity-70"
                >
                  Sign In
                </Link>
                <Button variant="ism" size="sm" asChild>
                  <Link href={ROUTES.signUp}>Join Now</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex size-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <HiXMark className="size-6" style={{ color: "var(--ism-fg)" }} />
            ) : (
              <HiOutlineBars3 className="size-6" style={{ color: "var(--ism-fg)" }} />
            )}
          </button>
        </div>

        {/* Full-width dropdown panel */}
        <AnimatePresence>
          {(activeItem || activeDropdown === "Account") && (
            <motion.div
              key={activeDropdown}
              className="hidden overflow-hidden border-t border-[var(--ism-border)] md:block"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
              }}
              onMouseLeave={closeDropdown}
            >
              <div className="flex items-start gap-72 px-6 py-10 lg:px-12 xl:px-16">
                {/* Left — headline */}
                <motion.div
                  key={`headline-${activeDropdown}`}
                  className="max-w-sm shrink-0 pt-1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-lg leading-snug font-semibold whitespace-pre-line text-[var(--ism-fg)]">
                    {activeDropdown === "Account"
                      ? "Manage your account\nand preferences"
                      : activeItem?.headline}
                  </p>
                </motion.div>

                {/* Right — links */}
                <div className="flex flex-col gap-1.5">
                  {(activeDropdown === "Account" ? accountLinks : (activeItem?.children ?? [])).map(
                    (child, i) => (
                      <motion.div
                        key={`${activeDropdown}-${child.href}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + i * 0.07,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center gap-1.5 py-1.5 transition-opacity hover:opacity-70"
                        >
                          <span className="text-base font-medium text-[var(--ism-fg)]">
                            {child.label}
                          </span>
                          <ChevronRight className="size-3.5 text-[var(--ism-fg-muted)] transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Page overlay when dropdown is open (Google-style dim) */}
      <AnimatePresence>
        {(activeItem || activeDropdown === "Account") && (
          <motion.div
            className="fixed inset-0 z-40 hidden md:block"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[var(--ism-bg-elevated)] px-8 pt-24 pb-12 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-10">
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label}>
                      <motion.span
                        custom={counter++}
                        variants={mobileItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-3 block text-[10px] font-semibold tracking-[0.2em] text-[var(--ism-fg-muted)] uppercase"
                      >
                        {item.label}
                      </motion.span>
                      <div className="flex flex-col gap-2">
                        {item.children.map((child) => (
                          <motion.div
                            key={child.href}
                            custom={counter++}
                            variants={mobileItem}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Link
                              href={child.href}
                              onClick={() => setMenuOpen(false)}
                              className="block"
                            >
                              <span className="text-2xl font-bold text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                                {child.label}
                              </span>
                              <span className="mt-0.5 block text-sm text-[var(--ism-fg-muted)]">
                                {child.description}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={item.href}
                    custom={counter++}
                    variants={mobileItem}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl font-bold text-[var(--ism-fg)] transition-opacity hover:opacity-70"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Account section */}
              {session ? (
                <div>
                  <motion.span
                    custom={counter++}
                    variants={mobileItem}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mb-3 block text-[10px] font-semibold tracking-[0.2em] text-[var(--ism-fg-muted)] uppercase"
                  >
                    Account
                  </motion.span>
                  <div className="flex flex-col gap-2">
                    {accountLinks.map((link) => (
                      <motion.div
                        key={link.href}
                        custom={counter++}
                        variants={mobileItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="text-2xl font-bold text-[var(--ism-fg)] transition-opacity hover:opacity-70"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      custom={counter++}
                      variants={mobileItem}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          signOut();
                        }}
                        className="text-2xl font-bold text-[var(--ism-fg-muted)] transition-opacity hover:opacity-70"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <motion.div
                    custom={counter++}
                    variants={mobileItem}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={ROUTES.signIn}
                      onClick={() => setMenuOpen(false)}
                      className="text-2xl font-bold text-[var(--ism-fg-muted)] transition-opacity hover:opacity-70"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div
                    custom={counter++}
                    variants={mobileItem}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-2"
                  >
                    <Button variant="ism" size="lg" asChild className="w-full">
                      <Link href={ROUTES.signUp} onClick={() => setMenuOpen(false)}>
                        Join Now
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
