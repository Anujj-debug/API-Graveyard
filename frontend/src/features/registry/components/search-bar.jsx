import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchAPIs } from "../hooks/use-search-apis";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useSearchAPIs(searchTerm);

  return (
    <div className="mx-auto max-w-2xl">
      <Input
        placeholder="Search APIs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading && <p className="mt-2">Searching...</p>}

      {data?.apis?.length > 0 && (
        <div className="mt-4 rounded-lg border">
          {data.apis.map((api) => (
            <div key={api._id} className="border-b p-3">
              {api.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
