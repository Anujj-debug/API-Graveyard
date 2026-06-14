import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useSearchAPIs } from "../hooks/use-search-apis";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const { data, isLoading } = useSearchAPIs(debouncedSearch);

  return (
    <div className="mx-auto max-w-2xl">
      <Input
        placeholder="Search APIs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading && <p className="mt-2">Searching...</p>}
      {debouncedSearch && data?.apis?.length === 0 && !isLoading && (
        <div className="mt-4 rounded-lg border p-4 text-center">
          No APIs found.
        </div>
      )}

      {data?.apis?.length > 0 && (
        <div className="mt-4 rounded-lg border">
          {data.apis.map((api) => (
            <Link
              key={api._id}
              to={`/apis/${api._id}`}
              className="block border-b p-3 hover:bg-muted"
            >
              {api.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
