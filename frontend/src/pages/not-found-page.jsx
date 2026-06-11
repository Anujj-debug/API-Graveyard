import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Button asChild className="mt-8">
        <Link to="/">
          Go Home
        </Link>
      </Button>
    </div>
  );
}