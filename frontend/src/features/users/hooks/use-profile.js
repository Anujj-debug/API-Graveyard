import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const getProfile = async (userId) => {
  const response = await api.get(`/users/${userId}/profile`);

  return response.data;
};

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
  });
};
