export const ICON_COLOR = "var(--ism-accent)";

export const stats = [
  {
    value: "833,000+",
    target: 833000,
    format: (n: number) => Math.round(n).toLocaleString() + "+",
    label: "International Students",
    sublabel: "studying in Australia",
  },
  {
    value: "A$53.6B",
    target: 53.6,
    format: (n: number) => `A$${n.toFixed(1)}B`,
    label: "Economic Contribution",
    sublabel: "annual impact",
  },
  {
    value: "#3",
    target: 3,
    format: (n: number) => `#${Math.round(n)}`,
    label: "Top Export",
    sublabel: "largest service export",
  },
  {
    value: "50%+",
    target: 50,
    format: (n: number) => `${Math.round(n)}%+`,
    label: "Asia-Pacific",
    sublabel: "students from APAC",
  },
  {
    value: "~32%",
    target: 32,
    format: (n: number) => `~${Math.round(n)}%`,
    label: "University Enrolment",
    sublabel: "international share",
  },
];

export interface HeroIconDatum {
  heading: string;
  tagline: string;
  description: string;
  stat: string;
  statLabel: string;
  highlights: string[];
}

export const heroIconData: HeroIconDatum[] = [
  {
    heading: "Find Part-Time Work",
    tagline: "Jobs",
    description:
      "We pull listings from SEEK, Indeed, Jora and uni job boards — filtered for visa-friendly hours, casual roles, and locations near your campus.",
    stat: "2,400+",
    statLabel: "active listings",
    highlights: ["Visa-compliant", "Near campus", "Updated daily"],
  },
  {
    heading: "Find a Place to Live",
    tagline: "Housing",
    description:
      "Rooms, flatmates, and share houses aggregated from Flatmates.com.au, Gumtree, and uni portals — compare prices and find the right fit.",
    stat: "890+",
    statLabel: "rooms available",
    highlights: ["Price comparison", "Near transport", "Verified"],
  },
  {
    heading: "Save Money",
    tagline: "Discounts",
    description:
      "Student deals from UNiDAYS, Student Beans, OzBargain and more — food, transport, tech, entertainment — ranked by what students actually use.",
    stat: "$320",
    statLabel: "avg. saved / mo",
    highlights: ["Food & groceries", "Tech & software", "Transport"],
  },
];
