import { useProfile } from "@/features/users/hooks/use-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MessageSquare, Activity, User2, CalendarDays, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const { data, isLoading, error } = useProfile(user?._id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl p-10">
        <Skeleton className="mb-6 h-44 w-full rounded-3xl" />
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Skeleton className="h-36 w-full rounded-3xl" />
          <Skeleton className="h-36 w-full rounded-3xl" />
          <Skeleton className="h-36 w-full rounded-3xl" />
        </div>
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl p-10">
        <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center shadow-sm">
          <User2 className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
          <h1 className="text-3xl font-bold text-foreground">Profile unavailable</h1>
          <p className="mt-3 text-lg text-muted-foreground">Please sign in to view your profile and activity.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-destructive">Failed to load profile.</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        
        {/* Premium Profile Hero Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/15 pointer-events-none" />
            
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary to-primary/60 text-4xl font-bold text-primary-foreground shadow-xl ring-4 ring-background">
                  {data.username.slice(0, 2).toUpperCase()}
                </div>
                
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-1">
                    Account Overview
                  </p>
                  <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    {data.username}
                  </h1>
                  <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full"><Mail size={16} className="text-foreground/70" />{data.email}</span>
                    <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full"><CalendarDays size={16} className="text-foreground/70" />Joined {new Date(data.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex justify-center">
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-500/20 px-4 py-1.5 text-sm font-semibold rounded-full shadow-sm">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active Member
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Stat Cards */}
        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <PlusCircle size={28} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-foreground">{data.apisCount}</h3>
              <p className="mt-1 font-medium text-muted-foreground">APIs Submitted</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-foreground">{data.reviewsCount}</h3>
              <p className="mt-1 font-medium text-muted-foreground">Reviews Written</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
                <Activity size={28} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight text-foreground">{data.statusReportsCount}</h3>
              <p className="mt-1 font-medium text-muted-foreground">Status Reports</p>
            </div>
          </motion.div>
        </div>

        {/* Modern Activity Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="border-b border-border bg-muted/20 px-8 py-6">
              <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
              <p className="text-muted-foreground mt-1">Your latest contributions to the community.</p>
            </div>

            <div className="p-8">
              {data.activity.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Activity className="mx-auto mb-4 h-12 w-12 opacity-20" />
                  <p>You haven't made any contributions yet.</p>
                </div>
              ) : (
                <div className="relative border-l-2 border-border/50 ml-4 space-y-8 pl-8 py-2">
                  {data.activity.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[41px] top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-card bg-background shadow-sm">
                        <div className={`flex h-full w-full items-center justify-center rounded-full ${
                          item.type === "api" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                          item.type === "review" ? "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" :
                          "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}>
                          {item.type === "api" && <PlusCircle size={16} />}
                          {item.type === "review" && <MessageSquare size={16} />}
                          {item.type === "report" && <Activity size={16} />}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border/50 bg-secondary/20 p-5 transition-colors hover:bg-secondary/40">
                        <p className="text-base font-medium text-foreground">{item.text}</p>
                        <p className="mt-2 text-sm font-semibold text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
