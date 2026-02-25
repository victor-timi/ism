"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { HiBriefcase, HiHome, HiTag } from "react-icons/hi2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/hub/filter-bar";
import { ListingCard } from "@/components/hub/listing-card";
import { mockListings } from "@/components/hub/mock-data";
import { ease, labelReveal, bodyFade } from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";

const tabs = [
  {
    value: "jobs",
    label: "Jobs",
    icon: HiBriefcase,
    count: mockListings.filter((l) => l.category === "jobs").length,
  },
  {
    value: "housing",
    label: "Housing",
    icon: HiHome,
    count: mockListings.filter((l) => l.category === "housing").length,
  },
  {
    value: "discounts",
    label: "Discounts",
    icon: HiTag,
    count: mockListings.filter((l) => l.category === "discounts").length,
  },
];

export default function HubPage() {
  const [activeTab, setActiveTab] = useState("jobs");
  const filtered = mockListings.filter((l) => l.category === activeTab);

  return (
    <>
      {/* Compact Hero */}
      <section className="ism-grain relative overflow-hidden bg-[var(--ism-bg)] px-6 pt-28 pb-12 lg:px-12 lg:pt-36 lg:pb-16 xl:px-16">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute left-1/2 top-[30%] h-[500px] w-[500px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(4,120,87,0.08) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            animate="visible"
          >
            Listings Hub
          </motion.p>
          <RevealHeading
            text="Find what you need."
            className="text-h2 mt-3 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-3 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            animate="visible"
          >
            Browse jobs, housing, and discounts curated for international
            students across Australia.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[var(--ism-bg)] px-6 py-8 lg:px-12 lg:py-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Filter Bar */}
          <FilterBar />

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-8"
          >
            <TabsList
              className="w-full justify-start gap-1 rounded-xl p-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="gap-2 rounded-lg data-[state=active]:bg-[var(--ism-accent)] data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  <span className="ml-1 rounded-full bg-[var(--ism-fg)]/5 px-2 py-0.5 text-xs data-[state=active]:bg-white/20">
                    {tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {mockListings
                    .filter((l) => l.category === tab.value)
                    .map((listing, i) => (
                      <ListingCard
                        key={listing.id}
                        listing={listing}
                        index={i}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Pagination placeholder */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.8 }}
          >
            <p className="text-sm text-[var(--ism-fg-muted)]">
              Showing {filtered.length} of 24 listings
            </p>
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
