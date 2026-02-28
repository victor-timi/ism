"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAppMutation } from "@/lib/hooks/use-app-mutation";
import { signInSchema, type SignInValues } from "@/lib/validations";
import { ROUTES } from "@/lib/routes";
import { AuthLayout } from "@/components/auth/auth-layout";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending, errorMessage } = useAppMutation<SignInValues>({
    mutationFn: async (data) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid email or password");
      }
    },
    onSuccess: () => {
      router.push(callbackUrl);
      router.refresh();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-5"
      >
        {errorMessage && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[var(--ism-fg)]">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="you@university.edu.au"
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[var(--ism-fg)]">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Your password"
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="ism"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
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
          href={ROUTES.signUp}
          className="font-medium text-[var(--ism-accent)] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
