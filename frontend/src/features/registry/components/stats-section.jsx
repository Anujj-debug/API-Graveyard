import { useStats } from "../hooks/use-stats";
import { Server, MessageSquare, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const { data, isLoading, error } = useStats();

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 relative z-10 -mt-8 md:-mt-12">
      <div className="grid gap-6 sm:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400 transition-transform duration-300 group-hover:scale-110">
              <Server size={28} />
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight text-foreground">
              {String(data.apisCount).padStart(2, "0")}
            </h3>
            <p className="mt-2 font-medium text-muted-foreground">APIs Tracked</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight text-foreground">
              {String(data.reviewsCount).padStart(2, "0")}
            </h3>
            <p className="mt-2 font-medium text-muted-foreground">Community Reviews</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110">
              <FileText size={28} />
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight text-foreground">
              {String(data.statusReportsCount).padStart(2, "0")}
            </h3>
            <p className="mt-2 font-medium text-muted-foreground">Status Reports</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
