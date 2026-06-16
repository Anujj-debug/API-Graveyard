import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPIs } from "@/features/registry/hooks/use-apis";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Search, SlidersHorizontal, X } from "lucide-react";
import { API_CATEGORY_OPTIONS, API_STATUS_OPTIONS } from "@/features/registry/constants/api-options";
import { motion } from "framer-motion";

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
    ? statusClasses[status] || "bg-secondary text-secondary-foreground hover:bg-secondary font-normal shadow-sm"
    : "bg-secondary text-secondary-foreground hover:bg-secondary font-normal shadow-sm";

export default function APIsPage() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useAPIs({
    search: debouncedSearch,
    category,
    officialStatus: status,
    page,
    limit: 6,
  });

  if (error && !data) {
    return <div className="p-10 text-center text-destructive">Failed to load APIs.</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Premium Header area with ambient background */}
      <div className="relative border-b border-border bg-card/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Browse APIs
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover {data?.pagination?.total || 0} APIs tracked by our community. Filter by category, status, or search for something specific.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Sticky Control Bar */}
        <div className="sticky top-20 z-30 mb-10 -mt-16 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search APIs by name or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 border-input bg-card shadow-sm"
              />
              {search && (
                <button 
                  onClick={() => { setSearch(""); setDebouncedSearch(""); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-1 hidden sm:flex">
                <SlidersHorizontal size={16} /> Filters
              </div>
              
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                <option value="">All Categories</option>
                {API_CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
              >
                <option value="">All Statuses</option>
                {API_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {isLoading && !data ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-16 w-16 rounded-2xl" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            data?.apis?.map((api, index) => (
              <motion.div
                key={api._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                          <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {api.name}
                          </h2>
                          <p className="mt-1 text-sm font-medium text-muted-foreground line-clamp-1">
                            {api.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-background/80 shadow-sm border border-border/50 font-normal">
                              {api.category}
                            </Badge>
                            <Badge className={getStatusClass(api.officialStatus)}>
                              {api.officialStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full sm:w-auto flex-row sm:flex-col items-center sm:items-end justify-between pt-4 sm:pt-0 border-t sm:border-t-0 border-border/50 gap-2 shrink-0">
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
                  </div>
                </Link>
              </motion.div>
            ))
          )}

          {!isLoading && data?.apis?.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-border p-16 text-center bg-card">
              <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-bold text-foreground">No APIs Found</h3>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                We couldn't find any APIs matching your current search or filter criteria. Try adjusting your settings.
              </p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-full"
                onClick={() => { setSearch(""); setCategory(""); setStatus(""); setDebouncedSearch(""); setPage(1); }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Custom Premium Pagination Controls */}
        {data?.pagination?.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full shadow-sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <span className="text-sm font-medium text-muted-foreground">
              Page <span className="text-foreground">{page}</span> of {data?.pagination?.totalPages}
            </span>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full shadow-sm"
              disabled={page === data?.pagination?.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
