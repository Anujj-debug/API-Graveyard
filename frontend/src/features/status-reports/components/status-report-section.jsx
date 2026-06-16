import { useStatusReports } from "../hooks/use-status-reports";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "../utils/status-colors";

export default function StatusReportSection({ apiId }) {
  const { data, isLoading, error } = useStatusReports(apiId);

  if (isLoading) {
    return <p>Loading status reports...</p>;
  }
  if (error) {
    return <p>Failed to load status reports</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Status Reports</h2>
        <p className="mt-1 text-sm text-slate-600">
          Community status and vote breakdown for this API.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Community Status</p>
              <Badge className={`mt-2 text-sm ${getStatusColor(data.communityStatus)}`}>
                {data.communityStatus}
              </Badge>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">Total reports</p>
              <p className="text-2xl font-semibold text-slate-900">{data.reports?.length || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Vote Breakdown</h3>

          <div className="space-y-3">
            {Object.entries(data.voteBreakdown).map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
              >
                <Badge className={getStatusColor(status)}>{status}</Badge>

                <span className="font-semibold text-slate-900">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
