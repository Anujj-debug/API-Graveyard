import { useReviews } from "../hooks/use-reviews";
import { Star, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Reviews</h2>

        <p className="mt-2 text-muted-foreground">
          ⭐ {data.averageRating} average rating · {data.reviewCount} community
          reviews
        </p>
      </div>

      {data.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {data.reviews.map((review) => (
            <motion.div
              key={review._id}
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Card>
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
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star key={index} size={16} fill="currentColor" />
                      ))}
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
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
