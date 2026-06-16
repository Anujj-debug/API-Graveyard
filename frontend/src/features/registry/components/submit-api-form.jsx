import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateAPI } from "../hooks/use-create-api";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Link2, Globe, FileText, Building2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { API_CATEGORY_OPTIONS, API_STATUS_OPTIONS } from "../constants/api-options";

export default function SubmitAPIForm() {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "AI",
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
      <Card className="mt-8 border-dashed bg-muted/20">
        <CardContent className="p-8 text-center">
          <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-slate-600" />
          <h2 className="text-xl font-semibold text-slate-900">Sign in required</h2>
          <p className="mt-2 text-sm text-slate-600">Please log in to submit a new API listing and help keep the directory up to date.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Submit a New API</CardTitle>
        <CardDescription>
          Share an API with the community. Add the essential details so others can discover and evaluate it quickly.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-slate-500" /> API Name</label>
              <Input
                placeholder="eg. Stripe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-slate-500" /> Description</label>
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
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium"><Building2 className="h-4 w-4 text-slate-500" /> Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                {API_CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium"><Building2 className="h-4 w-4 text-slate-500" /> Company</label>
              <Input
                placeholder="eg. Stripe Inc."
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
              <label className="flex items-center gap-2 text-sm font-medium"><Globe className="h-4 w-4 text-slate-500" /> Website URL</label>
              <Input
                placeholder=" eg. https://stripe.com"
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
              <label className="flex items-center gap-2 text-sm font-medium"><Link2 className="h-4 w-4 text-slate-500" /> Docs URL</label>
              <Input
                placeholder="eg. https://docs.stripe.com"
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
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
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
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                {API_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formData.name && (
            <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm text-slate-700">
              Generated slug: <span className="font-medium text-slate-900">{formData.name.toLowerCase().replaceAll(" ", "-")}</span>
            </div>
          )}

          {mutation.isError && (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {mutation.error?.response?.data?.message || "Failed to submit API. Please try again."}
            </p>
          )}

          <Button type="submit" disabled={mutation.isPending} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {mutation.isPending ? "Submitting..." : "Submit API"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
