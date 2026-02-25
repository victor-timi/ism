"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { ICON_COLOR, heroIconData } from "./data";
import { HeroIconDropdown } from "./hero-icon-dropdown";

export function HeroIllustration({
  containerRef,
}: {
  containerRef?: React.RefObject<HTMLElement | null>;
}) {
  const orbitsRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const housingRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  // Track which dropdown is open to raise its z-index above siblings.
  // Use functional updates so closing one icon doesn't clobber a newly opened one.
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const onJobsOpen = useCallback((open: boolean) => {
    setActiveLayer((prev) => (open ? "jobs" : prev === "jobs" ? null : prev));
  }, []);
  const onHousingOpen = useCallback((open: boolean) => {
    setActiveLayer((prev) => (open ? "housing" : prev === "housing" ? null : prev));
  }, []);
  const onDealsOpen = useCallback((open: boolean) => {
    setActiveLayer((prev) => (open ? "deals" : prev === "deals" ? null : prev));
  }, []);

  // Track mouse at window level for illustration parallax
  const localMouseRef = useRef({ x: -1000, y: -1000 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      localMouseRef.current.x = e.clientX;
      localMouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let frameId = 0;
    const layers = [
      { ref: orbitsRef, speed: 0.6, tx: 0, ty: 0, rotate: 0 },
      { ref: jobsRef, speed: 1.4, tx: 0, ty: 0, rotate: 0 },
      { ref: housingRef, speed: 1.0, tx: 0, ty: 0, rotate: 0 },
      { ref: dealsRef, speed: 1.8, tx: 0, ty: 0, rotate: 0 },
      { ref: dotsRef, speed: 0.4, tx: 0, ty: 0, rotate: 0 },
    ];

    const tick = () => {
      const mx = localMouseRef.current.x;
      const my = localMouseRef.current.y;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      for (const layer of layers) {
        if (!layer.ref.current) continue;

        if (mx > 0 && my > 0) {
          const targetX = ((mx - cx) / cx) * 30 * layer.speed;
          const targetY = ((my - cy) / cy) * 20 * layer.speed;
          const targetR = ((mx - cx) / cx) * 3 * layer.speed;
          layer.tx += (targetX - layer.tx) * 0.05;
          layer.ty += (targetY - layer.ty) * 0.05;
          layer.rotate += (targetR - layer.rotate) * 0.03;
        } else {
          layer.tx += (0 - layer.tx) * 0.03;
          layer.ty += (0 - layer.ty) * 0.03;
          layer.rotate += (0 - layer.rotate) * 0.03;
        }

        layer.ref.current.style.transform =
          `translate(${layer.tx}px, ${layer.ty}px) rotate(${layer.rotate}deg)`;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <motion.div
      className="pointer-events-none absolute right-4 top-[28%] z-[11] hidden -translate-y-[40%] lg:block xl:right-8"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-[480px] w-[480px] xl:h-[560px] xl:w-[560px]">

        {/* Layer 1: Orbital rings (decorative, parallax) */}
        <div ref={orbitsRef} className="pointer-events-none absolute inset-0">
          <svg viewBox="0 0 480 480" fill="none" className="h-full w-full">
            <ellipse
              cx="240" cy="240" rx="190" ry="65"
              stroke={ICON_COLOR} strokeWidth="1" strokeDasharray="5 7"
              opacity="0.3"
              transform="rotate(-20 240 240)"
            />
            <ellipse
              cx="240" cy="240" rx="165" ry="85"
              stroke={ICON_COLOR} strokeWidth="0.8" strokeDasharray="4 8"
              opacity="0.25"
              transform="rotate(35 240 240)"
            />
            <ellipse
              cx="240" cy="240" rx="145" ry="55"
              stroke={ICON_COLOR} strokeWidth="0.8" strokeDasharray="3 9"
              opacity="0.2"
              transform="rotate(-55 240 240)"
            />
            <circle cx="240" cy="240" r="90" fill={ICON_COLOR} opacity="0.025" />
            <circle cx="240" cy="240" r="45" fill={ICON_COLOR} opacity="0.04" />
          </svg>
        </div>

        {/* Interactive icon layers — each positioned independently (no inset-0 wrapper)
            so z-index works correctly for dropdowns */}

        {/* Jobs — top-right */}
        <div
          ref={jobsRef}
          className="pointer-events-auto absolute"
          style={{
            left: "62%",
            top: "22%",
            zIndex: activeLayer === "jobs" ? 30 : 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroIconDropdown {...heroIconData[0]} align="left" onOpenChange={onJobsOpen}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <IconBubble>
                  <rect x="28" y="36" width="24" height="16" rx="2.5" stroke={ICON_COLOR} strokeWidth="1.5" fill="none" />
                  <path d="M34 36v-4a3 3 0 013-3h6a3 3 0 013 3v4" stroke={ICON_COLOR} strokeWidth="1.5" fill="none" />
                  <line x1="28" y1="43" x2="52" y2="43" stroke={ICON_COLOR} strokeWidth="1" opacity="0.4" />
                </IconBubble>
              </motion.div>
            </HeroIconDropdown>
          </motion.div>
        </div>

        {/* Housing — bottom-right */}
        <div
          ref={housingRef}
          className="pointer-events-auto absolute"
          style={{
            left: "68%",
            top: "55%",
            zIndex: activeLayer === "housing" ? 30 : 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroIconDropdown {...heroIconData[1]} align="left" onOpenChange={onHousingOpen}>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <IconBubble>
                  <path d="M30 42v12h8v-8h4v8h8v-12" stroke={ICON_COLOR} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <path d="M27 43l13-11 13 11" stroke={ICON_COLOR} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </IconBubble>
              </motion.div>
            </HeroIconDropdown>
          </motion.div>
        </div>

        {/* Discounts — left */}
        <div
          ref={dealsRef}
          className="pointer-events-auto absolute"
          style={{
            left: "28%",
            top: "48%",
            zIndex: activeLayer === "deals" ? 30 : 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroIconDropdown {...heroIconData[2]} align="right" onOpenChange={onDealsOpen}>
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <IconBubble>
                  <circle cx="34" cy="36" r="2.5" stroke={ICON_COLOR} strokeWidth="1.5" fill="none" />
                  <circle cx="46" cy="46" r="2.5" stroke={ICON_COLOR} strokeWidth="1.5" fill="none" />
                  <line x1="47" y1="34" x2="33" y2="48" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
                </IconBubble>
              </motion.div>
            </HeroIconDropdown>
          </motion.div>
        </div>

        {/* Layer 5: Ambient dots (decorative, parallax) */}
        <div ref={dotsRef} className="pointer-events-none absolute inset-0">
          <svg viewBox="0 0 480 480" fill="none" className="h-full w-full">
            <motion.circle cx="130" cy="190" r="3" fill={ICON_COLOR} opacity="0.35"
              animate={{ opacity: [0.15, 0.45, 0.15], scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }} />
            <motion.circle cx="390" cy="200" r="2" fill={ICON_COLOR} opacity="0.3"
              animate={{ opacity: [0.12, 0.4, 0.12] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
            <motion.circle cx="280" cy="140" r="2.5" fill={ICON_COLOR} opacity="0.3"
              animate={{ opacity: [0.1, 0.35, 0.1], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} />
            <motion.circle cx="170" cy="340" r="3" fill={ICON_COLOR} opacity="0.25"
              animate={{ opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1.5 }} />
            <motion.circle cx="320" cy="360" r="2" fill={ICON_COLOR} opacity="0.2"
              animate={{ opacity: [0.08, 0.3, 0.08], scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }} />
            <motion.circle cx="400" cy="310" r="1.5" fill={ICON_COLOR} opacity="0.2"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }} />
            <motion.circle cx="210" cy="160" r="2" fill={ICON_COLOR} opacity="0.15"
              animate={{ opacity: [0.08, 0.25, 0.08] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1.2 }} />
          </svg>
        </div>

      </div>
    </motion.div>
  );
}

/** Premium glassmorphism icon bubble with gradient ring and glow */
function IconBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/icon relative">
      {/* Outer glow — visible on hover */}
      <div
        className="absolute -inset-3 rounded-full opacity-0 transition-opacity duration-500 group-hover/icon:opacity-100"
        style={{
          background: `radial-gradient(circle, rgba(4,120,87,0.25) 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />
      {/* Subtle ambient glow — always visible */}
      <div
        className="absolute -inset-1 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(4,120,87,0.08) 0%, transparent 70%)`,
        }}
      />
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        className="relative transition-transform duration-300 group-hover/icon:scale-110"
      >
        {/* Soft outer halo */}
        <circle cx="40" cy="40" r="38" fill={ICON_COLOR} opacity="0.08" />
        {/* Glassmorphism background — light translucent white */}
        <circle
          cx="40"
          cy="40"
          r="28"
          fill="white"
          fillOpacity="0.85"
          stroke={ICON_COLOR}
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        {/* Inner soft gradient overlay for depth */}
        <circle
          cx="40"
          cy="40"
          r="27"
          fill={ICON_COLOR}
          fillOpacity="0.04"
        />
        {/* Icon content */}
        {children}
      </svg>
    </div>
  );
}
