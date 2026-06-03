import { useQuery } from "@tanstack/react-query";
import { searchAPIs } from "../api/search-apis";

export const useSearchAPIs = (searchTerm) => {
  return useQuery({
    queryKey: ["search-apis", searchTerm],

    queryFn: () => searchAPIs(searchTerm),

    enabled: searchTerm.trim().length > 0,
  });
};
