import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),

  title: z
    .string()
    .min(3, "Title too short"),

  content: z
    .string()
    .min(10, "Review too short"),

  painLevel: z.number().min(1).max(5),

  isComplaint: z.boolean(),
});