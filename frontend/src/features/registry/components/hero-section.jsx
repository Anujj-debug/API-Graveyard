import { motion } from "framer-motion";
import SearchBar from "./search-bar";

export default function HeroSection() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
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
          Track API Health
          Before Betting
          Your Project On It
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Discover reliable APIs,
          community reviews,
          status reports,
          and alternatives.
        </p>

        <SearchBar />
        
      </motion.div>
    </section>
  );
}