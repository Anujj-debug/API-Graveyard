import { useQuery } from "@tanstack/react-query";
import { getAllAPIs } from "../api/get-all-apis";

export const useAPIs = (filters = {}) => {
  return useQuery({
    queryKey: ["apis", filters],
    queryFn: () => getAllAPIs(filters),
  });
};
