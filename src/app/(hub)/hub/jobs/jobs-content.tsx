"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { HiBriefcase, HiChevronDown } from "react-icons/hi2";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilterBar } from "@/components/jobs/job-filter-bar";
import { FeaturedJobBanner } from "@/components/jobs/featured-job-banner";
import { JobStatsBar } from "@/components/jobs/job-stats-bar";
import { JobTips } from "@/components/jobs/job-tips";
import { ease, labelReveal, bodyFade } from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { mockJobs, featuredJob } from "@/components/jobs/data";

const ITEMS_PER_PAGE = 6;

function JobsInner() {
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "all";
  const type = searchParams.get("type") || "all";
  const industry = searchParams.get("industry") || "all";
  const query = searchParams.get("q") || "";

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      if (city !== "all" && job.city !== city) return false;
      if (type !== "all" && job.type !== type) return false;
      if (industry !== "all" && job.industry !== industry) return false;
      if (
        query &&
        !job.title.toLowerCase().includes(query.toLowerCase()) &&
        !job.company.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [city, type, industry, query]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const remaining = filteredJobs.length - visibleCount;
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
                "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500"
            variants={labelReveal}
            initial="hidden"
            animate="visible"
          >
            Part-Time Jobs
          </motion.p>
          <RevealHeading
            text="Work that fits your life."
            className="text-h1 mt-4 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-4 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            animate="visible"
          >
            Visa-friendly, campus-close jobs curated for international students.
            Find part-time work, casual shifts, and internships across Australia.
          </motion.p>
        </div>
      </section>

      {/* Stats bar */}
      <JobStatsBar />

      {/* Main Content */}
      <section className="bg-[var(--ism-bg)] px-6 py-8 lg:px-12 lg:py-12 xl:px-16">
        <div>
          <JobFilterBar />

          {/* Featured job */}
          <div className="mt-8">
            <FeaturedJobBanner job={featuredJob} />
          </div>

          {/* Job grid */}
          {filteredJobs.length > 0 ? (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleJobs.map((job, i) => (
                  <JobCard key={job.id} job={job} index={i} />
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
                        Math.min(prev + ITEMS_PER_PAGE, filteredJobs.length),
                      )
                    }
                    className="group rounded-full border-emerald-500/20 px-8 text-[var(--ism-fg)] hover:border-emerald-500/40 hover:text-emerald-500"
                  >
                    Show More
                    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 transition-colors group-hover:bg-emerald-500/20 dark:text-emerald-400">
                      +{remaining}
                    </span>
                    <HiChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </Button>
                  <p className="text-xs text-[var(--ism-fg-muted)]">
                    Showing {visibleCount} of {filteredJobs.length} results
                  </p>
                </motion.div>
              )}

              {/* All loaded indicator */}
              {!hasMore && filteredJobs.length > ITEMS_PER_PAGE && (
                <motion.p
                  className="mt-10 text-center text-xs text-[var(--ism-fg-muted)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  Showing all {filteredJobs.length} results
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
              <GlassCard gradient="from-emerald-500/20 via-teal-500/10 to-transparent">
                <div className="flex flex-col items-center gap-3 px-12 py-10">
                  <HiBriefcase className="h-10 w-10 text-[var(--ism-fg-muted)]" />
                  <p className="text-lg font-semibold text-[var(--ism-fg)]">
                    No jobs match your filters
                  </p>
                  <p className="text-sm text-[var(--ism-fg-muted)]">
                    Try adjusting your search or filters to find more
                    opportunities.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tips section */}
      <JobTips />
    </>
  );
}

export function JobsContent() {
  return (
    <Suspense>
      <JobsInner />
    </Suspense>
  );
}
