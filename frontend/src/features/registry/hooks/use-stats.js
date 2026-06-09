import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const getStats = async () => {
  const response = await api.get("/stats");

  return response.data;
};

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
};
