import Review from "../models/review.model.js";
import API from "../../api-registry/models/api.model.js";

export const createReviewService = async (apiId, userId, reviewData) => {
  const existingReview = await Review.findOne({
    api: apiId,
    user: userId,
  });

  if (existingReview) {
    throw new Error("You already reviewed this API");
  }

  const apiExists = await API.findById(apiId);

  if (!apiExists) {
    throw new Error("API not found");
  }

  const review = await Review.create({
    ...reviewData,
    api: apiId,
    user: userId,
  });

  // Recalculate ratings
  const reviews = await Review.find({
    api: apiId,
  });

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);

  const averageRating = totalRatings / reviews.length;

  // Update API summary fields
  await API.findByIdAndUpdate(apiId, {
    averageRating,
    reviewCount: reviews.length,
  });

  return review;
};

export const getReviewsService = async (
  apiId
) => {
  const reviews = await Review.find({
    api: apiId,
  })
    .populate("user", "username")
    .sort({ createdAt: -1 });

  const api = await API.findById(apiId)
    .select("averageRating reviewCount");

  return {
    averageRating: api.averageRating,
    reviewCount: api.reviewCount,
    reviews,
  };
};