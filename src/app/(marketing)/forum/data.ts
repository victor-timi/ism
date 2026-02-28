import {
  HiChatBubbleLeftRight,
  HiBolt,
  HiShieldCheck,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
}

export const features: Feature[] = [
  {
    icon: HiChatBubbleLeftRight,
    title: "Organised Channels",
    description:
      "Dedicated channels for jobs, housing, visa questions, city-specific chats, and general discussions.",
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  },
  {
    icon: HiBolt,
    title: "Real-time Threads",
    description:
      "Instant replies, threaded conversations, and notifications so you never miss an important discussion.",
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    icon: HiShieldCheck,
    title: "Verified Profiles",
    description:
      "Verified student profiles ensure you're getting advice from real international students, not bots.",
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
  },
];
