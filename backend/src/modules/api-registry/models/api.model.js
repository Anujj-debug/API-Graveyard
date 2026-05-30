import mongoose from "mongoose";
import { API_STATUSES } from "../../../shared/constants/status.constants.js";

const apiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    websiteUrl: {
      type: String,
      required: true,
      trim: true,
    },

    docsUrl: {
      type: String,
      trim: true,
      default: "",
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    pricingModel: {
      type: String,
      enum: [
        "Free",
        "Freemium",
        "Paid",
        "Enterprise",
        "Open Source",
        "Unknown",
      ],
      default: "Unknown",
    },

    officialStatus: {
      type: String,
      enum: API_STATUSES,
      default: "Active",
    },
    communityStatus: {
      type: String,
      enum: API_STATUSES,
      default: "Active",
    },

    logoUrl: {
      type: String,
      default: "",
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    alternatives: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "API",
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    totalUpvotes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const API = mongoose.model("API", apiSchema);

export default API;
