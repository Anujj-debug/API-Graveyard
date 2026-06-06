import { useState } from "react";
import { useCreateReview } from "../hooks/use-create-review";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReviewForm({ apiId }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    content: "",
    painLevel: 1,
    isComplaint: false,
  });

  const mutation = useCreateReview();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    mutation.mutate(
      {
        apiId,
        reviewData: formData,
      },
      {
        onSuccess: () => {
          setErrorMessage("");

          setFormData({
            rating: 5,
            title: "",
            content: "",
            painLevel: 1,
            isComplaint: false,
          });
        },
        onError: (error) => {
          setErrorMessage(
            error.response?.data?.message || "Something went wrong",
          );
        },
      },
    );
  };

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm">Rating</label>

            <select
              value={formData.rating}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: Number(e.target.value),
                })
              }
              className="w-full rounded-md border bg-background p-2"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm">Pain Level</label>

            <select
              value={formData.painLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  painLevel: Number(e.target.value),
                })
              }
              className="w-full rounded-md border bg-background p-2"
            >
              <option value={1}>1 - Very Easy</option>
              <option value={2}>2 - Easy</option>
              <option value={3}>3 - Moderate</option>
              <option value={4}>4 - Difficult</option>
              <option value={5}>5 - Nightmare</option>
            </select>
          </div>
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isComplaint}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isComplaint: e.target.checked,
                })
              }
            />

            <label>This review is a complaint</label>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <Button type="submit">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  );
}
