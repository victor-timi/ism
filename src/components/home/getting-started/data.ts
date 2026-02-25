import {
  HiOutlineUserPlus,
  HiOutlineMagnifyingGlass,
  HiOutlineBookmark,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export const steps = [
  {
    number: "01",
    icon: HiOutlineUserPlus,
    heading: "Create Your Account",
    description:
      "Name, email, done. No credit card, no verification hoops — you're browsing listings in under 30 seconds.",
    highlight: "< 30 seconds",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    accentColor: "text-emerald-500",
    iconBg: "rgba(16,185,129,0.15)",
    iconBgSubtle: "rgba(16,185,129,0.05)",
  },
  {
    number: "02",
    icon: HiOutlineMagnifyingGlass,
    heading: "Explore the Hub",
    description:
      "Jobs, housing, and deals from SEEK, Flatmates, OzBargain and more — filtered for your visa, your campus, your budget.",
    highlight: "3,300+ listings",
    gradient: "from-sky-500/20 via-sky-500/10 to-transparent",
    accentColor: "text-sky-500",
    iconBg: "rgba(14,165,233,0.15)",
    iconBgSubtle: "rgba(14,165,233,0.05)",
  },
  {
    number: "03",
    icon: HiOutlineBookmark,
    heading: "Save & Shortlist",
    description:
      "Bookmark anything that catches your eye. Build a personal shortlist of jobs, rooms, and deals you can come back to anytime.",
    highlight: "All in one place",
    gradient: "from-violet-500/20 via-violet-500/10 to-transparent",
    accentColor: "text-violet-500",
    iconBg: "rgba(139,92,246,0.15)",
    iconBgSubtle: "rgba(139,92,246,0.05)",
  },
  {
    number: "04",
    icon: HiOutlineUserGroup,
    heading: "Join 12k+ Students",
    description:
      "Get tips from students who've been there. Share advice, ask questions, and find your people across Australia.",
    highlight: "247 online now",
    gradient: "from-rose-500/20 via-rose-500/10 to-transparent",
    accentColor: "text-rose-500",
    iconBg: "rgba(244,63,94,0.15)",
    iconBgSubtle: "rgba(244,63,94,0.05)",
  },
] as const;
