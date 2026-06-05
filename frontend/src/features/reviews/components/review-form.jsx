import { useState } from "react";
import { useCreateReview } from "../hooks/use-create-review";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewForm({ apiId }) {
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    content: "",
    painLevel: 1,
    isComplaint: false,
  });

  const mutation = useCreateReview();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({
      apiId,
      reviewData: formData,
    });
  };

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Review title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />

          <Textarea
            placeholder="Share your experience..."
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
          />

          <button type="submit">Submit Review</button>
        </form>
      </CardContent>
    </Card>
  );
}
