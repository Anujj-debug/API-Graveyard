import api from "@/lib/api";

export const createReview = async ({
  apiId,
  reviewData,
}) => {
  const response = await api.post(
    `/apis/${apiId}/reviews`,
    reviewData
  );

  return response.data;
};