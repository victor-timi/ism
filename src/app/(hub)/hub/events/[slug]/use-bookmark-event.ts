"use client";

import { useState, useEffect, useCallback } from "react";

export function useBookmarkEvent(eventId: string) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/saved-events?eventId=${eventId}`)
      .then((res) => res.json())
      .then((data) => setIsSaved(data.saved))
      .catch(() => {});
  }, [eventId]);

  const toggle = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/saved-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.saved);
      }
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  return { isSaved, toggle, loading };
}
