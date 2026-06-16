import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchBar from "./search-bar";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6 py-12 md:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left">
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
              Track API health before betting your project on it
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground lg:mx-0">
              Discover reliable APIs, community reviews, status reports, and
              alternatives — all in one place.
            </p>

            <div className="mx-auto max-w-2xl lg:mx-0">
              <SearchBar />
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                API Reviews
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Community Status
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Status Reports
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Alternatives
              </span>
            </div>

            <div className="mt-6 flex justify-center lg:justify-start">
              <Link
                to="/apis"
                className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Explore APIs
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 text-sm font-medium text-muted-foreground">
                Recently updated
              </div>
              <ul className="space-y-4">
                <li className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-card-foreground">
                      Payments API
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Status: Operational
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">4.8 ★</div>
                </li>

                <li className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-card-foreground">
                      Maps API
                    </div>
                    <div className="text-xs text-destructive">
                      Status: Partial outage
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">3.2 ★</div>
                </li>

                <li className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-card-foreground">
                      Auth API
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Status: Operational
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">4.5 ★</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
