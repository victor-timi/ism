import type { SanityEvent } from "@/types/event";

/**
 * Mock events for client UI review while Sanity CMS has no published events.
 * Remove this file (and the fallback in page.tsx) once real events are published.
 */

const futureDate = (daysFromNow: number, hour = 18) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const mockEvents: SanityEvent[] = [
  {
    _id: "mock-1",
    title: "International Students Welcome Night",
    slug: "welcome-night-sydney",
    datetime: futureDate(3, 18),
    location: "The Rocks, Sydney",
    address: "Museum of Contemporary Art",
    city: "sydney",
    category: "social",
    cost: "Free",
    registrationUrl: "#",
    isFeatured: true,
    snippet:
      "Kick off the semester with food, music, and networking. Meet students from over 40 countries in one night.",
    hostName: "ISM Community",
  },
  {
    _id: "mock-2",
    title: "Tech Career Fair 2026",
    slug: "tech-career-fair-melbourne",
    datetime: futureDate(7, 10),
    endDatetime: futureDate(7, 17),
    location: "Melbourne Convention Centre",
    address: "1 Convention Centre Pl, South Wharf",
    city: "melbourne",
    category: "career",
    cost: "Free",
    registrationUrl: "#",
    snippet:
      "Connect with top employers hiring international graduates. Bring your CV and meet recruiters from Canva, Atlassian, and more.",
    hostName: "Careers Australia",
  },
  {
    _id: "mock-3",
    title: "Lunar New Year Cultural Festival",
    slug: "lunar-new-year-brisbane",
    datetime: futureDate(5, 16),
    location: "South Bank, Brisbane",
    address: "South Bank Parklands",
    city: "brisbane",
    category: "cultural",
    cost: "Free",
    registrationUrl: "#",
    snippet:
      "Celebrate Lunar New Year with traditional performances, street food, and lantern displays at South Bank.",
    hostName: "Brisbane Multicultural Society",
  },
  {
    _id: "mock-4",
    title: "Academic Writing Workshop",
    slug: "academic-writing-adelaide",
    datetime: futureDate(4, 14),
    location: "University of Adelaide",
    address: "North Terrace Campus",
    city: "adelaide",
    category: "academic",
    cost: "Free",
    registrationUrl: "#",
    snippet:
      "Master essay structure, referencing, and academic tone. Perfect for first-year international students.",
    hostName: "University of Adelaide",
  },
  {
    _id: "mock-5",
    title: "Student Volleyball Tournament",
    slug: "volleyball-perth",
    datetime: futureDate(10, 9),
    endDatetime: futureDate(10, 16),
    location: "UWA Sports Park, Perth",
    address: "Crawley, WA",
    city: "perth",
    category: "sports",
    cost: "$5",
    registrationUrl: "#",
    snippet:
      "Inter-uni volleyball comp open to all skill levels. Form a team or join as an individual — prizes for the winners.",
    hostName: "UWA Student Guild",
  },
  {
    _id: "mock-6",
    title: "Resume & LinkedIn Masterclass",
    slug: "resume-masterclass-sydney",
    datetime: futureDate(6, 12),
    location: "UTS, Sydney",
    address: "15 Broadway, Ultimo",
    city: "sydney",
    category: "career",
    cost: "Free",
    registrationUrl: "#",
    snippet:
      "Get your resume reviewed by hiring managers and learn how to optimise your LinkedIn for the Australian job market.",
    hostName: "UTS Careers",
  },
  {
    _id: "mock-7",
    title: "Bollywood Night",
    slug: "bollywood-night-melbourne",
    datetime: futureDate(8, 19),
    location: "RMIT Kaleide Theatre, Melbourne",
    address: "Swanston Street, CBD",
    city: "melbourne",
    category: "social",
    cost: "$10",
    registrationUrl: "#",
    snippet:
      "Dance, food, and live music — the biggest Bollywood night on campus. Open to everyone, not just Indian students.",
    hostName: "RMIT Indian Society",
  },
  {
    _id: "mock-8",
    title: "Coding Bootcamp: Build Your First App",
    slug: "coding-bootcamp-brisbane",
    datetime: futureDate(12, 10),
    endDatetime: futureDate(12, 17),
    location: "QUT Gardens Point, Brisbane",
    address: "2 George Street",
    city: "brisbane",
    category: "workshop",
    cost: "Free",
    registrationUrl: "#",
    snippet:
      "Full-day workshop for beginners. Build a real web app from scratch using React and deploy it live by the end of the day.",
    hostName: "QUT Code Network",
  },
  {
    _id: "mock-9",
    title: "Mental Health & Wellbeing Panel",
    slug: "wellbeing-panel-adelaide",
    datetime: futureDate(9, 15),
    location: "UniSA City West, Adelaide",
    address: "217 Hindley Street",
    city: "adelaide",
    category: "academic",
    cost: "Free",
    registrationUrl: "#",
    snippet:
      "Panel discussion on managing stress, homesickness, and work-life balance as an international student.",
    hostName: "UniSA Student Wellbeing",
  },
];

export const mockFeaturedEvent: SanityEvent = mockEvents[0];
