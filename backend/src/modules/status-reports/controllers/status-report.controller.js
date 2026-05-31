import { createStatusReportService } from "../services/status-report.service.js";
import { getStatusReportsService } from "../services/status-report.service.js";

export const createStatusReport = async (req, res) => {
  try {
    const report = await createStatusReportService(
      req.params.id,
      req.user.userId,
      req.body,
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

export const getStatusReports = async (req, res) => {
  try {
    const data = await getStatusReportsService(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
