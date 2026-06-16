import { useState } from "react";
import { useRegister } from "@/features/auth/hooks/use-register";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(
      {
        username,
        email,
        password,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully! Please login.");
          navigate("/login");
        },
      },
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-muted/50 via-background to-muted/20 px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="hidden overflow-hidden border border-border bg-card text-card-foreground shadow-2xl lg:block">
          <CardContent className="p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              <Sparkles className="h-4 w-4" />
              Join the community
            </div>

            <h1 className="mt-6 max-w-lg text-4xl font-bold tracking-tight text-foreground">
              Create an account to submit APIs and write reviews.
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
              Keep your profile, activity, and contributions in one place with a simple registration flow.
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Track your contributions</div>
              <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Submit and review APIs</div>
              <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Access your profile quickly</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-md border border-border shadow-sm lg:max-w-none bg-card">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-3xl">Create account</CardTitle>
            <CardDescription>
              Register to continue exploring APIs.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

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
                {mutation.isPending ? "Creating account..." : "Register"}
                {!mutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
