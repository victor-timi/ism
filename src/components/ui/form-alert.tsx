"use client";

import { useState } from "react";
import { HiExclamationTriangle, HiXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface FormAlertProps {
  message: string | null;
  className?: string;
}

export function FormAlert({ message, className }: FormAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!message || dismissed) return null;

  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-3 rounded-lg border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur-sm dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400",
        "animate-in fade-in slide-in-from-top-1 duration-300",
        className,
      )}
    >
      <HiExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1 font-medium">{message}</p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded-md p-0.5 text-red-500/60 transition-colors hover:text-red-700 dark:hover:text-red-300"
        aria-label="Dismiss"
      >
        <HiXMark className="h-4 w-4" />
      </button>
    </div>
  );
}
