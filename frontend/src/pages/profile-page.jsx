import { useProfile } from "@/features/users/hooks/use-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MessageSquare, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading, error } = useProfile(user._id);

  if (isLoading) {
  return (
    <div className="mx-auto max-w-5xl p-10">
      <Skeleton className="mb-6 h-40 w-full" />

      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}

  if (error) {
    return <div className="p-10">Failed to load profile</div>;
  }

  return (
    <div className="mx-auto max-w-5xl p-10">
      <h1 className="mb-8 text-4xl font-bold">Profile</h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">{data.username}</h2>

          <p className="text-muted-foreground">{data.email}</p>
          <p className="text-sm text-muted-foreground">
            Joined {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">APIs Submitted</p>

            <h3 className="text-4xl font-bold">{data.apisCount}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Reviews Written</p>

            <h3 className="text-4xl font-bold">{data.reviewsCount}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Status Reports</p>

            <h3 className="text-4xl font-bold">{data.statusReportsCount}</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {data.activity.length === 0 ? (
              <p className="text-muted-foreground">No activity yet.</p>
            ) : (
              data.activity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  {item.type === "api" && <PlusCircle size={18} />}

                  {item.type === "review" && <MessageSquare size={18} />}

                  {item.type === "report" && <Activity size={18} />}

                  <div>
                    <p className="font-medium">{item.text}</p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
