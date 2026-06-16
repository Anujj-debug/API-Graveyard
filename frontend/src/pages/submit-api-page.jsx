import SubmitAPIForm from "@/features/registry/components/submit-api-form";
import { motion } from "framer-motion";

export default function SubmitAPIPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative border-b border-border bg-card/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/10 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Contribute a listing
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Submit an API to the directory
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Add useful APIs to the platform with clear metadata so others can browse, compare, and review them quickly.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="-mt-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SubmitAPIForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}