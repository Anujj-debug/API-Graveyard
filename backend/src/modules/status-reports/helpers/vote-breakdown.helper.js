export const getVoteBreakdown = (reports) => {
  const breakdown = {};

  reports.forEach((report) => {
    breakdown[report.status] =
      (breakdown[report.status] || 0) + 1;
  });

  return breakdown;
};