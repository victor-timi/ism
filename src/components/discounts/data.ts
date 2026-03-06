export const categories = [
  { label: "All Categories", value: "all" },
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Tech", value: "tech" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Fitness", value: "fitness" },
  { label: "Groceries", value: "groceries" },
];

export const discountTypes = [
  { label: "All Types", value: "all" },
  { label: "Percentage", value: "percentage" },
  { label: "Fixed Amount", value: "fixed" },
  { label: "Free Trial", value: "free-trial" },
  { label: "Student Price", value: "student-price" },
];

export interface MockDiscount {
  id: string;
  title: string;
  company: string;
  discount: string;
  category: string;
  discountType: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export const mockDiscounts: MockDiscount[] = [
  {
    id: "1",
    title: "50% Off Spotify Premium",
    company: "Spotify",
    discount: "50% off",
    category: "entertainment",
    discountType: "percentage",
    description: "Half-price Premium plan with valid student email.",
    tags: ["Music", "Streaming"],
    featured: true,
  },
  {
    id: "2",
    title: "Free GitHub Pro",
    company: "GitHub",
    discount: "Free",
    category: "tech",
    discountType: "free-trial",
    description: "Full GitHub Pro access via the Student Developer Pack.",
    tags: ["Developer", "Tools"],
  },
  {
    id: "3",
    title: "$5 Off UberEats Orders",
    company: "Uber Eats",
    discount: "$5 off",
    category: "food",
    discountType: "fixed",
    description: "Weekly $5 discount on orders over $20 with student ID.",
    tags: ["Delivery", "Weekly"],
  },
  {
    id: "4",
    title: "Student Opal Card — 50% Off",
    company: "Transport NSW",
    discount: "50% off",
    category: "transport",
    discountType: "percentage",
    description: "Half-price public transport across the Opal network.",
    tags: ["Sydney", "Daily Use"],
  },
  {
    id: "5",
    title: "Apple Music — Student Plan",
    company: "Apple",
    discount: "$6.99/mo",
    category: "entertainment",
    discountType: "student-price",
    description: "Discounted Apple Music with free Apple TV+ included.",
    tags: ["Music", "Streaming"],
  },
  {
    id: "6",
    title: "10% Off at Woolworths",
    company: "Woolworths",
    discount: "10% off",
    category: "groceries",
    discountType: "percentage",
    description: "Show your student ID at checkout every Wednesday.",
    tags: ["Weekly", "In-Store"],
  },
  {
    id: "7",
    title: "Anytime Fitness — Student Rate",
    company: "Anytime Fitness",
    discount: "$12.95/wk",
    category: "fitness",
    discountType: "student-price",
    description: "Reduced weekly membership with valid student card.",
    tags: ["Gym", "No Lock-In"],
  },
  {
    id: "8",
    title: "Adobe Creative Cloud — 65% Off",
    company: "Adobe",
    discount: "65% off",
    category: "tech",
    discountType: "percentage",
    description: "Full Creative Cloud suite at the student rate.",
    tags: ["Design", "Creative"],
  },
  {
    id: "9",
    title: "$10 Off Hungry Jack's Meal Deal",
    company: "Hungry Jack's",
    discount: "$10 off",
    category: "food",
    discountType: "fixed",
    description: "Student meal deal: burger, fries & drink from $7.95.",
    tags: ["Fast Food", "In-Store"],
  },
];

export const featuredDiscount: MockDiscount = mockDiscounts.find(
  (d) => d.featured,
)!;

export const tips = [
  {
    title: "Verify Your Student ID",
    description:
      "Most discounts require a valid student ID or .edu email. Register on UNiDAYS or Student Beans to unlock hundreds of deals instantly.",
    icon: "id",
  },
  {
    title: "Stack Your Discounts",
    description:
      "Combine student discounts with cashback apps, loyalty programs, and sale events to maximise your savings on every purchase.",
    icon: "stack",
  },
  {
    title: "Check Expiry Dates",
    description:
      "Student deals often have expiry dates or limited redemptions. Bookmark your favourites and check back regularly so you don't miss out.",
    icon: "clock",
  },
] as const;
