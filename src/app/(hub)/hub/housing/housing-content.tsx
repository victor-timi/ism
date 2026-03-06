"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { HiHomeModern, HiChevronDown } from "react-icons/hi2";
import { HousingCard } from "@/components/housing/housing-card";
import { HousingFilterBar } from "@/components/housing/housing-filter-bar";
import { FeaturedHousingBanner } from "@/components/housing/featured-housing-banner";
import { HousingStatsBar } from "@/components/housing/housing-stats-bar";
import { HousingTips } from "@/components/housing/housing-tips";
import { ease, labelReveal, bodyFade } from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { mockHousing, featuredHousing } from "@/components/housing/data";

const ITEMS_PER_PAGE = 6;

function HousingInner() {
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "all";
  const roomType = searchParams.get("roomType") || "all";
  const price = searchParams.get("price") || "all";
  const query = searchParams.get("q") || "";

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredListings = useMemo(() => {
    return mockHousing.filter((listing) => {
      if (city !== "all" && listing.city !== city) return false;
      if (roomType !== "all" && listing.roomType !== roomType) return false;
      if (price !== "all") {
        if (price === "under-200" && listing.priceNum >= 200) return false;
        if (
          price === "200-300" &&
          (listing.priceNum < 200 || listing.priceNum > 300)
        )
          return false;
        if (price === "300-plus" && listing.priceNum < 300) return false;
      }
      if (
        query &&
        !listing.title.toLowerCase().includes(query.toLowerCase()) &&
        !listing.provider.toLowerCase().includes(query.toLowerCase()) &&
        !listing.location.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [city, roomType, price, query]);

  const visibleListings = filteredListings.slice(0, visibleCount);
  const remaining = filteredListings.length - visibleCount;
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
                "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500"
            variants={labelReveal}
            initial="hidden"
            animate="visible"
          >
            Student Housing
          </motion.p>
          <RevealHeading
            text="Find your place."
            className="text-h1 mt-4 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-4 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            animate="visible"
          >
            Verified rooms, share houses, and student accommodation near
            campuses and transport — all in one place.
          </motion.p>
        </div>
      </section>

      {/* Stats bar */}
      <HousingStatsBar />

      {/* Main Content */}
      <section className="bg-[var(--ism-bg)] px-6 py-8 lg:px-12 lg:py-12 xl:px-16">
        <div>
          <HousingFilterBar />

          {/* Featured listing */}
          <div className="mt-8">
            <FeaturedHousingBanner listing={featuredHousing} />
          </div>

          {/* Listing grid */}
          {filteredListings.length > 0 ? (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleListings.map((listing, i) => (
                  <HousingCard key={listing.id} listing={listing} index={i} />
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
                        Math.min(
                          prev + ITEMS_PER_PAGE,
                          filteredListings.length,
                        ),
                      )
                    }
                    className="group rounded-full border-sky-500/20 px-8 text-[var(--ism-fg)] hover:border-sky-500/40 hover:text-sky-500"
                  >
                    Show More
                    <span className="ml-2 inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold text-sky-600 transition-colors group-hover:bg-sky-500/20 dark:text-sky-400">
                      +{remaining}
                    </span>
                    <HiChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </Button>
                  <p className="text-xs text-[var(--ism-fg-muted)]">
                    Showing {visibleCount} of {filteredListings.length} results
                  </p>
                </motion.div>
              )}

              {/* All loaded indicator */}
              {!hasMore && filteredListings.length > ITEMS_PER_PAGE && (
                <motion.p
                  className="mt-10 text-center text-xs text-[var(--ism-fg-muted)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  Showing all {filteredListings.length} results
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
              <GlassCard gradient="from-sky-500/20 via-cyan-500/10 to-transparent">
                <div className="flex flex-col items-center gap-3 px-12 py-10">
                  <HiHomeModern className="h-10 w-10 text-[var(--ism-fg-muted)]" />
                  <p className="text-lg font-semibold text-[var(--ism-fg)]">
                    No listings match your filters
                  </p>
                  <p className="text-sm text-[var(--ism-fg-muted)]">
                    Try adjusting your search or filters to find more places.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tips section */}
      <HousingTips />
    </>
  );
}

export function HousingContent() {
  return (
    <Suspense>
      <HousingInner />
    </Suspense>
  );
}
