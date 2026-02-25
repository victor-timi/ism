"use client";

import { Suspense, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthSubmit } from "@/lib/hooks/use-auth-submit";
import { AuthLayout } from "@/components/auth/auth-layout";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const result = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        return { error: "Invalid email or password" };
      }

      router.push(callbackUrl);
      router.refresh();
      return {};
    },
    [router, callbackUrl],
  );

  const { error, loading, handleSubmit } = useAuthSubmit({ onSubmit });

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}
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
          autoComplete="current-password"
          placeholder="Your password"
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
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <AuthLayout variant="sign-in">
      <div>
        <h1 className="text-3xl font-bold text-[var(--ism-fg)]">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[var(--ism-fg-muted)]">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="mt-8">
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--ism-fg-muted)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-[var(--ism-accent)] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
