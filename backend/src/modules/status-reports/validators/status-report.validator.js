import { z } from "zod";

export const createStatusReportSchema =
  z.object({
    status: z.enum([
      "Active",
      "Stable",
      "Unstable",
      "Deprecated",
      "Dead",
      "Maintenance",
      "Acquired",
      "Rate-Limited",
    ]),

    evidenceUrl: z.string().optional(),

    note: z.string().optional(),
  });