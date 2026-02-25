import { useSyncExternalStore, useEffect, useRef, useCallback } from "react";

export function useTypewriter(text: string, enabled: boolean, speed = 20) {
  const displayRef = useRef("");
  const indexRef = useRef(0);
  const listenersRef = useRef(new Set<() => void>());

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const getSnapshot = useCallback(() => displayRef.current, []);

  useEffect(() => {
    if (!enabled) {
      displayRef.current = "";
      indexRef.current = 0;
      listenersRef.current.forEach((cb) => cb());
      return;
    }

    if (indexRef.current >= text.length) return;

    const id = setInterval(() => {
      indexRef.current += 1;
      displayRef.current = text.slice(0, indexRef.current);
      listenersRef.current.forEach((cb) => cb());
      if (indexRef.current >= text.length) {
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, enabled, speed]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
