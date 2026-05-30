import { createReviewService } from "../services/review.service.js";

export const createReview = async (
  req,
  res
) => {
  try {
    const review =
      await createReviewService(
        req.params.id,
        req.user.userId,
        req.body
      );

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};