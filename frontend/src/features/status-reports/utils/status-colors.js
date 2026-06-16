export const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";

    case "Stable":
      return "bg-sky-100 text-sky-800 hover:bg-sky-100";

    case "Unstable":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";

    case "Maintenance":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";

    case "Deprecated":
      return "bg-rose-100 text-rose-800 hover:bg-rose-100";

    case "Dead":
      return "bg-slate-200 text-slate-700 hover:bg-slate-200";

    case "Acquired":
      return "bg-violet-100 text-violet-800 hover:bg-violet-100";

    case "Rate-Limited":
      return "bg-zinc-100 text-zinc-800 hover:bg-zinc-100";

    default:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100";
  }
};