import { useState } from "react";
import { useRegister } from "@/features/auth/hooks/use-register";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";

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
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold">Create Account</h1>

          <p className="mb-6 text-muted-foreground">
            Register to continue exploring APIs.
          </p>

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
              <p className="text-sm text-red-500">
                {mutation.error?.response?.data?.message}
              </p>
            )}
  
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? "Creating account..." : "Register"}
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
        </div>
      </div>
    </div>
  );
}
