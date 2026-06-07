import { useMutation } from "@tanstack/react-query";

import { createAPI } from "../api/create-api";

export const useCreateAPI = () => {
  return useMutation({
    mutationFn: createAPI,
  });
};
