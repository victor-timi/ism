"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/layout/page-hero";
import { bodyFade, ease } from "@/components/animations/variants";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the International Students Movement (ISM) platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Service Description",
    content:
      "ISM is an aggregation platform that helps international students in Australia discover jobs, housing, and student discounts. We curate and display listings from various sources but do not guarantee the accuracy, completeness, or availability of any listing.",
  },
  {
    title: "3. User Accounts",
    content:
      "You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials. You must be at least 16 years old to create an account. We reserve the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "4. User Conduct",
    content:
      "You agree not to misuse the platform, including but not limited to: posting fraudulent listings, scraping or bulk-downloading content, impersonating others, or using the platform for any unlawful purpose. Community guidelines apply to all forum and community interactions.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All ISM branding, design, and original content are owned by the International Students Movement. User-generated content remains the property of its creators, but you grant ISM a licence to display it on the platform.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "ISM is provided \"as is\" without warranties of any kind. We are not liable for any damages arising from your use of the platform, reliance on listing information, or interactions with third parties discovered through our service.",
  },
  {
    title: "7. Changes to Terms",
    content:
      "We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify registered users of significant changes via email.",
  },
  {
    title: "8. Governing Law",
    content:
      "These terms are governed by the laws of the Commonwealth of Australia. Any disputes shall be resolved in the courts of New South Wales, Australia.",
  },
  {
    title: "9. Contact",
    content:
      "For questions about these Terms of Service, contact us at legal@ism.org.au.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Terms of Service"
        title="Terms you can actually understand."
        description="Plain-language terms that protect both you and the platform."
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
