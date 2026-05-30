import express from "express";
import protect from "../../../shared/middlewares/auth.middleware.js";
import validate from "../../../shared/middlewares/validate.middleware.js";
import { createStatusReport } from "../controllers/status-report.controller.js";
import { createStatusReportSchema } from "../validators/status-report.validator.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  protect,
  validate(createStatusReportSchema),
  createStatusReport
);

export default router;