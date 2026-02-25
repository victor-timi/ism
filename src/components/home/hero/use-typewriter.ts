import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, enabled: boolean, speed = 20) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      indexRef.current = 0;
      return;
    }

    if (indexRef.current >= text.length) return;

    const id = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, enabled, speed]);

  return displayed;
}
