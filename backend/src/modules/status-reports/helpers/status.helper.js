import StatusReport from "../models/status-report.model.js";
import API from "../../api-registry/models/api.model.js";

export const recalculateCommunityStatus = async (apiId) => {
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
