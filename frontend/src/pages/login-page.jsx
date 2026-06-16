import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/use-login";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useLogin();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          login(data.user, data.token);
          toast.success("Logged in successfully");
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-muted/50 via-background to-muted/20 px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-2xl lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            <Sparkles className="h-4 w-4" />
            Secure account access
          </div>

          <h1 className="mt-6 max-w-lg text-4xl font-bold tracking-tight text-foreground">
            Sign in to manage APIs, reviews, and status reports.
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            Keep your work in one place and continue contributing to the API directory with a clean, focused experience.
          </p>

          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Protected session handling</div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Access your saved profile</div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Continue browsing without friction</div>
          </div>
        </div>

        <Card className="w-full max-w-md border border-border shadow-sm lg:max-w-none bg-card">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-3xl">Welcome back</CardTitle>
            <CardDescription>
              Login to continue exploring APIs.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {mutation.isError && (
                <p className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {mutation.error?.response?.data?.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? "Logging in..." : "Login"}
                {!mutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
