"use client";

import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthSubmit } from "@/lib/hooks/use-auth-submit";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
      }

      if (password.length < 8) {
        return { error: "Password must be at least 8 characters" };
      }

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { error: data.error || "Something went wrong" };
        }

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          return {
            error:
              "Account created but failed to sign in. Please sign in manually.",
          };
        }

        router.push("/");
        router.refresh();
        return {};
      } catch {
        return { error: "Something went wrong. Please try again." };
      }
    },
    [router],
  );

  const { error, loading, handleSubmit } = useAuthSubmit({ onSubmit });

  return (
    <AuthLayout variant="sign-up">
      <div>
        <h1 className="text-3xl font-bold text-[var(--ism-fg)]">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-[var(--ism-fg-muted)]">
          Join ISM to find jobs, housing, and discounts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[var(--ism-fg)]">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[var(--ism-fg)]">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@university.edu.au"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[var(--ism-fg)]">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[var(--ism-fg)]">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Repeat your password"
            className="h-11"
          />
        </div>
        <Button
          type="submit"
          variant="ism"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--ism-fg-muted)]">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[var(--ism-accent)] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
