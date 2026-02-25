import {
  HiOutlineBriefcase,
  HiOutlineHomeModern,
  HiOutlineTicket,
} from "react-icons/hi2";
import type { ForumMessage, ForumChannel } from "@/components/forum";

export const pillars = [
  {
    icon: HiOutlineBriefcase,
    heading: "Find Part-Time Work",
    tagline: "Jobs that fit your student visa & schedule",
    description:
      "We pull listings from SEEK, Indeed, Jora and university job boards — then filter them for visa-friendly hours, casual & part-time roles, and locations near campuses. No more scrolling five different sites.",
    highlights: ["Visa-compliant hours", "Near your campus", "Updated daily"],
    href: "/hub?tab=jobs",
    cta: "Browse jobs",
    stat: "2,400+",
    statLabel: "active listings",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    icon: HiOutlineHomeModern,
    heading: "Find a Place to Live",
    tagline: "Flatmates, rooms & share houses — verified",
    description:
      "Moving to a new city is stressful enough. We aggregate listings from Flatmates.com.au, Gumtree, and uni housing portals so you can compare prices, locations, and find housemates who get it.",
    highlights: ["Price comparison", "Near transport", "Housemate matching"],
    href: "/hub?tab=housing",
    cta: "Browse housing",
    stat: "890+",
    statLabel: "rooms available",
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
  },
  {
    icon: HiOutlineTicket,
    heading: "Save Money",
    tagline: "Student discounts you actually want",
    description:
      "Your budget matters. We track deals from UNiDAYS, Student Beans, OzBargain and more — food, transport, tech, entertainment — ranked by what students actually use, not what companies want to push.",
    highlights: ["Food & groceries", "Tech & software", "Transport deals"],
    href: "/hub?tab=discounts",
    cta: "Browse discounts",
    stat: "$320",
    statLabel: "avg. saved / month",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
] as const;

export const forumMessages: ForumMessage[] = [
  {
    id: "1",
    avatar: "P",
    color: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    name: "Priya",
    tag: "UNSW · India",
    message:
      "Just found a barista job near campus through ISM — 15hrs/week, perfect for my visa!",
    reactions: ["🎉 12", "💪 5"],
  },
  {
    id: "2",
    avatar: "K",
    color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    name: "Kevin",
    tag: "UniMelb · China",
    message:
      "Woolworths student discount saved me $40 this month. Also looking for a flatmate in Carlton — DM me!",
    reactions: ["👀 8", "🙌 3"],
  },
  {
    id: "3",
    avatar: "A",
    color: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    name: "Amira",
    tag: "UQ · Malaysia",
    message:
      "PSA: 30% off at Boost Juice via Finder. Added it to the Hub discounts tab 🧃",
    reactions: ["❤️ 15", "🧃 7"],
  },
  {
    id: "4",
    avatar: "D",
    color: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
    name: "Daniel",
    tag: "UTS · Colombia",
    message:
      "Moving to Sydney next semester — this community has been so helpful with housing tips. Already saved 3 listings!",
    reactions: ["🏠 6", "💚 4"],
  },
  {
    id: "5",
    avatar: "S",
    color: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    name: "Sakura",
    tag: "Monash · Japan",
    message:
      "Just got my tax file number sorted thanks to the guide someone posted here. Life saver!",
    reactions: ["🙏 22", "✨ 9"],
  },
];

export const forumChannels: ForumChannel[] = [
  { name: "general", count: 14, active: true },
  { name: "jobs", count: 8 },
  { name: "housing", count: 5 },
  { name: "deals", count: 11 },
  { name: "visa-help", count: 3 },
  { name: "events", count: 2 },
];

export const communityStats = [
  { value: "12.4k", label: "Members" },
  { value: "3.2k", label: "Topics" },
  { value: "247", label: "Online now" },
];
