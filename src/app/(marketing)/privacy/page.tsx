"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/layout/page-hero";
import { bodyFade, ease } from "@/components/animations/variants";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, including your name, email address, and password when you create an account. We also collect usage data such as pages visited, search queries, and saved listings to improve your experience.",
  },
  {
    title: "2. How We Use Your Data",
    content:
      "Your data is used to provide and personalise the ISM platform, send listing alerts you've configured, improve our services through analytics, and communicate important updates about your account or our platform.",
  },
  {
    title: "3. Cookies & Tracking",
    content:
      "We use essential cookies to maintain your session and preferences. Analytics cookies help us understand how the platform is used. You can manage cookie preferences through your browser settings at any time.",
  },
  {
    title: "4. Third-Party Services",
    content:
      "We integrate with third-party services for authentication, email delivery, and analytics. These services have their own privacy policies and we encourage you to review them. We do not sell your personal data to any third party.",
  },
  {
    title: "5. Data Security",
    content:
      "We implement industry-standard security measures including encryption, secure authentication, and regular security audits. While no system is completely secure, we take reasonable precautions to protect your information.",
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data. You can export your data, withdraw consent for non-essential processing, and lodge complaints with relevant data protection authorities. Contact us to exercise these rights.",
  },
  {
    title: "7. Contact Us",
    content:
      "For privacy-related questions or requests, email us at privacy@ism.org.au. We aim to respond to all privacy inquiries within 30 days.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Privacy Policy"
        title="Your privacy matters to us."
        description="We're committed to protecting your personal information and being transparent about how we use it."
      />

      <section className="bg-[var(--ism-bg)] px-6 py-16 lg:px-12 lg:py-24 xl:px-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-8">
              Last updated: February 2026
            </Badge>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              >
                <h2 className="text-xl font-bold text-[var(--ism-fg)]">
                  {section.title}
                </h2>
                <div className="mt-1 h-px bg-[var(--ism-border)]" />
                <p className="mt-4 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
