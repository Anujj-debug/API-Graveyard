import api from "@/lib/api";

export const createStatusReport = async ({
  apiId,
  reportData,
}) => {
  const response = await api.post(
    `/apis/${apiId}/status-reports`,
    reportData
  );

  return response.data;
};