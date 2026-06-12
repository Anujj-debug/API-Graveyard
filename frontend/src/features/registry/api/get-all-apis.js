import api from "@/lib/api";

export const getAllAPIs = async (params = {}) => {
  const response = await api.get("/apis", {
    params,
  });

  return response.data;
};
