import { useReviews } from "../hooks/use-reviews";
import { Star, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ReviewsSection({ apiId }) {
  const { data, isLoading, error } = useReviews(apiId);
  if (isLoading) {
    return <p className="mt-10">Loading reviews...</p>;
  }
  if (error) {
    return <p className="mt-10">Failed to load reviews</p>;
  }

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Reviews ({data.reviewCount})</h2>

      <p className="mb-6 text-muted-foreground">
        Average Rating: {data.averageRating}
      </p>

      {data.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {data.reviews.map((review) => (
            <Card key={review._id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {review.user?.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{review.title}</h3>

                      <p className="text-sm text-muted-foreground">
                        {review.user?.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{review.rating}/5</span>
                  </div>
                </div>

                <p className="mt-4">{review.content}</p>

                <div className="mt-4 flex flex-wrap gap-4">
                  <span className="text-sm text-muted-foreground">
                    Pain Level: {review.painLevel}/5
                  </span>

                  {review.isComplaint && (
                    <span className="flex items-center gap-1 text-sm">
                      <AlertTriangle size={14} />
                      Complaint
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
