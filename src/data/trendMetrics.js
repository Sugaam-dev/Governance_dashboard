export const governanceTrends = [
  { metric: "Avg approval cycle time", value: "3.2 days", change: "+0.4d", direction: "up", severity: "warning" },
  { metric: "Escalations this week", value: "3", change: "-2", direction: "down", severity: "good" },
  { metric: "BRD-solution mismatches", value: "7", change: "+1", direction: "up", severity: "bad" },
  { metric: "Projects moved to next gate", value: "5", change: "+2", direction: "up", severity: "good" },
  { metric: "Projects started dev without sign-off", value: "0", change: "--", direction: "none", severity: "perfect" }
];

export const approvalFunnelSteps = [
  { gate: "BRD submitted", count: 22, color: "#3b82f6" },
  { gate: "Business review", count: 18, color: "#2563eb" },
  { gate: "Cost approval", count: 14, color: "#d97706" },
  { gate: "Solution review", count: 10, color: "#16a34a" },
  { gate: "Final go/no-go", count: 6, color: "#0d9488" },
  { gate: "Dev released", count: 4, color: "#4f46e5" }
];

export const monthlyCycleTimeTrend = [
  { month: "Dec 2025", avgDays: 2.5 },
  { month: "Jan 2026", avgDays: 2.8 },
  { month: "Feb 2026", avgDays: 2.4 },
  { month: "Mar 2026", avgDays: 2.9 },
  { month: "Apr 2026", avgDays: 2.8 },
  { month: "May 2026", avgDays: 3.2 }
];
