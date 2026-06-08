import User from "../../auth/models/user.model.js";
import API from "../../api-registry/models/api.model.js";
import Review from "../../reviews/models/review.model.js";
import StatusReport from "../../status-reports/models/status-report.model.js";

export const getProfileService = async (userId) => {
  const user = await User.findById(userId).select("username email createdAt");

  if (!user) {
    throw new Error("User not found");
  }

  const apisCount = await API.countDocuments({
    addedBy: userId,
  });

  const reviewsCount = await Review.countDocuments({
    user: userId,
  });

  const statusReportsCount = await StatusReport.countDocuments({
    user: userId,
  });

  return {
    ...user.toObject(),
    apisCount,
    reviewsCount,
    statusReportsCount,
  };
};
