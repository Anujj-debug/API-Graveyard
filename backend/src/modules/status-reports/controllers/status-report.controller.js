import { createStatusReportService } from "../services/status-report.service.js";

export const createStatusReport = async (req, res) => {
  try {
    const report =
      await createStatusReportService(
        req.params.id,
        req.user.userId,
        req.body
      );

    res.status(201).json({
      message: "Status report submitted",
      report,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};