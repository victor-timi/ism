import { defineField, defineType } from "sanity";

export const homepageStats = defineType({
  name: "homepageStats",
  title: "Homepage Stats",
  type: "document",
  fields: [
    defineField({
      name: "jobsCount",
      title: "Jobs Count",
      type: "string",
      description: "Display value, e.g. '500+'",
      initialValue: "0",
    }),
    defineField({
      name: "housingCount",
      title: "Housing Listings Count",
      type: "string",
      initialValue: "0",
    }),
    defineField({
      name: "discountsCount",
      title: "Discounts Count",
      type: "string",
      initialValue: "0",
    }),
    defineField({
      name: "membersCount",
      title: "Members Count",
      type: "string",
      initialValue: "0",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Stats" }),
  },
});
