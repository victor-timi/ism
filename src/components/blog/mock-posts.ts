export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Part-Time Jobs for International Students in Sydney",
    excerpt:
      "From barista roles to campus tutoring gigs — here are the best part-time jobs that work around your uni schedule and meet visa requirements.",
    category: "Jobs",
    author: "Sarah Chen",
    date: "Feb 20, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "2",
    title: "How to Find Affordable Housing in Melbourne",
    excerpt:
      "Melbourne's rental market can be tough. Here's a step-by-step guide to finding affordable share houses and student accommodation.",
    category: "Housing",
    author: "Raj Patel",
    date: "Feb 18, 2026",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Student Discounts You Didn't Know Existed",
    excerpt:
      "Apple, Spotify, transport — these are the hidden student discounts that can save you hundreds of dollars every semester.",
    category: "Discounts",
    author: "Lisa Nguyen",
    date: "Feb 15, 2026",
    readTime: "4 min read",
  },
  {
    id: "4",
    title: "Navigating Your Student Visa: Work Rights Explained",
    excerpt:
      "Understanding your work rights on a student visa (subclass 500) — hours, conditions, and what happens during semester breaks.",
    category: "Visa Guide",
    author: "Ahmed Hassan",
    date: "Feb 12, 2026",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "The Ultimate Guide to Opening a Bank Account in Australia",
    excerpt:
      "Which bank is best for students? NAB, CommBank, or a neo-bank? We compare fees, features, and student perks.",
    category: "Finance",
    author: "Maria Santos",
    date: "Feb 10, 2026",
    readTime: "5 min read",
  },
  {
    id: "6",
    title: "Building Your Network: Career Events for Students in 2026",
    excerpt:
      "From university career fairs to industry meetups — a curated calendar of networking events across major Australian cities.",
    category: "Career",
    author: "James Park",
    date: "Feb 8, 2026",
    readTime: "4 min read",
  },
];
