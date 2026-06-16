import { useTrendingAPIs } from "../hooks/use-trending-apis";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function TrendingSection() {
  const { data, isLoading, error } = useTrendingAPIs();

  if (isLoading) {
    return <div className="p-10 text-muted-foreground">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-destructive">Something went wrong</div>;
  }

  if (!data) {
    return <div className="text-muted-foreground">No data</div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 text-3xl font-bold text-foreground">Trending APIs ({data.count})</h2>

      <div className="space-y-4">
        {data?.apis?.map((api) => (
          <Link key={api._id} to={`/apis/${api._id}`} className="block">
            <Card className="transition-all hover:scale-[1.02] hover:shadow-lg border-border bg-card">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                      {(api.name || "").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {api.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {api.category}
                      </p>
                      <div className="mt-2">
                        <Badge className="text-sm">{api.communityStatus}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                    <div className="flex items-center gap-3 text-foreground">
                      <div className="flex items-center gap-1 text-sm">
                        <Star size={16} />
                        <span className="font-medium">
                          {api.averageRating ?? "—"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare size={16} />
                        <span className="">{api.reviewCount ?? 0}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-muted-foreground hidden sm:block max-w-xs">
                      {api.description
                        ? api.description.slice(0, 120) +
                          (api.description.length > 120 ? "…" : "")
                        : null}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
