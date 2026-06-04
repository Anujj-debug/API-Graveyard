import api from "@/lib/api";

export const getAPIById = async (id) => {
  const response = await api.get(`/apis/${id}`);

  return response.data;
};