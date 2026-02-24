import { PrismaClient, ListingType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed some sample listings for development
  const sampleListings = [
    {
      type: ListingType.DISCOUNT,
      source: "seed",
      sourceId: "seed-discount-1",
      title: "50% Off Annual Student Gym Membership",
      description:
        "Get half price on a 12-month gym membership with a valid student ID at any Fitness First location.",
      url: "https://example.com/deals/gym-membership",
      location: "Melbourne, VIC",
      metadata: { category: "Health & Fitness", discount: "50%", provider: "Fitness First" },
      isActive: true,
      publishedAt: new Date(),
    },
    {
      type: ListingType.DISCOUNT,
      source: "seed",
      sourceId: "seed-discount-2",
      title: "Free Spotify Premium for 3 Months",
      description: "Students can get Spotify Premium free for 3 months, then $6.99/mo.",
      url: "https://example.com/deals/spotify",
      location: null,
      metadata: { category: "Entertainment", discount: "100% for 3mo", provider: "Spotify" },
      isActive: true,
      publishedAt: new Date(),
    },
    {
      type: ListingType.HOUSING,
      source: "seed",
      sourceId: "seed-housing-1",
      title: "Private Room in Shared Apartment - CBD",
      description:
        "Furnished private room in a 3-bedroom apartment. Close to public transport and universities.",
      url: "https://example.com/housing/cbd-room",
      location: "Sydney CBD, NSW",
      metadata: { pricePerWeek: 320, bedrooms: 1, propertyType: "Apartment", furnished: true },
      isActive: true,
      publishedAt: new Date(),
    },
    {
      type: ListingType.JOB,
      source: "seed",
      sourceId: "seed-job-1",
      title: "Part-Time Barista - Student Friendly Hours",
      description:
        "Looking for a part-time barista to work flexible hours around university schedule.",
      url: "https://example.com/jobs/barista",
      location: "Brunswick, VIC",
      metadata: { salary: "$25-28/hr", jobType: "Part-time", company: "Local Cafe" },
      isActive: true,
      publishedAt: new Date(),
    },
  ];

  for (const listing of sampleListings) {
    await prisma.listing.upsert({
      where: { source_sourceId: { source: listing.source, sourceId: listing.sourceId } },
      update: listing,
      create: listing,
    });
  }

  console.log(`Seeded ${sampleListings.length} sample listings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
