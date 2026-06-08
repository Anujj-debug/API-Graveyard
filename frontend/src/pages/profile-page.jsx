import { useProfile } from "@/features/users/hooks/use-profile";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading, error } = useProfile(user._id);

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
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
    </div>
  );
}
