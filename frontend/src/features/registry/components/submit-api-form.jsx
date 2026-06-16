import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateAPI } from "../hooks/use-create-api";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Link2, Globe, FileText, Building2, ShieldCheck, Tag } from "lucide-react";
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
      <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center shadow-sm">
        <ShieldCheck className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
        <h2 className="text-3xl font-bold text-foreground">Sign in required</h2>
        <p className="mt-3 text-lg text-muted-foreground">Please log in to submit a new API listing and help keep the directory up to date.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card shadow-lg overflow-hidden">
      <div className="border-b border-border bg-muted/20 px-8 py-6">
        <h2 className="text-2xl font-bold text-foreground">API Details</h2>
        <p className="text-muted-foreground mt-1">Please provide accurate information to help users understand this API.</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground"><FileText className="h-4 w-4 text-primary" /> API Name</label>
              <Input
                placeholder="eg. Stripe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="h-12 rounded-xl bg-secondary/30 border-border"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground"><FileText className="h-4 w-4 text-primary" /> Description</label>
              <Textarea
                placeholder="Describe what this API does in a few sentences..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="min-h-[120px] rounded-xl bg-secondary/30 border-border resize-y"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground"><Tag className="h-4 w-4 text-primary" /> Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border border-border bg-secondary/30 px-4 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                {API_CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground"><Building2 className="h-4 w-4 text-primary" /> Company / Creator</label>
              <Input
                placeholder="eg. Stripe Inc."
                value={formData.company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: e.target.value,
                  })
                }
                className="h-12 rounded-xl bg-secondary/30 border-border"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground"><Globe className="h-4 w-4 text-primary" /> Website URL</label>
              <Input
                placeholder="eg. https://stripe.com"
                value={formData.websiteUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    websiteUrl: e.target.value,
                  })
                }
                className="h-12 rounded-xl bg-secondary/30 border-border"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground"><Link2 className="h-4 w-4 text-primary" /> Documentation URL</label>
              <Input
                placeholder="eg. https://docs.stripe.com"
                value={formData.docsUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    docsUrl: e.target.value,
                  })
                }
                className="h-12 rounded-xl bg-secondary/30 border-border"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Pricing Model</label>
              <select
                value={formData.pricingModel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricingModel: e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border border-border bg-secondary/30 px-4 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Open Source">Open Source</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Official Status</label>
              <select
                value={formData.officialStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    officialStatus: e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border border-border bg-secondary/30 px-4 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
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
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm text-foreground">
              Generated slug: <span className="font-bold text-primary">{formData.name.toLowerCase().replaceAll(" ", "-")}</span>
            </div>
          )}

          {mutation.isError && (
            <p className="rounded-xl border border-destructive/50 bg-destructive/10 px-5 py-4 text-sm text-destructive font-medium">
              {mutation.error?.response?.data?.message || "Failed to submit API. Please try again."}
            </p>
          )}

          <div className="pt-4 border-t border-border">
            <Button type="submit" size="lg" disabled={mutation.isPending} className="w-full sm:w-auto px-8 rounded-full shadow-md">
              <Plus className="mr-2 h-5 w-5" />
              {mutation.isPending ? "Submitting..." : "Submit API Listing"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
