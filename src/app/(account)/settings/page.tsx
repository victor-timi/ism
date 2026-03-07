"use client";

import { useSyncExternalStore } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "motion/react";
import {
  HiUser,
  HiArrowRightOnRectangle,
  HiTrash,
} from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cardVariants } from "@/components/animations/variants";
import { useTheme } from "@/components/layout/theme-provider";
import { ROUTES } from "@/lib/routes";
import { themeOptions, preferenceItems } from "./data";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const name = session?.user?.name ?? "User";
  const email = session?.user?.email ?? "";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <motion.div
        variants={cardVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <GlassCard
          className="p-6"
          gradient="from-emerald-500/20 via-emerald-400/10 to-transparent"
        >
          <div className="flex items-center gap-5">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--ism-accent) 0%, rgba(16,185,129,0.8) 100%)",
              }}
            >
              {initials || <HiUser className="h-7 w-7" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <h3 className="truncate text-lg font-bold text-[var(--ism-fg)]">
                  {name}
                </h3>
                <Badge
                  variant="secondary"
                  className="shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  Member
                </Badge>
              </div>
              {email && (
                <p className="mt-0.5 truncate text-sm text-[var(--ism-fg-muted)]">
                  {email}
                </p>
              )}
            </div>
            <Badge
              variant="secondary"
              className="shrink-0 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              Coming Soon
            </Badge>
          </div>
          <p className="mt-3 text-xs text-[var(--ism-fg-muted)]">
            Profile editing will be available soon.
          </p>
        </GlassCard>
      </motion.div>

      {/* Appearance Card */}
      <motion.div
        variants={cardVariants}
        custom={1}
        initial="hidden"
        animate="visible"
      >
        <GlassCard
          className="p-6"
          gradient="from-indigo-500/20 via-violet-400/10 to-transparent"
        >
          <h3 className="text-lg font-bold text-[var(--ism-fg)]">
            Appearance
          </h3>
          <p className="mt-1 text-sm text-[var(--ism-fg-muted)]">
            Choose how ISM looks to you.
          </p>
          <Separator className="my-4" />

          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const isActive = mounted && theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`group relative flex flex-col items-center gap-2.5 rounded-xl border-2 p-4 transition-all ${
                    isActive
                      ? "border-[var(--ism-accent)] bg-[var(--ism-accent)]/5"
                      : "border-[var(--ism-border)] hover:border-[var(--ism-accent)]/30"
                  }`}
                >
                  <div
                    className={`flex h-16 w-full items-center justify-center rounded-lg ${
                      option.value === "dark"
                        ? "bg-[#0A1210]"
                        : option.value === "system"
                          ? "bg-gradient-to-r from-[#FAFAF7] to-[#0A1210]"
                          : "bg-[#FAFAF7]"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <option.icon
                        className={`h-5 w-5 ${
                          option.value === "dark"
                            ? "text-emerald-400"
                            : option.value === "system"
                              ? "text-emerald-500"
                              : "text-emerald-700"
                        }`}
                      />
                      <div className="flex gap-1">
                        <div
                          className={`h-1 w-5 rounded-full ${
                            option.value === "dark"
                              ? "bg-white/20"
                              : option.value === "system"
                                ? "bg-white/30"
                                : "bg-[#1A1A2E]/10"
                          }`}
                        />
                        <div
                          className={`h-1 w-3 rounded-full ${
                            option.value === "dark"
                              ? "bg-white/10"
                              : option.value === "system"
                                ? "bg-white/15"
                                : "bg-[#1A1A2E]/5"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-semibold text-[var(--ism-fg)]">
                      {option.label}
                    </p>
                    <p className="text-xs text-[var(--ism-fg-muted)]">
                      {option.description}
                    </p>
                  </div>

                  {isActive && (
                    <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ism-accent)] text-white">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Notifications & Preferences Card */}
      <motion.div
        variants={cardVariants}
        custom={2}
        initial="hidden"
        animate="visible"
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--ism-fg)]">
              Notifications & Preferences
            </h3>
            <Badge
              variant="secondary"
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              Coming Soon
            </Badge>
          </div>
          <p className="mt-1 text-sm text-[var(--ism-fg-muted)]">
            Configure how and when you hear from us.
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            {preferenceItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-[var(--ism-border)] p-3 opacity-60"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(4,120,87,0.12) 0%, rgba(16,185,129,0.06) 100%)",
                  }}
                >
                  <item.icon className="h-4 w-4 text-[var(--ism-accent)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--ism-fg)]">
                    {item.label}
                  </p>
                  <p className="text-xs text-[var(--ism-fg-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Account & Security Card */}
      <motion.div
        variants={cardVariants}
        custom={3}
        initial="hidden"
        animate="visible"
      >
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-[var(--ism-fg)]">
            Account & Security
          </h3>
          <Separator className="my-4" />
          <div className="space-y-4">
            {/* Sign Out */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(4,120,87,0.12) 0%, rgba(16,185,129,0.06) 100%)",
                  }}
                >
                  <HiArrowRightOnRectangle className="h-4 w-4 text-[var(--ism-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--ism-fg)]">
                    Sign Out
                  </p>
                  <p className="text-xs text-[var(--ism-fg-muted)]">
                    Sign out of your account on this device
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: ROUTES.home })}
              >
                Sign Out
              </Button>
            </div>

            <Separator />

            {/* Delete Account */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                  <HiTrash className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--ism-fg)]">
                    Delete Account
                  </p>
                  <p className="text-xs text-[var(--ism-fg-muted)]">
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                Coming Soon
              </Badge>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
