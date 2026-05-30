import StatusReport from "../models/status-report.model.js";
import API from "../../api-registry/models/api.model.js";

const recalculateCommunityStatus = async (apiId) => {
  const reports = await StatusReport.find({
    api: apiId,
  });

  const counts = {};

  reports.forEach((report) => {
    counts[report.status] = (counts[report.status] || 0) + 1;
  });

  let winningStatus = "Active";
  let maxVotes = 0;

  for (const status in counts) {
    if (counts[status] > maxVotes) {
      maxVotes = counts[status];
      winningStatus = status;
    }
  }

  await API.findByIdAndUpdate(apiId, {
    communityStatus: winningStatus,
  });
  console.log("Counts:", counts);
console.log("Winner:", winningStatus);
};

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
