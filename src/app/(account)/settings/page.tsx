"use client";

import { useSyncExternalStore } from "react";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { HiUser } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cardVariants } from "@/components/animations/variants";
import { useTheme } from "@/components/layout/theme-provider";
import { themeOptions } from "./data";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const name = session?.user?.name || "Not set";
  const email = session?.user?.email || "Not set";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <motion.div
        variants={cardVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <GlassCard className="p-8" gradient="from-emerald-500/20 via-emerald-400/10 to-transparent">
          <div className="flex items-start gap-6">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--ism-accent) 0%, rgba(16,185,129,0.8) 100%)",
              }}
            >
              {initials || <HiUser className="h-8 w-8" />}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[var(--ism-fg)]">
                {name}
              </h3>
              <p className="mt-0.5 text-sm text-[var(--ism-fg-muted)]">
                {email}
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Edit Profile
              </Button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Appearance Card */}
      <motion.div
        variants={cardVariants}
        custom={1}
        initial="hidden"
        animate="visible"
      >
        <GlassCard className="p-8" gradient="from-indigo-500/20 via-violet-400/10 to-transparent">
          <h3 className="text-lg font-bold text-[var(--ism-fg)]">
            Appearance
          </h3>
          <p className="mt-1 text-sm text-[var(--ism-fg-muted)]">
            Choose how ISM looks to you.
          </p>
          <Separator className="my-5" />

          <div className="grid grid-cols-3 gap-4">
            {themeOptions.map((option) => {
              const isActive = mounted && theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                    isActive
                      ? "border-[var(--ism-accent)] bg-[var(--ism-accent)]/5"
                      : "border-[var(--ism-border)] hover:border-[var(--ism-accent)]/30"
                  }`}
                >
                  {/* Preview */}
                  <div
                    className={`flex h-20 w-full items-center justify-center rounded-lg ${
                      option.value === "dark"
                        ? "bg-[#0A1210]"
                        : option.value === "system"
                          ? "bg-gradient-to-r from-[#FAFAF7] to-[#0A1210]"
                          : "bg-[#FAFAF7]"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <option.icon
                        className={`h-6 w-6 ${
                          option.value === "dark"
                            ? "text-emerald-400"
                            : option.value === "system"
                              ? "text-emerald-500"
                              : "text-emerald-700"
                        }`}
                      />
                      <div className="flex gap-1">
                        <div
                          className={`h-1.5 w-6 rounded-full ${
                            option.value === "dark"
                              ? "bg-white/20"
                              : option.value === "system"
                                ? "bg-white/30"
                                : "bg-[#1A1A2E]/10"
                          }`}
                        />
                        <div
                          className={`h-1.5 w-4 rounded-full ${
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

      {/* Preferences Card */}
      <motion.div
        variants={cardVariants}
        custom={2}
        initial="hidden"
        animate="visible"
      >
        <GlassCard className="p-8">
          <h3 className="text-lg font-bold text-[var(--ism-fg)]">
            Preferences
          </h3>
          <Separator className="my-4" />
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--ism-fg)]">
                  Email Notifications
                </p>
                <p className="text-xs text-[var(--ism-fg-muted)]">
                  Receive alerts and updates via email
                </p>
              </div>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Enabled
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--ism-fg)]">
                  Alert Frequency
                </p>
                <p className="text-xs text-[var(--ism-fg-muted)]">
                  How often you receive listing alerts
                </p>
              </div>
              <Badge variant="secondary">Daily</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--ism-fg)]">
                  Preferred Cities
                </p>
                <p className="text-xs text-[var(--ism-fg-muted)]">
                  Cities to prioritise in your feed
                </p>
              </div>
              <Badge variant="secondary">All Cities</Badge>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        variants={cardVariants}
        custom={3}
        initial="hidden"
        animate="visible"
      >
        <GlassCard className="p-8">
          <h3 className="text-lg font-bold text-red-500">Danger Zone</h3>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--ism-fg)]">
                Delete Account
              </p>
              <p className="text-xs text-[var(--ism-fg-muted)]">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
