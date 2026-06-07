export const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-500";

    case "Stable":
      return "bg-blue-500";

    case "Unstable":
      return "bg-orange-500";

    case "Maintenance":
      return "bg-yellow-500 text-black";

    case "Deprecated":
      return "bg-gray-500";

    case "Dead":
      return "bg-red-500";

    case "Acquired":
      return "bg-purple-500";

    case "Rate-Limited":
      return "bg-amber-500 text-black";

    default:
      return "";
  }
};