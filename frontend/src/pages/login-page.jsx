import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/use-login";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { ShieldCheck, Sparkles, ArrowRight, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] opacity-50 pointer-events-none" />

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-20">

        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col justify-center h-full rounded-[2.5rem] border border-border/50 bg-card/30 backdrop-blur-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-background/10 z-0" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-8 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Secure Account Access
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Welcome back to <br /><span className="text-primary">API Graveyard</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-md">
              Sign in to manage your APIs, post insightful reviews, and help the community track the health of digital services.
            </p>

            <div className="mt-10 space-y-5 text-base font-medium text-muted-foreground">
              <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-4 border border-border/50 shadow-sm transition-transform hover:-translate-y-1">
                <div className="bg-primary/20 p-2 rounded-xl text-primary"><ShieldCheck size={20} /></div>
                Protected session handling
              </div>
              <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-4 border border-border/50 shadow-sm transition-transform hover:-translate-y-1">
                <div className="bg-primary/20 p-2 rounded-xl text-primary"><ShieldCheck size={20} /></div>
                Access your saved profile & metrics
              </div>
              <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-4 border border-border/50 shadow-sm transition-transform hover:-translate-y-1">
                <div className="bg-primary/20 p-2 rounded-xl text-primary"><ShieldCheck size={20} /></div>
                Continue browsing without friction
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="rounded-[2.5rem] border border-border bg-card p-8 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Sign In</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Mail size={16} className="text-primary" /> Email
                  </label>
                  <Input
                    type="email"
                    placeholder="nightcoder@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl bg-secondary/30 border-border text-base focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Lock size={16} className="text-primary" /> Password
                    </label>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl bg-secondary/30 border-border text-base focus-visible:ring-primary/50"
                  />
                </div>
              </div>

              {mutation.isError && (
                <div className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium">
                  {mutation.error?.response?.data?.message || "Invalid credentials. Please try again."}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={mutation.isPending}
                className="w-full rounded-xl shadow-lg shadow-primary/20 h-12 text-base font-semibold"
              >
                {mutation.isPending ? "Signing in..." : "Sign In"}
                {!mutation.isPending && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-muted-foreground border-t border-border/50 pt-6">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
