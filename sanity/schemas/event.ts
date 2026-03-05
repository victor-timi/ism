import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "datetime",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDatetime",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location / Venue",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      options: {
        list: [
          { title: "Sydney", value: "sydney" },
          { title: "Melbourne", value: "melbourne" },
          { title: "Brisbane", value: "brisbane" },
          { title: "Perth", value: "perth" },
          { title: "Adelaide", value: "adelaide" },
          { title: "Canberra", value: "canberra" },
          { title: "Hobart", value: "hobart" },
          { title: "Online", value: "online" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Social", value: "social" },
          { title: "Career", value: "career" },
          { title: "Academic", value: "academic" },
          { title: "Cultural", value: "cultural" },
          { title: "Sports", value: "sports" },
          { title: "Workshop", value: "workshop" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cost",
      title: "Cost",
      type: "string",
      description: 'e.g. "Free", "$10", "$25 – $50"',
      initialValue: "Free",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "snippet",
      title: "Snippet",
      type: "text",
      rows: 3,
      description: "Short summary shown on event cards (max 200 chars).",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "hostName",
      title: "Host Name",
      type: "string",
    }),
    defineField({
      name: "hostLogo",
      title: "Host Logo",
      type: "image",
    }),
    defineField({
      name: "hostUrl",
      title: "Host Website",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Date, Soonest",
      name: "datetimeAsc",
      by: [{ field: "datetime", direction: "asc" }],
    },
    {
      title: "Date, Latest",
      name: "datetimeDesc",
      by: [{ field: "datetime", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "datetime",
      city: "city",
      media: "image",
    },
    prepare({ title, date, city, media }) {
      const d = date ? new Date(date).toLocaleDateString() : "No date";
      return {
        title,
        subtitle: `${d} · ${city ?? ""}`,
        media,
      };
    },
  },
});
