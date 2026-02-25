# ISM Client Brief — Hub Data Sources & Market Context

## Hub Overview

ISM features a **Student Opportunity Hub** with 3 tabs (separate pages), each showing curated listings targeted at international students in Australia.

---

## Tab 1: Part-Time Jobs (Australia)

### Major General Job Boards
Highest traffic and most listings across all industries.

- **SEEK** — Australia's largest job portal. Filter for "Part Time" or "Casual" roles. Detailed profile feature helps employers find candidates.
- **Indeed Australia** — Global leader that aggregates listings from company sites and other job boards. Massive volume of local opportunities.
- **Jora** — Australian-owned search engine that collects ads from across the web. Often features local casual roles not found on larger paid boards.

### Best for Students & Casual Work
Flexibility and entry-level roles.

- **Student Job Board** — Specifically designed for university and secondary students. Focuses on casual, holiday, and part-time work that fits around study schedules.
- **Gumtree Jobs** — Very popular for local casual work in hospitality, cleaning, trades, and retail. Often used by small businesses for quick hiring.
- **Sidekicker** — Popular app for flexible "on-demand" shifts in hospitality, events, and warehousing. Accept work directly through your phone.

---

## Tab 2: Share Accommodation (Australia)

### Primary Share Accommodation Platforms
Specialize in matching people with rooms and potential housemates.

- **Flatmates.com.au** — Widely considered the #1 share accommodation platform in Australia. Extensive filters for lifestyle and location. Browsing is free; "Early Bird" access to new listings typically requires a paid upgrade.
- **Flatmate Finders** — Long-running service with a detailed matching system that pairs housemates based on compatibility profiles. Features in-app calling for privacy.
- **Realestate.com.au (Share section)** — The "Share" subsection of Australia's largest real estate site. Often aggregates listings from Flatmates.com.au (both owned by REA Group).

### Community and Free Alternatives
Avoid subscription fees, though require more vigilance against scams.

- **Facebook Groups** — Highly localized groups are often the fastest way to find a room. Key groups include "Fairy Floss Real Estate" (Melbourne), "Sydney Share Houses", and "Inner West Housemates" (Sydney).
- **Gumtree** — Major general classifieds site with a dedicated "Flatshare & Houseshare" section.
- **Sharehouse.app** — Newer Australian-owned platform that is completely free to use with no hidden fees.

### Niche and Student Options

- **Better Together Housing** — Specifically designed for women aged 55+ seeking safe shared living arrangements.
- **University Housing Portals** — Most major Australian universities (USYD, Unimelb, UQ, etc.) maintain their own private databases or partnerships with providers like Scape or AmberStudent for student-specific accommodation.

---

## Tab 3: Student Discounts & Deals

### Primary Source: OzBargain
Community-driven deal feed with consistent structure. Most "scrapable" source.

- **Why it's the best:** Highly structured data (Title, Price, Discount %, Expiry, Upvotes). Acts as a central aggregator — if there's a deal on Amazon, Catch, or Woolworths, it appears here first.
- **Technical ease:** Relatively simple HTML. Target `.nodes` and `.vote` classes for hottest deals.
- **API option:** Public RSS feed available. Developer-friendly, provided you follow their Robots.txt and rate-limit requests.

### Secondary Source: Finder (Deals)
Clean, editorialized data.

- **Why it's good:** Unlike OzBargain's chaotic feed, Finder categorizes deals into neat "Product Sets." Better for scraping specific niches like "Best Laptop Deals."
- **Complexity:** More stable but has more JavaScript elements — requires Playwright or similar rather than a simple HTML parser.

---

## Scraping & Aggregation Tools

Free, unrestricted, and scalable options for data collection:

| Tool | Language | Best For |
|------|----------|----------|
| **Scrapy** | Python | Industry standard for large-scale web crawling. Extremely fast and modular. |
| **Playwright** (Microsoft) | Python / Node.js | Top recommendation for modern, JS-heavy sites. High stability. |
| **BeautifulSoup** | Python | Quick, simple parsing of static HTML pages. |

**Note:** ISM uses Node.js + Playwright for background workers (aligned with the Next.js stack).

---

## Market Context — International Students in Australia

### Key Statistics (2024-2025)

| Metric | Value | Context |
|--------|-------|---------|
| **Total International Students** | ~833,000 | Studying in Australia on student visas in 2025. One of the world's leading destinations for international education. |
| **Economic Contribution** | ~A$53.6 billion | Contributed through tuition, housing, transport, and living costs. Frames international education as a top export sector. |
| **Export Ranking** | Top 3 service export | International education ranks alongside major commodities and services in national export earnings. Strategic economic importance. |
| **Major Source Countries** | 50%+ from Asia-Pacific | China, India, Nepal, Vietnam, and the Philippines. Showcases Australia's global reach and cultural diversity. |
| **University Enrolment Share** | ~32-35% international | Some institutions exceed 45% international enrolment. Essential to the sustainability and global competitiveness of Australian universities. |

---

*Document compiled from client brief. Last updated: 2026-02-24.*
