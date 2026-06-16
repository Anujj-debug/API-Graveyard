import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateStatusReport } from "../hooks/use-create-status-report";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function StatusReportForm({ apiId }) {
  const mutation = useCreateStatusReport();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    status: "Active",
    evidenceUrl: "",
    note: "",
  });

  if (!token) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 text-center">
        <p className="text-center text-slate-600">
          🔒 Login required to submit status reports
        </p>
      </CardContent>
    </Card>
  );
}

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      apiId,
      reportData: formData,
    }, {
      onSuccess: () => {
        toast.success("Status report submitted successfully!");
      },
      onError: () => {
        toast.error("Failed to submit status report.");
      }
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Submit Status Report</CardTitle>
        <CardDescription>
          Share the current state of the API with the community.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
        >
          <option>Active</option>
          <option>Stable</option>
          <option>Unstable</option>
          <option>Deprecated</option>
          <option>Dead</option>
          <option>Maintenance</option>
          <option>Acquired</option>
          <option>Rate-Limited</option>
        </select>

        <Input
          placeholder="Evidence URL"
          value={formData.evidenceUrl}
          onChange={(e) =>
            setFormData({
              ...formData,
              evidenceUrl: e.target.value,
            })
          }
        />

        <Textarea
          placeholder="Status note..."
          value={formData.note}
          onChange={(e) =>
            setFormData({
              ...formData,
              note: e.target.value,
            })
          }
        />

        <Button type="submit" className="w-full sm:w-auto">Submit Status Report</Button>
      </form>
      </CardContent>
    </Card>
  );
}
