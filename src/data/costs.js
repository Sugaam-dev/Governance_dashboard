export const costMetrics = {
  totalEstimatedCost: 4050000,
  totalApprovedCost: 2180000,
  totalPendingApproval: 1870000,
  unapprovedCostsBreached: 7, // 7 projects with unapproved costs breaching SLA
  currency: "USD"
};

export const costApprovalsData = [
  { projectId: "billing_module", name: "Billing Module", estimated: 380000, approved: 0, variance: 380000, owner: "Anil S.", daysPending: 5, risk: "High" },
  { projectId: "data_lake_ph2", name: "Data Lake Phase 2", estimated: 450000, approved: 0, variance: 450000, owner: "Anil S.", daysPending: 1, risk: "Low" },
  { projectId: "notification_engine", name: "Notification Engine", estimated: 125000, approved: 0, variance: 125000, owner: "Anil S.", daysPending: 2, risk: "Medium" },
  { projectId: "analytics_hub", name: "Analytics Hub", estimated: 310000, approved: 0, variance: 310000, owner: "Governance Engine", daysPending: 1, risk: "Low" },
  { projectId: "invoice_engine", name: "Invoice Engine", estimated: 140000, approved: 0, variance: 140000, owner: "Suresh G.", daysPending: 2, risk: "Medium" },
  { projectId: "identity_migration", name: "Identity Migration", estimated: 180000, approved: 0, variance: 180000, owner: "Vikram A.", daysPending: 2, risk: "Medium" },
  { projectId: "archive_service", name: "Archive Service", estimated: 55000, approved: 0, variance: 55000, owner: "Ramesh K.", daysPending: 1, risk: "Low" },
  { projectId: "config_portal", name: "Config Portal", estimated: 45000, approved: 0, variance: 45000, owner: "Ramesh K.", daysPending: 1, risk: "Low" },
  { projectId: "integration_hub", name: "Integration Hub", estimated: 135000, approved: 0, variance: 135000, owner: "Ramesh K.", daysPending: 2, risk: "Medium" },
  { projectId: "vendor_management", name: "Vendor Management", estimated: 70000, approved: 0, variance: 70000, owner: "Suresh G.", daysPending: 1, risk: "Low" },
  { projectId: "search_service", name: "Search Service", estimated: 110000, approved: 0, variance: 110000, owner: "Anil S.", daysPending: 3, risk: "Medium" }
];

export const projectCostsBreakdown = [
  { name: "Portal Redesign", estimated: 120000, approved: 120000 },
  { name: "CRM Integration", estimated: 245000, approved: 245000 },
  { name: "Billing Module", estimated: 380000, approved: 0 },
  { name: "API Gateway", estimated: 90000, approved: 90000 },
  { name: "SSO Rollout", estimated: 65000, approved: 65000 },
  { name: "HR Self-Service", estimated: 110000, approved: 110000 },
  { name: "Data Lake Ph. 2", estimated: 450000, approved: 0 },
  { name: "Mobile App", estimated: 500000, approved: 500000 },
  { name: "Audit Trail", estimated: 75000, approved: 75000 },
  { name: "Workflow Engine", estimated: 220000, approved: 220000 },
  { name: "Loyalty Mod.", estimated: 320000, approved: 320000 }
];

export const monthlySpendTrend = [
  { month: "Jan", approved: 200000, pending: 50000 },
  { month: "Feb", approved: 350000, pending: 80000 },
  { month: "Mar", approved: 410000, pending: 120000 },
  { month: "Apr", approved: 580000, pending: 230000 },
  { month: "May", approved: 640000, pending: 380000 }
];
