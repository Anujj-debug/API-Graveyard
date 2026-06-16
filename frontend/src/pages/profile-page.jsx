import { useProfile } from "@/features/users/hooks/use-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MessageSquare, Activity, User2, CalendarDays, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const { data, isLoading, error } = useProfile(user?._id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl p-10">
        <Skeleton className="mb-6 h-44 w-full rounded-2xl" />

        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl p-10">
        <Card className="border-dashed border-border bg-muted/20">
          <CardContent className="p-10 text-center">
            <User2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground">Profile unavailable</h1>
            <p className="mt-2 text-muted-foreground">No signed-in user was found in local storage.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-destructive">Failed to load profile</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6 py-10 md:p-10">
      <div className="mb-8 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted/50 to-background p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Account overview</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{data.username}</h1>
            <p className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Mail size={16} />{data.email}</span>
              <span className="inline-flex items-center gap-2"><CalendarDays size={16} />Joined {new Date(data.createdAt).toLocaleDateString()}</span>
            </p>
          </div>

          <Badge className="w-fit bg-primary px-3 py-1 text-primary-foreground hover:bg-primary/90">Active member</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm transition-transform hover:-translate-y-0.5 border-border bg-card">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">APIs Submitted</p>
            <h3 className="mt-2 text-4xl font-bold text-card-foreground">{data.apisCount}</h3>
          </CardContent>
        </Card>

        <Card className="shadow-sm transition-transform hover:-translate-y-0.5 border-border bg-card">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Reviews Written</p>
            <h3 className="mt-2 text-4xl font-bold text-card-foreground">{data.reviewsCount}</h3>
          </CardContent>
        </Card>

        <Card className="shadow-sm transition-transform hover:-translate-y-0.5 border-border bg-card">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Status Reports</p>
            <h3 className="mt-2 text-4xl font-bold text-card-foreground">{data.statusReportsCount}</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-sm border-border bg-card">
        <CardHeader className="border-b border-border">
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-3">
            {data.activity.length === 0 ? (
              <p className="text-muted-foreground">No activity yet.</p>
            ) : (
              data.activity.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    {item.type === "api" && <PlusCircle size={18} />}
                    {item.type === "review" && <MessageSquare size={18} />}
                    {item.type === "report" && <Activity size={18} />}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-card-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
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
