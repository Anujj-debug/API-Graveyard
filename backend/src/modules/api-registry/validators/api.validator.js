import { z } from "zod";

export const createAPISchema = z.object({
  name: z
    .string()
    .min(2, "API name is too short"),

  slug: z
    .string()
    .min(2, "Slug is too short"),

  description: z
    .string()
    .min(10, "Description is too short"),

  category: z
    .string()
    .min(2, "Category is required"),

  websiteUrl: z.url("Invalid website URL"),

  docsUrl: z.url("Invalid docs URL").optional(),

  company: z.string().optional(),

  pricingModel: z.enum([
    "Free",
    "Freemium",
    "Paid",
    "Enterprise",
    "Open Source",
    "Unknown",
  ]),

  officialStatus: z.enum([
    "Active",
    "Stable",
    "Unstable",
    "Deprecated",
    "Dead",
    "Maintenance",
    "Acquired",
    "Rate-Limited",
  ]),
});