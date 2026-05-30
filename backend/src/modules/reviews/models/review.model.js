import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    api: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "API",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    painLevel: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },

    isComplaint: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// prevents a user from submitting multiple reviews for the same API
reviewSchema.index(
  { api: 1, user: 1 },
  { unique: true }
);

const Review = mongoose.model(
  "Review",
  reviewSchema
);

export default Review;