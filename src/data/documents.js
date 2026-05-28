export const documentsData = [
  {
    id: "doc_portal_redesign",
    projectName: "Portal Redesign",
    title: "PMRG Solution Customer Portal Redesign BRD v2.1",
    author: "Priya M.",
    uploadedDate: "2026-05-20",
    status: "Awaiting Business Review",
    summary: "Complete visual and performance overhaul of the user portal, switching to modular single-page React architecture, integrating credit card payments and self-provisioning dashboards.",
    scope: [
      "Modular payment gateway integration supporting Visa/MC/AMEX",
      "Dynamic dashboard widget canvas representing active broadband usage metrics",
      "Self-service contract renewals and billing upgrade pipelines"
    ],
    assumptions: [
      "Broadband usage data is fetched from the primary Data Lake within 500ms SLA",
      "Security compliance passes external PCI-DSS Level 2 audit checklist"
    ],
    dependencies: [
      "Billing Module re-platform API endpoints (pending)",
      "API Gateway routing configurations"
    ],
    impactedSystems: ["Core billing engine", "User identity server", "Customer CRM DB"],
    missingInformation: "Specific guidelines on corporate tax rates for regional broadband offerings are omitted.",
    approvalNeeds: [
      { role: "Business Owner", name: "Ramesh K.", status: "Pending" },
      { role: "Finance Lead", name: "Anil S.", status: "Approved" }
    ]
  },
  {
    id: "doc_crm_integration",
    projectName: "CRM Integration",
    title: "PMRG Solution CRM Salesforce Integration Plan v1.0",
    author: "Priya M.",
    uploadedDate: "2026-05-01",
    status: "Approved",
    summary: "Enterprise synchronization linking PMRG Solution's customer services team with standard CRM contacts. Covers sales leads, automated service logs, and account lifecycle alerts.",
    scope: [
      "Salesforce web-to-lead synchronization within 60 seconds",
      "Unified service rep dashboard showing support history & billing alerts",
      "Automatic logging of payment failures into CRM accounts"
    ],
    assumptions: [
      "Salesforce API limits remain under 100k requests daily threshold",
      "Offline cache stores logs up to 24 hours in case of carrier failure"
    ],
    dependencies: [
      "Notification Engine push APIs",
      "SSO Module Okta connector"
    ],
    impactedSystems: ["Salesforce CRM Cloud", "Customer database", "Email server"],
    missingInformation: "No explicit load capacity testing plan captured in the solution architecture.",
    approvalNeeds: [
      { role: "Business Owner", name: "Ramesh K.", status: "Approved" },
      { role: "Solution Architect", name: "Neha R.", status: "Approved" }
    ]
  },
  {
    id: "doc_billing_module",
    projectName: "Billing Module",
    title: "Billing Backend Core Replatforming BRD v3.2",
    author: "Priya M.",
    uploadedDate: "2026-05-10",
    status: "Approved",
    summary: "Re-platforming the billing backend to support multi-currency invoices, credit note generation, and automated tax calculations.",
    scope: [
      "Support multi-currency invoicing (USD, EUR, GBP, INR)",
      "Automated tax calculations using third-party Avalara API integration",
      "Dynamic PDF invoice generation and batch email dispatch"
    ],
    assumptions: [
      "Finance team provides tax compliance mapping tables",
      "Avalara service uptime exceeds 99.9% SLA"
    ],
    dependencies: [
      "Notification Engine core endpoints"
    ],
    impactedSystems: ["Corporate Treasury Ledger", "Customer DB", "Notification Engine"],
    missingInformation: "Detailed escalation workflow for disputed invoice accounts is not documented.",
    approvalNeeds: [
      { role: "Business Owner", name: "Ramesh K.", status: "Approved" },
      { role: "Finance Lead", name: "Anil S.", status: "Pending" }
    ]
  }
];
