import { useParams } from "react-router-dom";
import { useAPI } from "@/features/registry/hooks/use-api";
import ReviewsSection from "@/features/reviews/components/reviews-section";
import ReviewForm from "@/features/reviews/components/review-form";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Globe, FileText, MessageSquare, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function APIDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useAPI(id);

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
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

        {/* Review Form */}
        <ReviewForm apiId={id} />

        {/* Reviews */}
        <ReviewsSection apiId={id} />
      </div>
    </div>
  );
}
