import { useTrendingAPIs } from "../hooks/use-trending-apis";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function TrendingSection() {
  const { data, isLoading, error } = useTrendingAPIs();

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return <div className="p-10">Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 text-3xl font-bold">Trending APIs ({data.count})</h2>

      <div className="space-y-4">
        {data?.apis?.map((api) => (
          <Link key={api._id} to={`/apis/${api._id}`}>
            <Card className="transition-all hover:scale-[1.02] hover:shadow-lg" cursor-pointer>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{api.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {api.category}
                    </p>
                    <Badge>{api.communityStatus}</Badge>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star size={16} />
                      {api.averageRating}
                    </div>

                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      {api.reviewCount}
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
