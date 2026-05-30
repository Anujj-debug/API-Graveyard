import express from "express";
import { createAPI, getAllAPIs, getSingleAPI } from "../controllers/api.controller.js";
import protect from "../../../shared/middlewares/auth.middleware.js";
import validate from "../../../shared/middlewares/validate.middleware.js";
import { createAPISchema } from "../validators/api.validator.js";

import reviewRoutes from "../../reviews/routes/review.routes.js";
import statusReportRoutes from "../../status-reports/routes/status-report.routes.js";

const router = express.Router();

router.get("/", getAllAPIs);
router.get("/:id", getSingleAPI);

// Nested route for reviews
router.use("/:id/reviews", reviewRoutes);
// Nested route for status reports
router.use("/:id/status-reports", statusReportRoutes);

router.post("/", protect, validate(createAPISchema), createAPI);

export default router;