import { useParams } from "react-router-dom";
import { useAPI } from "@/features/registry/hooks/use-api";
import ReviewsSection from "@/features/reviews/components/reviews-section";
import ReviewForm from "@/features/reviews/components/review-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Globe, FileText, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function APIDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useAPI(id);

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }
  if (error) {
    return <div className="p-10">Something went wrong</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="mx-auto max-w-5xl p-10">
        {/* Hero Card */}
        <Card className="mb-8 p-4">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl border flex items-center justify-center">
                {data.logoUrl ? (
                  <img
                    src={data.logoUrl}
                    alt={data.name}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">{data.name[0]}</span>
                )}
              </div>

              <div>
                <CardTitle className="text-5xl font-bold">
                  {data.name}
                </CardTitle>

                <p className="text-muted-foreground mt-2">{data.description}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>{data.officialStatus}</Badge>

              <Badge variant="secondary">{data.category}</Badge>

              <Badge variant="outline">{data.pricingModel}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star size={16} />
                Average Rating
              </p>

              <h3 className="text-3xl font-bold">{data.averageRating}</h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare size={16} />
                Reviews
              </p>

              <h3 className="text-3xl font-bold">{data.reviewCount}</h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Community Status</p>

              <h3 className="text-3xl font-bold">{data.communityStatus}</h3>
            </CardContent>
          </Card>
        </div>

        {/* Resources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <a
              href={data.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <Globe size={18} />
              Website
            </a>

            <a
              href={data.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <FileText size={18} />
              Documentation
            </a>
          </CardContent>
        </Card>

        {/* Review Form */}
        <ReviewForm apiId={id} />

        {/* Reviews */}
        <ReviewsSection apiId={id} />
      </div>
    </div>
  );
}
