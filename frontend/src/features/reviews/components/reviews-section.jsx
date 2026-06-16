import { useReviews } from "../hooks/use-reviews";
import { Star, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export default function ReviewsSection({ apiId }) {
  const { data, isLoading, error } = useReviews(apiId);
  if (isLoading) {
    return <p className="mt-10">Loading reviews...</p>;
  }
  if (error) {
    return <p className="mt-10">Failed to load reviews</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Reviews</h2>
        <p className="mt-1 text-sm text-slate-600">
          ⭐ {data.averageRating} average rating · {data.reviewCount} community reviews
        </p>
      </div>

      {data.reviews.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-slate-600">
              No reviews yet. Be the first to review this API.
            </p>
          </CardContent>
        </Card>
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
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {review.user?.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold text-slate-900">{review.title}</h3>

                        <div>
                          <p className="text-sm text-slate-600">
                            {review.user?.username}
                          </p>

                          <p className="text-xs text-slate-500">
                            {formatDistanceToNow(new Date(review.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate-900">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          fill={index < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-slate-700">{review.content}</p>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <span className="text-sm text-slate-600">
                      😖 Pain Level: {review.painLevel}/5
                    </span>

                    {review.isComplaint && (
                      <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-sm text-red-700">
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
