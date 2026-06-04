import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../api/get-reviews";

export const useReviews = (apiId) => {
  return useQuery({
    queryKey: ["reviews", apiId],

    queryFn: () =>
      getReviews(apiId),

    enabled: !!apiId,
  });
};