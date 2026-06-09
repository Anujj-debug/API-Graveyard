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
  const recentApis = await API.find({
    addedBy: userId,
  })
    .select("name createdAt")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentReviews = await Review.find({
    user: userId,
  })
    .populate("api", "name")
    .select("rating createdAt api")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentReports = await StatusReport.find({
    user: userId,
  })
    .populate("api", "name")
    .select("status createdAt api")
    .sort({ createdAt: -1 })
    .limit(5);

  const activity = [
    ...recentApis.map((api) => ({
      type: "api",
      text: `Submitted ${api.name}`,
      createdAt: api.createdAt,
    })),

    ...recentReviews.map((review) => ({
      type: "review",
      text: `Reviewed ${review.api?.name}`,
      createdAt: review.createdAt,
    })),

    ...recentReports.map((report) => ({
      type: "report",
      text: `Reported ${report.api?.name} as ${report.status}`,
      createdAt: report.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return {
    ...user.toObject(),
    apisCount,
    reviewsCount,
    statusReportsCount,
    activity,
  };
};
