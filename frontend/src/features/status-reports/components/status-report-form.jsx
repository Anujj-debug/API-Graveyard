import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateStatusReport } from "../hooks/use-create-status-report";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="mb-8">
      <CardContent className="p-6 text-center">
        <p className="text-center text-muted-foreground">
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
    });
  };

  return (
    <div className="mb-8 rounded-xl border bg-card p-6">
      <h3 className="mb-4 text-xl font-semibold">Submit Status Report</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
          className="w-full rounded-md border p-2"
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

        <Button type="submit">Submit Status Report</Button>
      </form>
    </div>
  );
}
