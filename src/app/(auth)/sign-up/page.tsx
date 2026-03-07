"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormAlert } from "@/components/ui/form-alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAppMutation } from "@/lib/hooks/use-app-mutation";
import { apiClient } from "@/lib/api/client";
import { signUpSchema, type SignUpValues } from "@/lib/validations";
import { ROUTES } from "@/lib/routes";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const { mutate, isPending, errorMessage } = useAppMutation<SignUpValues>({
    mutationFn: async (data) => {
      await apiClient.post("/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          "Account created but failed to sign in. Please sign in manually.",
        );
      }
    },
    onSuccess: () => {
      router.push(ROUTES.home);
      router.refresh();
    },
  });

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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="mt-8 space-y-5"
        >
          <FormAlert message={errorMessage} />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--ism-fg)]">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <PasswordInput
                    {...field}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--ism-fg)]">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    autoComplete="new-password"
                    placeholder="Repeat your password"
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
            loading={isPending}
          >
            Create Account
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-[var(--ism-fg-muted)]">
        Already have an account?{" "}
        <Link
          href={ROUTES.signIn}
          className="font-medium text-[var(--ism-accent)] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
