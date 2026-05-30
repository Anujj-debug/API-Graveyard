import StatusReport from "../models/status-report.model.js";
import API from "../../api-registry/models/api.model.js";
import { recalculateCommunityStatus } from "../helpers/status.helper.js";

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
