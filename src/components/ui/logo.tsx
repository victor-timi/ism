import type { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * ISM brand mark — stylised "M" peaks representing
 * Movement, growth, and aspiration.
 */
export function Logo({ size = 32, className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-label="ISM logo"
      role="img"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="var(--ism-accent)" />
      <path
        d="M7 24L12.5 8L16 18L19.5 8L25 24"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
