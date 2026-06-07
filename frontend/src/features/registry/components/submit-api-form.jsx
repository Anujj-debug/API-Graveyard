import { useState } from "react";
import { useCreateAPI } from "../hooks/use-create-api";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SubmitAPIForm() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    websiteUrl: "",
    docsUrl: "",
    company: "",
    pricingModel: "Free",
    officialStatus: "Active",
  });
  const mutation = useCreateAPI();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      slug: formData.name.toLowerCase().replaceAll(" ", "-"),
    };

    mutation.mutate(payload, {
      onSuccess: (data) => {
        navigate(`/apis/${data.api._id}`);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="API Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />

      <Textarea
        placeholder="API Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
      />

      <Input
        placeholder="Category"
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
      />

      <Input
        placeholder="Website URL"
        value={formData.websiteUrl}
        onChange={(e) =>
          setFormData({
            ...formData,
            websiteUrl: e.target.value,
          })
        }
      />

      <Input
        placeholder="Docs URL"
        value={formData.docsUrl}
        onChange={(e) =>
          setFormData({
            ...formData,
            docsUrl: e.target.value,
          })
        }
      />

      <Input
        placeholder="Company"
        value={formData.company}
        onChange={(e) =>
          setFormData({
            ...formData,
            company: e.target.value,
          })
        }
      />

      <select
        value={formData.pricingModel}
        onChange={(e) =>
          setFormData({
            ...formData,
            pricingModel: e.target.value,
          })
        }
        className="w-full rounded-md border p-2"
      >
        <option value="Free">Free</option>
        <option value="Freemium">Freemium</option>
        <option value="Paid">Paid</option>
        <option value="Enterprise">Enterprise</option>
        <option value="Open Source">Open Source</option>
        <option value="Unknown">Unknown</option>
      </select>

      <select
        value={formData.officialStatus}
        onChange={(e) =>
          setFormData({
            ...formData,
            officialStatus: e.target.value,
          })
        }
        className="w-full rounded-md border p-2"
      >
        <option value="Active">Active</option>
        <option value="Stable">Stable</option>
        <option value="Unstable">Unstable</option>
        <option value="Deprecated">Deprecated</option>
        <option value="Dead">Dead</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Acquired">Acquired</option>
        <option value="Rate-Limited">Rate-Limited</option>
      </select>

      {mutation.isSuccess && (
        <p className="text-sm text-green-500">API submitted successfully.</p>
      )}
      {mutation.isError && (
        <p className="text-sm text-red-500">
          {mutation.error?.response?.data?.message}
        </p>
      )}

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit API"}
      </Button>
    </form>
  );
}
