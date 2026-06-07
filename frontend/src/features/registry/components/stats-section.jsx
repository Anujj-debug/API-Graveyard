export default function StatsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 text-center">
          <h3 className="text-4xl font-bold">
            100+
          </h3>

          <p>APIs Tracked</p>
        </div>

        <div className="rounded-xl border p-6 text-center">
          <h3 className="text-4xl font-bold">
            500+
          </h3>

          <p>Reviews</p>
        </div>

        <div className="rounded-xl border p-6 text-center">
          <h3 className="text-4xl font-bold">
            50+
          </h3>

          <p>Status Reports</p>
        </div>
      </div>
    </section>
  );
}