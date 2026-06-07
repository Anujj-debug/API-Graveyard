import api from "@/lib/api";

export const createAPI = async (apiData) => {
  const response = await api.post("/apis", apiData);

  return response.data;
};
