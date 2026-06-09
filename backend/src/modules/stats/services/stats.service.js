import API from "../../api-registry/models/api.model.js";
import Review from "../../reviews/models/review.model.js";
import StatusReport from "../../status-reports/models/status-report.model.js";

export const getStatsService = async () => {
  const apisCount = await API.countDocuments();
  const reviewsCount = await Review.countDocuments();
  const statusReportsCount = await StatusReport.countDocuments();

  return {
    apisCount,
    reviewsCount,
    statusReportsCount,
  };
};
