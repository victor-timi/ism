export const cities = [
  { label: "All Cities", value: "all" },
  { label: "Sydney", value: "sydney" },
  { label: "Melbourne", value: "melbourne" },
  { label: "Brisbane", value: "brisbane" },
  { label: "Perth", value: "perth" },
  { label: "Adelaide", value: "adelaide" },
  { label: "Canberra", value: "canberra" },
];

export const jobTypes = [
  { label: "All Types", value: "all" },
  { label: "Part-Time", value: "part-time" },
  { label: "Casual", value: "casual" },
  { label: "Internship", value: "internship" },
  { label: "Freelance", value: "freelance" },
];

export const industries = [
  { label: "All Industries", value: "all" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Retail", value: "retail" },
  { label: "Tutoring", value: "tutoring" },
  { label: "Admin", value: "admin" },
  { label: "IT & Tech", value: "tech" },
  { label: "Delivery", value: "delivery" },
];

export interface MockJob {
  id: string;
  title: string;
  company: string;
  location: string;
  city: string;
  salary: string;
  type: string;
  industry: string;
  posted: string;
  tags: string[];
  featured?: boolean;
}

export const mockJobs: MockJob[] = [
  {
    id: "1",
    title: "Barista — Weekend Shifts",
    company: "The Grounds of Alexandria",
    location: "Alexandria, Sydney",
    city: "sydney",
    salary: "$28–32/hr",
    type: "casual",
    industry: "hospitality",
    posted: "2 hours ago",
    tags: ["Visa OK", "Flexible Hours"],
    featured: true,
  },
  {
    id: "2",
    title: "Retail Assistant",
    company: "Uniqlo",
    location: "CBD, Melbourne",
    city: "melbourne",
    salary: "$26–30/hr",
    type: "part-time",
    industry: "retail",
    posted: "5 hours ago",
    tags: ["Visa OK", "Near Campus"],
  },
  {
    id: "3",
    title: "Maths & Physics Tutor",
    company: "Cluey Learning",
    location: "Remote / Online",
    city: "sydney",
    salary: "$35–45/hr",
    type: "freelance",
    industry: "tutoring",
    posted: "1 day ago",
    tags: ["Remote", "Flexible Hours"],
  },
  {
    id: "4",
    title: "Admin Assistant",
    company: "University of Queensland",
    location: "St Lucia, Brisbane",
    city: "brisbane",
    salary: "$27–31/hr",
    type: "part-time",
    industry: "admin",
    posted: "3 hours ago",
    tags: ["On Campus", "Visa OK"],
  },
  {
    id: "5",
    title: "Junior Web Developer",
    company: "Canva",
    location: "Surry Hills, Sydney",
    city: "sydney",
    salary: "$38–45/hr",
    type: "internship",
    industry: "tech",
    posted: "1 day ago",
    tags: ["Visa OK", "Tech"],
  },
  {
    id: "6",
    title: "Food Delivery Rider",
    company: "DoorDash",
    location: "Various, Melbourne",
    city: "melbourne",
    salary: "$22–28/hr",
    type: "casual",
    industry: "delivery",
    posted: "6 hours ago",
    tags: ["Flexible Hours", "Visa OK"],
  },
  {
    id: "7",
    title: "Hotel Front Desk",
    company: "Hilton Adelaide",
    location: "CBD, Adelaide",
    city: "adelaide",
    salary: "$27–32/hr",
    type: "part-time",
    industry: "hospitality",
    posted: "12 hours ago",
    tags: ["Visa OK", "Weekends"],
  },
  {
    id: "8",
    title: "Campus Ambassador",
    company: "Student Beans",
    location: "Various, Perth",
    city: "perth",
    salary: "$25–28/hr",
    type: "casual",
    industry: "retail",
    posted: "2 days ago",
    tags: ["On Campus", "Flexible Hours"],
  },
  {
    id: "9",
    title: "Data Entry Clerk",
    company: "Deloitte",
    location: "Civic, Canberra",
    city: "canberra",
    salary: "$29–33/hr",
    type: "part-time",
    industry: "admin",
    posted: "1 day ago",
    tags: ["Visa OK", "CBD"],
  },
];

export const featuredJob: MockJob = mockJobs.find((j) => j.featured)!;

export const tips = [
  {
    title: "Know Your Work Rights",
    description:
      "Student visa holders can work up to 48 hours per fortnight during semester. There's no limit during scheduled breaks.",
    icon: "shield",
  },
  {
    title: "Track Your Hours",
    description:
      "Use the Fair Work Ombudsman's tools to record your shifts and make sure you're paid correctly — including penalty rates.",
    icon: "clock",
  },
  {
    title: "Get Your TFN",
    description:
      "Apply for a Tax File Number (TFN) from the ATO as soon as you arrive. You'll need it before you start any paid work.",
    icon: "document",
  },
] as const;
