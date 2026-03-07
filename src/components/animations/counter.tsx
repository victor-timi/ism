"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";

interface CounterProps {
  /** The final display string, e.g. "833,000+" or "A$53.6B" */
  value: string;
  /** Numeric target for the count-up animation */
  target: number;
  decimals?: number;
  /** Formatter to produce the display string from the animated number */
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  target,
  decimals = 0,
  format,
  duration = 2.5,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  const doneRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!isInView) {
      // Show final value when out of view so it doesn't flash "0"
      doneRef.current = false;
      el.textContent = value;
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      onUpdate(v) {
        if (format) {
          el.textContent = format(v);
        } else {
          el.textContent = Math.round(v).toLocaleString();
        }
      },
      onComplete() {
        el.textContent = value;
        doneRef.current = true;
      },
    });

    return () => controls.stop();
  }, [isInView, target, value, format, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
