import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPIs } from "@/features/registry/hooks/use-apis";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { API_CATEGORY_OPTIONS, API_STATUS_OPTIONS } from "@/features/registry/constants/api-options";

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
    return <div className="p-10">Failed to load APIs </div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-10">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Browse APIs</h1>
          <p className="text-sm text-muted-foreground">{data?.pagination?.total || 0} APIs found</p>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <Input
            placeholder="Search APIs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" onClick={() => { setSearch(""); setDebouncedSearch(""); }}>Clear</Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>

          {API_CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>

          {API_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading && !data ? (
          [...Array(6)].map((_, index) => (
            <Card key={index} className="rounded-lg">
              <CardContent className="p-5">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
              </CardContent>
            </Card>
          ))
        ) : (
          data?.apis?.map((api) => (
            <Link key={api._id} to={`/apis/${api._id}`} className="block">
              <Card className="hover:shadow-lg transition-shadow border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">{(api.name||"").slice(0,2).toUpperCase()}</div>
                      <div>
                        <h2 className="text-lg font-semibold text-card-foreground">{api.name}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{api.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge>{api.category}</Badge>
                          <Badge className={getStatusClass(api.officialStatus)}>{api.officialStatus}</Badge>
                          {api.pricingModel && <Badge>{api.pricingModel}</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                      <div className="flex items-center gap-4 text-foreground">
                        <div className="flex items-center gap-1 text-sm"><Star size={16} /> <span className="font-medium">{api.averageRating || 0}</span></div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground"><MessageSquare size={16} /> <span>{api.reviewCount || 0}</span></div>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground hidden sm:block">{api.lastUpdated ? new Date(api.lastUpdated).toLocaleDateString() : null}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}

        {!isLoading && data?.apis?.length === 0 && (
          <div className="rounded-xl border border-border p-10 text-center bg-card">
            <h3 className="text-lg font-semibold text-foreground">No APIs Found</h3>

            <p className="mt-2 text-muted-foreground">Try changing your search term or filters.</p>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {page} of {data?.pagination?.totalPages || 1}
        </span>

        <Button
          variant="outline"
          disabled={page === (data?.pagination?.totalPages || 1)}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
