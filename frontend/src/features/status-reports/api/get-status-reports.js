import api from "@/lib/api";

export const getStatusReports = async (
  apiId
) => {
  const response = await api.get(
    `/apis/${apiId}/status-reports`
  );

  return response.data;
};