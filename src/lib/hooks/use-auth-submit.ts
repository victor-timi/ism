"use client";

import { useState, useCallback } from "react";

interface UseAuthSubmitOptions {
  onSubmit: (formData: FormData) => Promise<{ error?: string }>;
}

export function useAuthSubmit({ onSubmit }: UseAuthSubmitOptions) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const result = await onSubmit(formData);

      if (result.error) {
        setError(result.error);
      }

      setLoading(false);
    },
    [onSubmit],
  );

  return { error, loading, handleSubmit };
}
