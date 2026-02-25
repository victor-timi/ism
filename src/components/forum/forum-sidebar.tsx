import type { ForumChannel } from "./types";

export function ForumSidebar({
  channels,
  onlineUsers,
  onlineCount = 247,
}: {
  channels: ForumChannel[];
  onlineUsers: { avatar: string; color: string; name: string }[];
  onlineCount?: number;
}) {
  return (
    <div className="hidden w-48 shrink-0 border-r border-white/[0.04] p-3 lg:block">
      <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/25">
        Channels
      </p>
      {channels.map((ch) => (
        <div
          key={ch.name}
          className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] ${
            ch.active
              ? "bg-white/[0.06] font-medium text-emerald-400"
              : "text-white/35 hover:bg-white/[0.03] hover:text-white/50"
          }`}
        >
          <span># {ch.name}</span>
          {ch.count != null && (
            <span
              className={`rounded-full px-1.5 text-[10px] ${
                ch.active
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-white/[0.06] text-white/30"
              }`}
            >
              {ch.count}
            </span>
          )}
        </div>
      ))}

      <p className="mb-2 mt-4 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/25">
        Online — {onlineCount}
      </p>
      <div className="space-y-1">
        {onlineUsers.map((user) => (
          <div
            key={user.name}
            className="flex items-center gap-2 rounded-md px-2 py-1"
          >
            <div className="relative">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${user.color}`}
              >
                {user.avatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[#0f1f1a] bg-emerald-400" />
            </div>
            <span className="text-[11px] text-white/40">{user.name}</span>
          </div>
        ))}
        {onlineCount > onlineUsers.length && (
          <span className="block px-2 text-[10px] text-white/20">
            +{onlineCount - onlineUsers.length} more...
          </span>
        )}
      </div>
    </div>
  );
}
