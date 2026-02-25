"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  HiEnvelope,
  HiClock,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import { PageHero } from "@/components/layout/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaqItem } from "@/components/home/faq/faq-item";
import {
  ease,
  bodyFade,
  cardVariants,
  labelReveal,
} from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";

const infoCards = [
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
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
  },
];

const contactFaqs = [
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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <PageHero
        label="Get In Touch"
        title="We'd love to hear from you."
        description="Questions, feedback, or partnership ideas — we're all ears."
      />

      {/* Form + Info */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
                    }}
                  >
                    <HiEnvelope className="h-8 w-8 text-[var(--ism-accent)]" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[var(--ism-fg)]">
                    Message sent!
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ism-fg-muted)]">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@email.com"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">
                          General Inquiry
                        </SelectItem>
                        <SelectItem value="bug">Report a Bug</SelectItem>
                        <SelectItem value="listing">
                          Report a Listing
                        </SelectItem>
                        <SelectItem value="partnership">
                          Partnership
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us what's on your mind..."
                      required
                      rows={5}
                    />
                  </div>
                  <Button type="submit" variant="ism" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>

          {/* Info Cards */}
          <div className="space-y-6">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <GlassCard className="p-6" gradient={card.gradient}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
                      }}
                    >
                      <card.icon className="h-5 w-5 text-[var(--ism-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--ism-fg)]">
                        {card.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-[var(--ism-accent)]">
                        {card.description}
                      </p>
                      <p className="mt-1 text-xs text-[var(--ism-fg-muted)]">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact FAQ */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
              variants={labelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              FAQ
            </motion.p>
            <RevealHeading
              text="Common questions."
              className="text-h2 mt-4 text-[var(--ism-fg)]"
            />
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactFaqs.map((faq) => (
              <FaqItem
                key={faq.number}
                number={faq.number}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
