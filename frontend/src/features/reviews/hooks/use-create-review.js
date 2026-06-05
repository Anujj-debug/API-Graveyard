import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../api/create-review";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.apiId],
      });
    },
  });
};
