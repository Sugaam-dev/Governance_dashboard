export const riskCategories = [
  "Approval delay",
  "Cost risk",
  "BRD gap",
  "Dev risk",
  "Schedule slip"
];

export const riskLevels = {
  Low: { label: "Low", color: "bg-green-50 text-green-700 border-green-200", hex: "#f0vdf4", cellBg: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800" },
  Medium: { label: "Medium", color: "bg-amber-50 text-amber-700 border-amber-200", hex: "#fffbeb", cellBg: "bg-amber-50 hover:bg-amber-100 text-amber-800" },
  High: { label: "High", color: "bg-red-50 text-red-700 border-red-200", hex: "#fef2f2", cellBg: "bg-rose-100 hover:bg-rose-200 text-rose-800" },
  Critical: { label: "Critical", color: "bg-purple-950 text-white border-purple-900", hex: "#581c87", cellBg: "bg-red-950 hover:bg-red-900 text-white" }
};

export const topCriticalRisks = [
  { id: "tr1", project: "CRM Integration", riskType: "BRD Gap", severity: "Critical", impact: "High", mitigation: "Align Neha R. (Architect) and Ramesh K. (Owner) on real-time webhooks by Friday." },
  { id: "tr2", project: "Portal Redesign", riskType: "Approval Delay", severity: "Critical", impact: "High", mitigation: "Escalate BRD unreviewed backlog of 8 days to Digital VP." },
  { id: "tr3", project: "Billing Module", riskType: "Cost Risk", severity: "High", impact: "High", mitigation: "Acquire short-term funding allocation sign-off from Anil S." },
  { id: "tr4", project: "Identity Migration", riskType: "Dev Risk", severity: "High", impact: "Medium", mitigation: "Implement pre-migration sandbox automated tests." },
  { id: "tr5", project: "Loyalty Modernization", riskType: "Schedule Slip", severity: "High", impact: "High", mitigation: "Decouple non-dependent CRM marketing modules to prevent project delay." }
];

export const riskDistribution = [
  { category: "Approval Delay", low: 10, medium: 7, high: 4, critical: 1 },
  { category: "Cost Risk", low: 12, medium: 6, high: 3, critical: 1 },
  { category: "BRD Gap", low: 8, medium: 9, high: 4, critical: 1 },
  { category: "Dev Risk", low: 11, medium: 7, high: 4, critical: 0 },
  { category: "Schedule Slip", low: 9, medium: 8, high: 5, critical: 0 }
];
