import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/use-login";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

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
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>

          <p className="mb-6 text-muted-foreground">
            Login to continue exploring APIs.
          </p>

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
              <p className="text-sm text-red-500">
                {mutation.error?.response?.data?.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? "Logging in..." : "Login"}
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
        </div>
      </div>
    </div>
  );
}
