import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPIs } from "@/features/registry/hooks/use-apis";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function APIsPage() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const STATUSES = [
    "Active",
    "Stable",
    "Unstable",
    "Deprecated",
    "Dead",
    "Maintenance",
    "Acquired",
    "Rate-Limited",
  ];

  const { data, isLoading, error } = useAPIs({
    search: debouncedSearch,
    category,
    officialStatus: status,
    page,
    limit: 5,
  });
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, status]);

  if (error) {
    return <div className="p-10">Failed to load APIs </div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-10">
      {" "}
      <h1 className="mb-2 text-4xl font-bold">Browse APIs </h1>
      <p className="mb-8 text-muted-foreground">
        {data?.pagination?.total || 0} APIs found
      </p>
      <Input
        placeholder="Search APIs..."
        value={search}
        onChange={(e) => {
          {
            isLoading && (
              <p className="text-sm text-muted-foreground">Searching...</p>
            );
          }
          setSearch(e.target.value);
        }}
        className="mb-4"
      />
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border p-2"
        >
          <option value="">All Categories</option>

          <option value="AI">AI</option>
          <option value="Auth">Auth</option>
          <option value="Backend">Backend</option>
          <option value="Payments">Payments</option>
          <option value="Storage">Storage</option>
          <option value="Communication">Communication</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border p-2"
        >
          <option value="">All Statuses</option>

          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4">
        {data?.apis?.map((api) => (
          <Link
            key={api._id}
            to={`/apis/${api._id}`}
            className="rounded-xl border p-5 hover:bg-muted"
          >
            <h2 className="font-semibold">{api.name}</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {api.description}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border px-2 py-1 text-xs">
                {api.category}
              </span>

              <span className="rounded-full border px-2 py-1 text-xs">
                {api.officialStatus}
              </span>

              <span className="rounded-full border px-2 py-1 text-xs">
                {api.pricingModel}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>⭐ {api.averageRating || 0}</span>

              <span>{api.reviewCount || 0} Reviews</span>
            </div>
          </Link>
        ))}
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
