import api from "@/lib/api";

export const searchAPIs = async (searchTerm) => {
  const response = await api.get(
    `/apis?search=${searchTerm}`
  );

  return response.data;
};