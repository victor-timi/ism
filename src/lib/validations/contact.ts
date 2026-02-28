import { z } from "zod/v3";

export const CONTACT_SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "bug", label: "Report a Bug" },
  { value: "listing", label: "Report a Listing" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

const subjectValues = CONTACT_SUBJECTS.map((s) => s.value);

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z
    .string()
    .refine((val) => subjectValues.includes(val as (typeof subjectValues)[number]), {
      message: "Please select a subject",
    }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;
