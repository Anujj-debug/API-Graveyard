import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateAPI } from "../hooks/use-create-api";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {toast} from "sonner";

export default function SubmitAPIForm() {
  const token = localStorage.getItem("token");

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
        toast.success("API submitted successfully!");
        navigate(`/apis/${data.api._id}`);
      },
    });
  };

  if (!token) {
    return (
      <Card className="mt-8">
        <CardContent className="p-8 text-center">
          Please login to submit APIs.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Submit a New API</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">API Name</label>

            <Input
              placeholder="Stripe"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Textarea
              placeholder="Describe what this API does..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>

              <Input
                placeholder="Payments"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>

              <Input
                placeholder="Stripe Inc."
                value={formData.company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Website URL</label>

              <Input
                placeholder="https://stripe.com"
                value={formData.websiteUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    websiteUrl: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Docs URL</label>

              <Input
                placeholder="https://docs.stripe.com"
                value={formData.docsUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    docsUrl: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pricing Model</label>

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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Official Status</label>

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
            </div>
          </div>

          {formData.name && (
            <p className="text-sm text-muted-foreground">
              Slug: {formData.name.toLowerCase().replaceAll(" ", "-")}
            </p>
          )}

          {mutation.isError && (
            <p className="text-sm text-red-500">
              {mutation.error?.response?.data?.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          ><Plus className="mr-2 h-4 w-4" />
            {mutation.isPending ? "Submitting..." : "Submit API"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
