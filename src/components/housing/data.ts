export const cities = [
  { label: "All Cities", value: "all" },
  { label: "Sydney", value: "sydney" },
  { label: "Melbourne", value: "melbourne" },
  { label: "Brisbane", value: "brisbane" },
  { label: "Perth", value: "perth" },
  { label: "Adelaide", value: "adelaide" },
  { label: "Canberra", value: "canberra" },
];

export const roomTypes = [
  { label: "All Types", value: "all" },
  { label: "Share House", value: "share-house" },
  { label: "Studio", value: "studio" },
  { label: "Student Accom", value: "student-accom" },
  { label: "Private Room", value: "private-room" },
];

export const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under $200/wk", value: "under-200" },
  { label: "$200–300/wk", value: "200-300" },
  { label: "$300+/wk", value: "300-plus" },
];

export interface MockHousing {
  id: string;
  title: string;
  provider: string;
  location: string;
  city: string;
  price: string;
  priceNum: number;
  roomType: string;
  available: string;
  tags: string[];
  featured?: boolean;
}

export const mockHousing: MockHousing[] = [
  {
    id: "1",
    title: "Sunny Room Near UNSW",
    provider: "Flatmates.com.au",
    location: "Kensington, Sydney",
    city: "sydney",
    price: "$250/wk",
    priceNum: 250,
    roomType: "share-house",
    available: "Available now",
    tags: ["Bills Included", "Near Campus"],
    featured: true,
  },
  {
    id: "2",
    title: "Modern Studio — CBD",
    provider: "Urbanest",
    location: "CBD, Melbourne",
    city: "melbourne",
    price: "$320/wk",
    priceNum: 320,
    roomType: "studio",
    available: "From Mar 15",
    tags: ["Furnished", "Gym Access"],
  },
  {
    id: "3",
    title: "UniLodge Room — UQ",
    provider: "UniLodge",
    location: "St Lucia, Brisbane",
    city: "brisbane",
    price: "$280/wk",
    priceNum: 280,
    roomType: "student-accom",
    available: "Available now",
    tags: ["Meal Plan", "Study Rooms"],
  },
  {
    id: "4",
    title: "Private Room — Quiet House",
    provider: "Private Listing",
    location: "Nedlands, Perth",
    city: "perth",
    price: "$190/wk",
    priceNum: 190,
    roomType: "private-room",
    available: "From Apr 1",
    tags: ["Near UWA", "Garden"],
  },
  {
    id: "5",
    title: "Share House — Glebe",
    provider: "Flatmates.com.au",
    location: "Glebe, Sydney",
    city: "sydney",
    price: "$220/wk",
    priceNum: 220,
    roomType: "share-house",
    available: "Available now",
    tags: ["Furnished", "Near Transport"],
  },
  {
    id: "6",
    title: "Student Apartment — Iglu",
    provider: "Iglu",
    location: "South Brisbane, Brisbane",
    city: "brisbane",
    price: "$310/wk",
    priceNum: 310,
    roomType: "student-accom",
    available: "From Mar 20",
    tags: ["All Bills", "Rooftop Pool"],
  },
  {
    id: "7",
    title: "Cozy Studio — North Adelaide",
    provider: "Private Listing",
    location: "North Adelaide, Adelaide",
    city: "adelaide",
    price: "$195/wk",
    priceNum: 195,
    roomType: "studio",
    available: "Available now",
    tags: ["Near UniSA", "Quiet Street"],
  },
  {
    id: "8",
    title: "Share House — Carlton",
    provider: "Flatmates.com.au",
    location: "Carlton, Melbourne",
    city: "melbourne",
    price: "$210/wk",
    priceNum: 210,
    roomType: "share-house",
    available: "From Apr 5",
    tags: ["Near UniMelb", "Tram Stop"],
  },
  {
    id: "9",
    title: "Private Room — Braddon",
    provider: "Private Listing",
    location: "Braddon, Canberra",
    city: "canberra",
    price: "$230/wk",
    priceNum: 230,
    roomType: "private-room",
    available: "Available now",
    tags: ["Near ANU", "Bills Included"],
  },
];

export const featuredHousing: MockHousing = mockHousing.find(
  (h) => h.featured,
)!;

export const tips = [
  {
    title: "Know Your Bond Rights",
    description:
      "Your bond (security deposit) is held by a government authority, not your landlord. You're entitled to a full refund if you leave the property in good condition.",
    icon: "shield",
  },
  {
    title: "Inspect Before Signing",
    description:
      "Always visit the property in person and complete a condition report. Take photos of any existing damage to protect yourself when you move out.",
    icon: "eye",
  },
  {
    title: "Check Your Lease Terms",
    description:
      "Understand the notice period, break lease fees, and what's included in rent (utilities, internet, furniture) before you sign anything.",
    icon: "document",
  },
] as const;
