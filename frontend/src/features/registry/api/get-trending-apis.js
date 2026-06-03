import api from "@/lib/api";

export const getTrendingAPIs = async () => {
  const response = await api.get("/apis/trending");

  return response.data;
};