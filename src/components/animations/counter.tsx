"use client";

import { useEffect, useRef, useState } from "react";
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
  const isInView = useInView(ref, { once: false, margin: "0px" });
  const [display, setDisplay] = useState("0");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) {
      // Reset when leaving view so animation replays on re-entry
      setDone(false);
      setDisplay("0");
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      onUpdate(v) {
        if (format) {
          setDisplay(format(v));
        } else {
          setDisplay(Math.round(v).toLocaleString());
        }
      },
      onComplete() {
        setDisplay(value);
        setDone(true);
      },
    });

    return () => controls.stop();
  }, [isInView, target, value, format, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {done ? value : display}
    </span>
  );
}
