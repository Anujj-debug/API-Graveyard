import { useTrendingAPIs } from "../hooks/use-trending-apis";

export default function TrendingSection() {
  const { data, isLoading, error } = useTrendingAPIs();

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return <div className="p-10">Something went wrong</div>;
  }
  console.log("DATA:", data);
  console.log("ERROR:", error);
  console.log("LOADING:", isLoading);
  
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 text-3xl font-bold">Trending APIs ({data.count})</h2>

      <div className="space-y-4">
        {data?.apis?.map((api) => (
          <div key={api._id} className="rounded-xl border p-4">
            <h3 className="font-semibold">{api.name}</h3>

            <p>Rating: {api.averageRating}</p>

            <p>Reviews: {api.reviewCount}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
