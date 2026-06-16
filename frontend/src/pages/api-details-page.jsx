import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAPI } from "@/features/registry/hooks/use-api";
import StatusReportSection from "@/features/status-reports/components/status-report-section";
import StatusReportForm from "@/features/status-reports/components/status-report-form";
import ReviewsSection from "@/features/reviews/components/reviews-section";
import ReviewForm from "@/features/reviews/components/review-form";
import { API_STATUS_OPTIONS } from "@/features/registry/constants/api-options";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Star,
  Globe,
  FileText,
  MessageSquare,
  Activity,
  ArrowLeft,
  ExternalLink,
  User,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const statusClasses = {
  Active: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/30",
  Stable: "bg-sky-100 text-sky-800 hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400 dark:hover:bg-sky-900/30",
  Maintenance: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/30",
  Deprecated: "bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/30",
  Dead: "bg-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800",
  Unstable: "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/30",
  Acquired: "bg-violet-100 text-violet-800 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/30",
  "Rate-Limited": "bg-zinc-100 text-zinc-800 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800",
};

const getStatusClass = (status) =>
  API_STATUS_OPTIONS.includes(status)
    ? statusClasses[status] || "bg-secondary text-secondary-foreground hover:bg-secondary"
    : "bg-secondary text-secondary-foreground hover:bg-secondary";

export default function APIDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useAPI(id);
  const [activeTab, setActiveTab] = useState("reports");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Skeleton className="mb-6 h-80 w-full rounded-3xl" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-destructive">Something went wrong</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            <Link to="/apis" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />

            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start justify-between gap-8">

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Logo Container */}
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-secondary text-3xl font-bold text-secondary-foreground shadow-sm ring-1 ring-border">
                    {data.logoUrl ? (
                      <img
                        src={data.logoUrl}
                        alt={data.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{data.name?.[0] || "A"}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-md">
                        {data.category}
                      </Badge>
                      <Badge className={getStatusClass(data.officialStatus)}>
                        {data.officialStatus}
                      </Badge>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                      {data.name}
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                      {data.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex w-full shrink-0 flex-col sm:flex-row md:w-auto gap-3">
                  <Button asChild size="lg" className="w-full sm:w-auto shadow-sm">
                    <a href={data.websiteUrl} target="_blank" rel="noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Website
                      <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="w-full sm:w-auto bg-background/50 backdrop-blur-md">
                    <a href={data.docsUrl} target="_blank" rel="noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      Docs
                      <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Metadata row */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground border-t border-border/50 pt-6">
                <span className="inline-flex items-center gap-2">
                  <User size={16} className="text-primary/70" />
                  Submitted by <span className="font-medium text-foreground">{data.addedBy?.username || "Unknown"}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar size={16} className="text-primary/70" />
                  Added {new Date(data.createdAt).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Badge variant="secondary" className="font-normal text-xs">
                    {data.pricingModel}
                  </Badge>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium Stats Row */}
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                <Star size={24} className="fill-current" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rating</p>
                <h3 className="text-2xl font-bold text-foreground">{data.averageRating ?? "0.0"}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reviews</p>
                <h3 className="text-2xl font-bold text-foreground">{data.reviewCount ?? 0}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Community</p>
                <h3 className="text-xl font-bold text-foreground">{data.communityStatus}</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alternatives Section */}
        {data.alternatives?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Alternatives to {data.name}</h2>
              <p className="text-muted-foreground">Other APIs users frequently compare.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.alternatives.map((alternative) => (
                <Link
                  key={alternative._id}
                  to={`/apis/${alternative._id}`}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {alternative.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {alternative.category}
                      </p>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Badge variant="secondary" className="bg-secondary/50">
                        {alternative.officialStatus}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interactive Tabs: Reports & Reviews */}
        <div className="mt-16">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("reports")}
                className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === "reports"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Status Reports
                {activeTab === "reports" && (
                  <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === "reviews"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Community Reviews
                {activeTab === "reviews" && (
                  <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {activeTab === "reports" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <StatusReportForm apiId={id} />
                <StatusReportSection apiId={id} />
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <ReviewForm apiId={id} />
                <ReviewsSection apiId={id} />
              </motion.div>
            )}

            {/* Empty column area to keep layout consistent or house sticky sidebar content later if needed */}
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">Did you know?</h3>
                <p className="text-sm text-muted-foreground">
                  You can help the community by leaving an honest review or submitting a status report when you notice the API acting up.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button variant={activeTab === "reports" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("reports")}>
                    <Activity className="mr-2 h-4 w-4" /> Log a Status Report
                  </Button>
                  <Button variant={activeTab === "reviews" ? "default" : "outline"} className="w-full justify-start" onClick={() => setActiveTab("reviews")}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Write a Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
