"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { HiEnvelope } from "react-icons/hi2";
import { PageHero } from "@/components/layout/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FaqItem } from "@/components/home/faq/faq-item";
import {
  cardVariants,
  labelReveal,
} from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { useAppMutation } from "@/lib/hooks/use-app-mutation";
import {
  contactSchema,
  CONTACT_SUBJECTS,
  type ContactValues,
} from "@/lib/validations";
import { infoCards, contactFaqs } from "./data";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const { mutate, isPending, errorMessage } = useAppMutation<ContactValues>({
    mutationFn: async () => {
      // Placeholder until M2 API endpoint is built
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    onSuccess: () => setSubmitted(true),
  });

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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) => mutate(data))}
                    className="space-y-5"
                  >
                    {errorMessage && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your name"
                                className="h-11"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="you@email.com"
                                className="h-11"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CONTACT_SUBJECTS.map((subject) => (
                                <SelectItem
                                  key={subject.value}
                                  value={subject.value}
                                >
                                  {subject.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us what's on your mind..."
                              rows={5}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      variant="ism"
                      size="lg"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
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
