import express from "express";
import protect from "../../../shared/middlewares/auth.middleware.js";
import validate from "../../../shared/middlewares/validate.middleware.js";
import { createReview } from "../controllers/review.controller.js";
import { createReviewSchema } from "../validators/review.validator.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  protect,
  validate(createReviewSchema),
  createReview
);

export default router;