import { z } from "zod";
import { API_STATUSES } from "../../../shared/constants/status.constants.js";

export const createStatusReportSchema =
  z.object({
    status: z.enum(API_STATUSES),

    evidenceUrl: z.string().optional(),

    note: z.string().optional(),
  });