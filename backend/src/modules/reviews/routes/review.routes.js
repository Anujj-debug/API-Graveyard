import express from "express";
import protect from "../../../shared/middlewares/auth.middleware.js";
import validate from "../../../shared/middlewares/validate.middleware.js";
import { createReview, getReviews } from "../controllers/review.controller.js";
import { createReviewSchema } from "../validators/review.validator.js";

const router = express.Router({ mergeParams: true });

router.get("/", getReviews);
router.post(
  "/",
  protect,
  validate(createReviewSchema),
  createReview
);

export default router;