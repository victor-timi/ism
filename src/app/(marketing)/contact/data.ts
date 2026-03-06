import {
  HiEnvelope,
  HiClock,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface InfoCard {
  icon: IconType;
  title: string;
  description: string;
  detail: string;
  gradient: string;
}

export const infoCards: InfoCard[] = [
  {
    icon: HiEnvelope,
    title: "Email Us",
    description: "hello@ism.org.au",
    detail: "We'll get back to you within 24 hours.",
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  },
  {
    icon: HiChatBubbleLeftRight,
    title: "Social",
    description: "@ismaustralia",
    detail: "Follow us on Instagram, Twitter, and LinkedIn.",
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    icon: HiClock,
    title: "Response Time",
    description: "Within 24 hours",
    detail: "Mon–Fri, 9 AM – 5 PM AEST.",
    gradient: "from-amber-500/20 via-amber-400/10 to-transparent",
  },
];

export interface ContactFaq {
  number: string;
  question: string;
  answer: string;
}

export const contactFaqs: ContactFaq[] = [
  {
    number: "01",
    question: "How do I report a fraudulent listing?",
    answer:
      "Email us at report@ism.org.au with the listing URL and details. We review all reports within 24 hours and remove confirmed fraudulent listings immediately.",
  },
  {
    number: "02",
    question: "Can I partner with ISM?",
    answer:
      "We're always looking for partnerships with universities, employers, and brands that want to reach international students. Reach out at partners@ism.org.au.",
  },
  {
    number: "03",
    question: "I'm a student. Can I contribute?",
    answer:
      "Absolutely! We're built by students. Whether you want to write for our blog, moderate the forum, or contribute code — email us at contribute@ism.org.au.",
  },
];
