import { motion } from "framer-motion";
import SearchBar from "./search-bar";

export default function HeroSection() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="max-w-4xl text-center"
      >
        <h1 className="mb-6 text-6xl font-bold tracking-tight">
          Track API Health Before Betting Your Project On It
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Discover reliable APIs, community reviews, status reports, and
          alternatives.
        </p>

        <SearchBar />
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="rounded-full border px-4 py-2">API Reviews</div>

          <div className="rounded-full border px-4 py-2">Community Status</div>

          <div className="rounded-full border px-4 py-2">Status Reports</div>

          <div className="rounded-full border px-4 py-2">API Alternatives</div>
        </div>
      </motion.div>
    </section>
  );
}
