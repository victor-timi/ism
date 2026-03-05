"use client";

import {
  useRef,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useMotionValue, useSpring } from "motion/react";

const springConfig = { stiffness: 300, damping: 25 };

/**
 * Shared 3D mouse-tilt hook.
 *
 * Returns a ref, event handlers, motion styles, and normalised mouse
 * coordinates (0-1) for consumers that derive extra visuals (e.g. glare).
 *
 * @param strength  Tilt intensity in degrees. 0 disables. Default 8.
 */
export function useTilt3D(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (strength === 0) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      rotateX.set((y - 0.5) * -strength);
      rotateY.set((x - 0.5) * strength);
    },
    [strength, rotateX, rotateY, mouseX, mouseY],
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    /** Spread onto a <motion.div> style prop */
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
      transformPerspective: 800,
      transformStyle: "preserve-3d" as const,
    },
    /** Normalised 0-1 mouse X (for derived effects like glare) */
    mouseX,
    /** Normalised 0-1 mouse Y */
    mouseY,
  } as const;
}
