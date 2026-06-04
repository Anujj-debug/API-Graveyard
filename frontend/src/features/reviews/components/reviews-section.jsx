import { useReviews } from "../hooks/use-reviews";

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

      <p className="mb-6">Average Rating: {data.averageRating}</p>

      {data.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {data.reviews.map((review) => (
            <div key={review._id} className="rounded-lg border p-4">
              <h3 className="font-semibold">{review.title}</h3>

              <p className="text-sm text-muted-foreground">
                by {review.user?.username}
              </p>

              <p className="mt-2">Rating: {review.rating}/5</p>

              <p>Pain Level: {review.painLevel}/5</p>

              <p className="mt-3">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
