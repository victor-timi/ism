"use client";

import { useState } from "react";
import { HiLink, HiCheck } from "react-icons/hi2";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[var(--ism-fg-muted)] transition-all hover:border-amber-500/30 hover:text-amber-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        {copied ? (
          <HiCheck className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <HiLink className="h-3.5 w-3.5" />
        )}
        {copied ? "Copied!" : "Copy link"}
      </button>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[var(--ism-fg-muted)] transition-all hover:border-green-500/30 hover:text-green-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        WhatsApp
      </a>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[var(--ism-fg-muted)] transition-all hover:border-sky-500/30 hover:text-sky-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        X / Twitter
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[var(--ism-fg-muted)] transition-all hover:border-blue-500/30 hover:text-blue-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        Facebook
      </a>
    </div>
  );
}
