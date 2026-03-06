"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { HiSparkles, HiChevronDown } from "react-icons/hi2";
import { DiscountCard } from "@/components/discounts/discount-card";
import { DiscountFilterBar } from "@/components/discounts/discount-filter-bar";
import { FeaturedDiscountBanner } from "@/components/discounts/featured-discount-banner";
import { DiscountStatsBar } from "@/components/discounts/discount-stats-bar";
import { DiscountTips } from "@/components/discounts/discount-tips";
import { ease, labelReveal, bodyFade } from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { mockDiscounts, featuredDiscount } from "@/components/discounts/data";

const ITEMS_PER_PAGE = 6;

function DiscountsInner() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "all";
  const type = searchParams.get("type") || "all";
  const query = searchParams.get("q") || "";

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredDeals = useMemo(() => {
    return mockDiscounts.filter((deal) => {
      if (category !== "all" && deal.category !== category) return false;
      if (type !== "all" && deal.discountType !== type) return false;
      if (
        query &&
        !deal.title.toLowerCase().includes(query.toLowerCase()) &&
        !deal.company.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [category, type, query]);

  const visibleDeals = filteredDeals.slice(0, visibleCount);
  const remaining = filteredDeals.length - visibleCount;
  const hasMore = remaining > 0;

  return (
    <>
      {/* Hero */}
      <section className="ism-grain relative overflow-hidden bg-[var(--ism-bg)] px-6 pt-32 pb-16 lg:px-12 lg:pt-40 lg:pb-20 xl:px-16">
        {/* Dot grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--ism-fg) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute left-1/2 top-[30%] h-[600px] w-[600px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500"
            variants={labelReveal}
            initial="hidden"
            animate="visible"
          >
            Student Discounts
          </motion.p>
          <RevealHeading
            text="Save more, stress less."
            className="text-h1 mt-4 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-4 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            animate="visible"
          >
            Exclusive student deals on food, tech, transport, and entertainment.
            Stretch your budget further with verified discounts.
          </motion.p>
        </div>
      </section>

      {/* Stats bar */}
      <DiscountStatsBar />

      {/* Main Content */}
      <section className="bg-[var(--ism-bg)] px-6 py-8 lg:px-12 lg:py-12 xl:px-16">
        <div>
          <DiscountFilterBar />

          {/* Featured deal */}
          <div className="mt-8">
            <FeaturedDiscountBanner deal={featuredDiscount} />
          </div>

          {/* Deal grid */}
          {filteredDeals.length > 0 ? (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleDeals.map((deal, i) => (
                  <DiscountCard key={deal.id} deal={deal} index={i} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <motion.div
                  className="mt-12 flex flex-col items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      setVisibleCount((prev) =>
                        Math.min(prev + ITEMS_PER_PAGE, filteredDeals.length),
                      )
                    }
                    className="group rounded-full border-orange-500/20 px-8 text-[var(--ism-fg)] hover:border-orange-500/40 hover:text-orange-500"
                  >
                    Show More
                    <span className="ml-2 inline-flex items-center rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600 transition-colors group-hover:bg-orange-500/20 dark:text-orange-400">
                      +{remaining}
                    </span>
                    <HiChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </Button>
                  <p className="text-xs text-[var(--ism-fg-muted)]">
                    Showing {visibleCount} of {filteredDeals.length} results
                  </p>
                </motion.div>
              )}

              {/* All loaded indicator */}
              {!hasMore && filteredDeals.length > ITEMS_PER_PAGE && (
                <motion.p
                  className="mt-10 text-center text-xs text-[var(--ism-fg-muted)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  Showing all {filteredDeals.length} results
                </motion.p>
              )}
            </>
          ) : (
            <motion.div
              className="mt-16 flex flex-col items-center gap-3 py-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
            >
              <GlassCard gradient="from-orange-500/20 via-amber-500/10 to-transparent">
                <div className="flex flex-col items-center gap-3 px-12 py-10">
                  <HiSparkles className="h-10 w-10 text-[var(--ism-fg-muted)]" />
                  <p className="text-lg font-semibold text-[var(--ism-fg)]">
                    No deals match your filters
                  </p>
                  <p className="text-sm text-[var(--ism-fg-muted)]">
                    Try adjusting your search or filters to find more discounts.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tips section */}
      <DiscountTips />
    </>
  );
}

export function DiscountsContent() {
  return (
    <Suspense>
      <DiscountsInner />
    </Suspense>
  );
}
