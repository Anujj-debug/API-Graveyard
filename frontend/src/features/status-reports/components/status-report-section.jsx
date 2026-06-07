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
    <section className="mb-8 text-white">
      <h2 className="mb-6 text-3xl font-bold">Status Reports</h2>

      {/* Community Status */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">Community Status</p>

          <Badge
            className={`mt-2 text-sm ${getStatusColor(data.communityStatus)}`}
          >
            {data.communityStatus}
          </Badge>
        </CardContent>
      </Card>

      {/* Vote Breakdown */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-semibold">Vote Breakdown</h3>

          <div className="space-y-3">
            {Object.entries(data.voteBreakdown).map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <Badge className={getStatusColor(status)}>{status}</Badge>

                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reports */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-semibold">Recent Reports</h3>

          {data.reports.length === 0 ? (
            <p>No reports yet.</p>
          ) : (
            <div className="space-y-4">
              {data.reports.map((report) => (
                <div key={report._id} className="rounded-lg border p-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{report.user?.username}</span>

                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>

                  {report.note && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {report.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
