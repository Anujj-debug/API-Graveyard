import { useParams } from "react-router-dom";
import { useAPI } from "@/features/registry/hooks/use-api";
import ReviewsSection from "@/features/reviews/components/reviews-section";
import ReviewForm from "@/features/reviews/components/review-form";

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
    <div className="mx-auto max-w-5xl p-10">
      <h1 className="mb-4 text-4xl font-bold">{data.name}</h1>
      <p className="mb-6 text-muted-foreground">{data.description}</p>

      <div className="space-y-2">
        <p>
          <strong>Category:</strong> {data.category}
        </p>

        <p>
          <strong>Company:</strong> {data.company}
        </p>

        <p>
          <strong>Pricing:</strong> {data.pricingModel}
        </p>

        <p>
          <strong>Official Status:</strong> {data.officialStatus}
        </p>

        <p>
          <strong>Community Status:</strong> {data.communityStatus}
        </p>

        <p>
          <strong>Average Rating:</strong> {data.averageRating}
        </p>
      </div>

      <ReviewForm apiId={id} />
      <ReviewsSection apiId={id} />
    </div>
  );
}
