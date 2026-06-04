import { useState } from "react";
import { useCreateReview } from "../hooks/use-create-review";

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
    <form onSubmit={handleSubmit} className="mt-10 space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Review"
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
  );
}
