import type { ForumChannel } from "./types";

export function ForumWindow({
  channels,
  channelTabs,
  title = "ISM Community",
  children,
}: {
  channels: ForumChannel[];
  channelTabs?: string[];
  title?: string;
  children: React.ReactNode;
}) {
  const tabs = channelTabs ?? channels.filter((c) => c.active || (c.count && c.count > 4)).map((c) => `# ${c.name}`);

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(180deg, #0f1f1a 0%, #0a1612 100%)",
        boxShadow:
          "0 24px 80px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
      }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-4 flex items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" />
          </div>
          <span className="text-xs font-semibold text-white/70">{title}</span>
        </div>
        {/* Channel tabs */}
        <div className="ml-auto hidden items-center gap-1 sm:flex">
          {tabs.map((ch, idx) => (
            <span
              key={ch}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                idx === 0
                  ? "bg-white/[0.08] text-emerald-400"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}
