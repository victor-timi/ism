"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";

interface UseAppMutationOptions<TData, TResult> {
  mutationFn: (data: TData) => Promise<TResult>;
  onSuccess?: (result: TResult) => void;
}

export function useAppMutation<TData, TResult = unknown>({
  mutationFn,
  onSuccess,
}: UseAppMutationOptions<TData, TResult>) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn,
    onMutate: () => {
      setErrorMessage(null);
    },
    onSuccess: (result) => {
      onSuccess?.(result);
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    errorMessage,
  };
}
