import { useQuery } from "@tanstack/react-query";
import { getStatusReports } from "../api/get-status-reports";

export const useStatusReports = (apiId) => {
  return useQuery({
    queryKey: ["status-reports", apiId],

    queryFn: () => getStatusReports(apiId),
  });
};
