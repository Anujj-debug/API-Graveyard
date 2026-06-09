import { getStatsService } from "../services/stats.service.js";

export const getStats = async (req, res) => {
  try {
    const stats = await getStatsService();

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
