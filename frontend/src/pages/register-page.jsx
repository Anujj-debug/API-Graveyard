import { useState } from "react";
import { useRegister } from "@/features/auth/hooks/use-register";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
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
          window.location.href = "/login";
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
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border p-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border p-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border p-3"
            />

            {mutation.isError && (
              <p className="text-sm text-red-500">
                {mutation.error?.response?.data?.message}
              </p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full rounded-md bg-black px-4 py-3 text-white"
            >
              {mutation.isPending ? "Creating account..." : "Register"}
            </button>
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
