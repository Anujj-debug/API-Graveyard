import api from "@/lib/api";

export const getReviews = async (apiId) => {
  const response = await api.get(
    `/apis/${apiId}/reviews`
  );

  return response.data;
};