import { useState } from "react";
import { useCreateReview } from "../hooks/use-create-review";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const token = localStorage.getItem("token");

  if (!token) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 text-center">
        <p className="text-center text-slate-600">
          🔒 Login required to submit reviews
        </p>
      </CardContent>
    </Card>
  );
}

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
          toast.success("Review submitted successfully!");
        },
        onError: (error) => {
          toast.error("Failed to submit review.");
          setErrorMessage(
            error.response?.data?.message || "Something went wrong",
          );
        },
      },
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share rating, pain level, and a short experience note.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Rating</label>

            <select
              value={formData.rating}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: Number(e.target.value),
                })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Pain Level</label>

            <select
              value={formData.painLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  painLevel: Number(e.target.value),
                })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
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
          <div className="flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2">
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
            <label className="text-sm text-slate-700">This review is a complaint</label>
          </div>

          {errorMessage && (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{errorMessage}</p>
          )}

          <Button type="submit" className="w-full sm:w-auto">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  );
}
