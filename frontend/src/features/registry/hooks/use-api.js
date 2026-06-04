import { useQuery } from "@tanstack/react-query";
import { getAPIById } from "../api/get-api-by-id";

export const useAPI = (id) => {
  return useQuery({
    queryKey: ["api", id],
    queryFn: () => getAPIById(id),
    enabled: !!id,
  });
};
