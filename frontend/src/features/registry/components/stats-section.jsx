import { useStats } from "../hooks/use-stats";
import { Server, MessageSquare, FileText } from "lucide-react";

export default function StatsSection() {
  const { data, isLoading, error } = useStats();

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border p-6 text-center bg-card text-card-foreground shadow-sm">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Server size={20} />
          </div>
          <h3 className="text-3xl font-bold">
            {String(data.apisCount).padStart(2, "0")}
          </h3>
          <p className="mt-1 text-muted-foreground">APIs Tracked</p>
        </div>

        <div className="rounded-xl border border-border p-6 text-center bg-card text-card-foreground shadow-sm">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <MessageSquare size={20} />
          </div>
          <h3 className="text-3xl font-bold">
            {String(data.reviewsCount).padStart(2, "0")}
          </h3>
          <p className="mt-1 text-muted-foreground">Reviews</p>
        </div>

        <div className="rounded-xl border border-border p-6 text-center bg-card text-card-foreground shadow-sm">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <FileText size={20} />
          </div>
          <h3 className="text-3xl font-bold">
            {String(data.statusReportsCount).padStart(2, "0")}
          </h3>
          <p className="mt-1 text-muted-foreground">Status Reports</p>
        </div>
      </div>
    </section>
  );
}
