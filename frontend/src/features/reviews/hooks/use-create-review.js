import { useMutation } from "@tanstack/react-query";
import { createReview } from "../api/create-review";

export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
  });
};
