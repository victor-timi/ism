export function LoadingBars() {
  return (
    <>
      <style>{`
        @keyframes pulse-bar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      <span className="inline-flex items-center gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3.5 w-[3px] rounded-full bg-current"
            style={{
              animation: "pulse-bar 0.8s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </span>
    </>
  );
}
