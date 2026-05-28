import React from 'react';
import { Bell, Search, Sparkles, ChevronRight, Home } from 'lucide-react';

export const Topbar = ({ activePage, onBackToLanding, activeProjectCount = 22 }) => {
  // Page titles map
  const pageTitles = {
    dashboard: "Portfolio Dashboard",
    workflow: "Governance Workflow Board",
    projects: "PMRG Solution Project Directory",
    documents: "BRD Document Intelligence",
    changerequests: "Change Request Control",
    costs: "Cost & Funding Approvals",
    validation: "BRD vs Solution Doc Alignment",
    heatmap: "Risk Heatmap & Mitigations",
    buddy: "AI PM Buddy Assistant",
    audit: "Traceability Audit Ledger",
    reports: "Executive Governance Reports",
    settings: "Rules & Configuration Settings"
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 px-6 flex items-center justify-between z-20">
      {/* Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToLanding}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition flex items-center gap-1.5 text-xs font-medium"
          title="Back to Landing Page"
        >
          <Home size={14} />
          <span>Landing</span>
        </button>
        <ChevronRight size={12} className="text-slate-300" />
        <div>
          <h1 className="text-sm font-semibold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)', margin: 0, fontSize: '0.95rem' }}>
            {pageTitles[activePage] || "Platform"}
          </h1>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Active Projects Status Pill */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeProjectCount} Projects Active</span>
        </div>

        {/* AI Health Summary Pill */}
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 cursor-pointer hover:bg-blue-100 transition">
          <Sparkles size={12} className="text-blue-500" />
          <span>AI Insight: 3 Alerts</span>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* Search Mock */}
        <div className="relative max-w-xs hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={14} className="text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search projects, BRDs..."
            className="w-48 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Notifications */}
        <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition relative">
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
};
