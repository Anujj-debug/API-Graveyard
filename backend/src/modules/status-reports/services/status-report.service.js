import StatusReport from "../models/status-report.model.js";
import API from "../../api-registry/models/api.model.js";
import { recalculateCommunityStatus } from "../helpers/status.helper.js";
import { getVoteBreakdown } from "../helpers/vote-breakdown.helper.js";

export const createStatusReportService = async (apiId, userId, reportData) => {
  const existingReport = await StatusReport.findOne({
    api: apiId,
    user: userId,
  });

  if (existingReport) {
    existingReport.status = reportData.status;

    existingReport.evidenceUrl = reportData.evidenceUrl || "";

    existingReport.note = reportData.note || "";

    await existingReport.save();

    await recalculateCommunityStatus(apiId);

    return existingReport;
  }

  const report = await StatusReport.create({
    ...reportData,
    api: apiId,
    user: userId,
  });
  await recalculateCommunityStatus(apiId);
  return report;
};

export const getStatusReportsService =
  async (apiId) => {
    const reports =
      await StatusReport.find({
        api: apiId,
      })
        .populate("user", "username")
        .sort({ createdAt: -1 });

    const api =
      await API.findById(apiId)
        .select("communityStatus");

    return {
      communityStatus:
        api.communityStatus,

      voteBreakdown:
        getVoteBreakdown(reports),

      reports,
    };
  };