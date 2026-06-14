import { Link, useParams } from "react-router-dom";
import { useAPI } from "@/features/registry/hooks/use-api";
import ReviewsSection from "@/features/reviews/components/reviews-section";
import ReviewForm from "@/features/reviews/components/review-form";
import StatusReportSection from "@/features/status-reports/components/status-report-section";
import StatusReportForm from "@/features/status-reports/components/status-report-form";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Globe, FileText, MessageSquare, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function APIDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useAPI(id);

  if (isLoading) {
  return (
    <div className="mx-auto max-w-5xl p-10">
      <Skeleton className="mb-6 h-64 w-full" />

      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
  if (error) {
    return <div className="p-10">Something went wrong</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="mx-auto max-w-5xl p-10">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 p-4">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border">
                  {data.logoUrl ? (
                    <img
                      src={data.logoUrl}
                      alt={data.name}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold">{data.name[0]}</span>
                  )}
                </div>

                <div>
                  <CardTitle className="text-6xl font-bold md:text-7xl">
                    {data.name}
                  </CardTitle>

                  <p className="mt-2 text-muted-foreground">
                    {data.description}
                  </p>
                  <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>Submitted by {data.addedBy?.username}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>
                        {new Date(data.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge
                  className={
                    data.officialStatus === "Active"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }
                >
                  {data.officialStatus}
                </Badge>

                <Badge variant="secondary">{data.category}</Badge>

                <Badge variant="outline">{data.pricingModel}</Badge>
              </div>

              <div className="flex gap-3">
                <Button asChild>
                  <a href={data.websiteUrl} target="_blank" rel="noreferrer">
                    <Globe size={16} />
                    Website
                  </a>
                </Button>

                <Button variant="outline" asChild>
                  <a href={data.docsUrl} target="_blank" rel="noreferrer">
                    <FileText size={16} />
                    Docs
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mb-8 grid gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
        >
          <motion.div
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Card>
              <CardContent className="p-6">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star size={16} />
                  Average Rating
                </p>

                <h3 className="text-3xl font-bold">{data.averageRating}</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Card>
              <CardContent className="p-6">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare size={16} />
                  Reviews
                </p>

                <h3 className="text-3xl font-bold">{data.reviewCount}</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Card>
              <CardContent className="p-6">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity size={16} />
                  Community Status
                </p>

                <h3 className="text-3xl font-bold">{data.communityStatus}</h3>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Alternatives */}
        {data.alternatives?.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Alternatives</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {data.alternatives.map((alternative) => (
                  <Link
                    key={alternative._id}
                    to={`/apis/${alternative._id}`}
                    className="rounded-lg border p-4 transition hover:bg-muted"
                  >
                    <h3 className="font-semibold">{alternative.name}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {alternative.category}
                    </p>

                    <Badge variant="outline" className="mt-2">
                      {alternative.officialStatus}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <StatusReportSection apiId={id} />
        <StatusReportForm apiId={id} />

        {/* Review Form */}
        <ReviewForm apiId={id} />

        {/* Reviews */}
        <ReviewsSection apiId={id} />
      </div>
    </div>
  );
}
