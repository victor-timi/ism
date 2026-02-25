"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSession } from "next-auth/react";
import type { ForumMessage, ForumChannel } from "./types";
import { GUEST_COLORS } from "./constants";
import { newMessageAnim } from "./variants";
import { ForumSidebar } from "./forum-sidebar";
import { ForumMessageItem } from "./forum-message-item";
import { ForumInput } from "./forum-input";
import { ForumWindow } from "./forum-window";

export function ForumFeed({
  initialMessages,
  channels,
  onlineCount = 247,
  channel = "general",
}: {
  initialMessages: ForumMessage[];
  channels: ForumChannel[];
  onlineCount?: number;
  channel?: string;
}) {
  const { data: session } = useSession();
  const [localMessages, setLocalMessages] = useState<ForumMessage[]>([]);

  const userName = session?.user?.name?.split(" ")[0] || "Guest";
  const userInitial = userName[0].toUpperCase();
  const userColor = session?.user?.name
    ? "bg-emerald-500/15 text-emerald-500"
    : GUEST_COLORS[Math.floor(Math.random() * GUEST_COLORS.length)];

  const handleSend = useCallback(
    (text: string) => {
      const newMsg: ForumMessage = {
        id: `local-${Date.now()}`,
        avatar: userInitial,
        color: userColor,
        name: userName,
        tag: session?.user?.name ? "You" : "Guest",
        message: text,
        reactions: [],
      };
      setLocalMessages((prev) => [...prev, newMsg]);
    },
    [userName, userInitial, userColor, session?.user?.name],
  );

  const onlineUsers = initialMessages.slice(0, 4).map((m) => ({
    avatar: m.avatar,
    color: m.color,
    name: m.name,
  }));

  return (
    <ForumWindow
      channels={channels}
      channelTabs={["# general", "# jobs", "# housing", "# deals"]}
    >
      <div className="flex">
        <ForumSidebar
          channels={channels}
          onlineUsers={onlineUsers}
          onlineCount={onlineCount}
        />

        <div className="min-w-0 flex-1">
          <div className="divide-y divide-white/[0.04]">
            {initialMessages.map((msg, i) => (
              <ForumMessageItem key={msg.id} msg={msg} index={i} />
            ))}

            {/* Local (user-sent) messages */}
            <AnimatePresence>
              {localMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={newMessageAnim}
                  initial="hidden"
                  animate="visible"
                >
                  <ForumMessageItem msg={msg} index={0} animated={false} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <ForumInput channel={channel} onSend={handleSend} />
        </div>
      </div>
    </ForumWindow>
  );
}
