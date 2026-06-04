import { createReviewService,getReviewsService } from "../services/review.service.js";

export const createReview = async (req, res) => {
  try {
    const review = await createReviewService(
      req.params.id,
      req.user.userId,
      req.body,
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

export const getReviews = async (req, res) => {
  try {
    const data = await getReviewsService(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
