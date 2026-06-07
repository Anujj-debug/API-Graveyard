import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStatusReport } from "../api/create-status-report";

export const useCreateStatusReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStatusReport,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["status-reports", variables.apiId],
      });
    },
  });
};
