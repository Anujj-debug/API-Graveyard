import { useTrendingAPIs } from "../hooks/use-trending-apis";

import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TrendingSection() {
  const { data, isLoading, error } = useTrendingAPIs();

  if (isLoading) {
    return <div className="p-10 text-center text-muted-foreground">Loading trending APIs...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-destructive">Failed to load trending APIs.</div>;
  }

  if (!data || !data.apis || data.apis.length === 0) {
    return <div className="p-10 text-center text-muted-foreground">No trending APIs found.</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex flex-col items-center sm:items-start">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Trending APIs
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          The most popular and actively reviewed APIs this week.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data.apis.map((api, index) => (
          <motion.div
            key={api._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/apis/${api._id}`} className="block h-full">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">

                {/* Background ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 text-xl font-bold text-secondary-foreground shadow-sm ring-1 ring-border transition-transform duration-300 group-hover:scale-105 group-hover:ring-primary/30">
                      {(api.name || "").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {api.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">
                        {api.category}
                      </p>
                      <div className="mt-3">
                        <Badge variant="secondary" className="bg-secondary/50 font-normal">
                          {api.communityStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full sm:w-auto flex-row sm:flex-col items-center sm:items-end justify-between pt-4 sm:pt-0 border-t sm:border-t-0 border-border/50 gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-amber-100/50 dark:bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-600 dark:text-amber-500">
                      <Star size={14} className="fill-current" />
                      <span>{api.averageRating ?? "—"}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <MessageSquare size={14} />
                      <span>{api.reviewCount ?? 0}</span>
                    </div>
                  </div>
                </div>

                {api.description && (
                  <div className="relative z-10 mt-6 pt-5 border-t border-border/50 text-sm text-muted-foreground line-clamp-2">
                    {api.description}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
