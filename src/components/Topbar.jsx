import React from 'react';
import { Bell, Search, Sparkles, ChevronRight, Home, Menu, ArrowLeft } from 'lucide-react';

export const Topbar = ({ activePage, onBackToLanding, activeProjectCount = 22, onMenuToggle }) => {
  // Page titles map
  const pageTitles = {
    dashboard: "Portfolio Dashboard",
    workflow: "Governance Workflow Board",
    projects: "Project Directory",
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

  const showBackButton = 
    window.location.hash !== "#landing" && 
    window.location.hash !== "#dashboard" && 
    window.location.hash !== "";

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 px-4 md:px-6 flex items-center justify-between z-20">
      {/* Page Title & Breadcrumb */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition md:hidden shrink-0"
          title="Toggle Navigation Menu"
        >
          <Menu size={18} />
        </button>

        <button
          onClick={onBackToLanding}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition flex items-center gap-1.5 text-xs font-semibold shrink-0"
          title="Back to Landing Page"
        >
          <Home size={13} />
          <span className="hidden sm:inline">Landing</span>
        </button>
        
        <ChevronRight size={11} className="text-slate-300 shrink-0" />

        {showBackButton && (
          <>
            <button
              onClick={() => window.history.back()}
              className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold transition flex items-center gap-1 text-[10px] shrink-0 border border-blue-200 shadow-sm"
              title="Browser Back"
            >
              <ArrowLeft size={11} />
              <span>Back</span>
            </button>
            <ChevronRight size={11} className="text-slate-300 shrink-0" />
          </>
        )}

        <div className="min-w-0">
          <h1 className="text-xs md:text-sm font-bold text-slate-800 tracking-tight truncate" style={{ fontFamily: 'var(--font-display)', margin: 0 }}>
            {pageTitles[activePage] || "Platform"}
          </h1>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Active Projects Status Pill */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-700">
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
