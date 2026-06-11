import { useRouteError, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4 text-muted-foreground">
        {error?.statusText ||
          error?.message ||
          "Unexpected error"}
      </p>

      <Button asChild className="mt-8">
        <Link to="/">
          Back Home
        </Link>
      </Button>
    </div>
  );
}