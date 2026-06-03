import { useQuery } from "@tanstack/react-query";
import { getTrendingAPIs } from "../api/get-trending-apis";

export const useTrendingAPIs = () => {
  return useQuery({
    queryKey: ["trending-apis"],
    queryFn: getTrendingAPIs,
  });
};