import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchBar from "./search-bar";
import { Activity, CheckCircle2, AlertCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Refined Ambient Background: Subtle Grid + Top Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-40 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl px-6 py-16 md:py-28"
      >
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left">
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground">
              Track API health before betting your project on it
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground lg:mx-0">
              Discover reliable APIs, community reviews, status reports, and
              alternatives - all in one place.
            </p>

            <div className="mx-auto max-w-2xl lg:mx-0 relative z-10">
              <SearchBar />
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                API Reviews
              </span>
              <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                Community Status
              </span>
              <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                Status Reports
              </span>
              <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                Alternatives
              </span>
            </div>

            <div className="mt-10 flex justify-center lg:justify-start">
              <Link
                to="/apis"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore APIs
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            {/* Glassmorphism Card */}
            <div className="relative z-10 rounded-3xl border border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-border/50">
              <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Activity size={16} />
                Recently updated
              </div>
              <ul className="space-y-6">
                <li className="group flex items-center justify-between gap-4 rounded-2xl bg-background/60 p-4 transition-colors hover:bg-background">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-foreground">
                        Payments API
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        Operational
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1 text-sm font-semibold text-foreground">
                    4.8 <span className="text-amber-500">★</span>
                  </div>
                </li>

                <li className="group flex items-center justify-between gap-4 rounded-2xl bg-background/60 p-4 transition-colors hover:bg-background">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-foreground">
                        Maps API
                      </div>
                      <div className="text-sm text-destructive font-medium">
                        Partial outage
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1 text-sm font-semibold text-foreground">
                    3.2 <span className="text-amber-500">★</span>
                  </div>
                </li>

                <li className="group flex items-center justify-between gap-4 rounded-2xl bg-background/60 p-4 transition-colors hover:bg-background">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-foreground">
                        Auth API
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        Operational
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-secondary/80 px-3 py-1 text-sm font-semibold text-foreground">
                    4.5 <span className="text-amber-500">★</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Decorative element behind card */}
            <div className="absolute -inset-4 z-0 rounded-[2.5rem] border border-border/50 bg-gradient-to-tr from-secondary/50 to-transparent opacity-50" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
