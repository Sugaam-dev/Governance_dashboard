import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  FolderKanban,
  FileText,
  GitPullRequest,
  DollarSign,
  ShieldCheck,
  Grid,
  Bot,
  History,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

const sidebarItems = [
  { id: "dashboard", label: "Portfolio Dashboard", icon: LayoutDashboard },
  { id: "workflow", label: "Governance Workflow", icon: GitBranch },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "documents", label: "BRD Documents", icon: FileText },
  { id: "changerequests", label: "Change Requests", icon: GitPullRequest },
  { id: "costs", label: "Cost Approvals", icon: DollarSign },
  { id: "validation", label: "Solution Validation", icon: ShieldCheck },
  { id: "heatmap", label: "Risk Heatmap", icon: Grid },
  { id: "buddy", label: "PM Buddy", icon: Bot, highlight: true },
  { id: "audit", label: "Audit Trail", icon: History },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings }
];

export const Sidebar = ({ activePage, setActivePage, collapsed, setCollapsed, currentUser, onLogout }) => {
  return (
    <aside
      className={`sidebar-transition shrink-0 border-r border-slate-200 bg-white h-screen sticky top-0 flex flex-col justify-between z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.02) 2px 0px 8px 0px",
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {/* Header / Brand */}
      <div>
        <div className={`p-4 flex items-center ${collapsed ? "justify-center" : "justify-between"} border-b border-slate-100 h-16`}>
          {!collapsed && (
            <div className="flex items-center">
              <img src="/logo.png" alt="PMRG Solution Logo" className="h-10 max-w-[175px] object-contain" />
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 overflow-hidden rounded flex items-center justify-start bg-white border border-slate-100 shadow-sm shrink-0">
              <img 
                src="/logo.png" 
                alt="PMRG Icon" 
                className="h-full w-auto max-w-none" 
              />
            </div>
          )}
          
          {/* Collapse/Expand Toggle Button */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
              title="Collapse Menu"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center rounded-lg p-2.5 text-xs font-medium transition-all duration-150 relative ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${item.highlight ? "border-l-2 border-blue-500 bg-slate-50/50" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`flex items-center ${collapsed ? "justify-center w-full" : "gap-3"}`}>
                  <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>
                
                {/* Active Indicator Bar on right side */}
                {isActive && !collapsed && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
                {item.highlight && !collapsed && !isActive && (
                  <span className="ml-auto bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase scale-90">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Toggle Expand and LogOut elements */}
      {collapsed && (
        <div className="p-3 border-t border-slate-100 flex flex-col items-center gap-2.5">
          <button
            onClick={() => setCollapsed(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"
            title="Expand Menu"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition"
            title="Sign Out Session"
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
      {!collapsed && (
        <div className="p-4 border-t border-slate-100 space-y-3.5 bg-slate-50/30">
          {/* Logged in Person Info ABOVE the Sign Out button */}
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-full ${currentUser?.color || "bg-blue-100 text-blue-800"} border border-slate-200 flex-center font-bold text-xs shrink-0`}>
              {currentUser?.avatar || "D"}
            </div>
            <div className="overflow-hidden">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Active Session</p>
              <p className="text-xs font-bold text-slate-800 truncate" title={currentUser?.name || "Demo Stakeholder"}>
                {currentUser?.name || "Demo Stakeholder"}
              </p>
              <p className="text-[10px] text-slate-500 truncate" title={currentUser?.email || "demo@pmrg.com"}>
                {currentUser?.email || "demo@pmrg.com"}
              </p>
            </div>
          </div>
          
          {/* Sign Out Trigger Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-bold text-xs py-2 rounded-lg transition duration-150 shadow-sm"
          >
            <LogOut size={13} />
            <span>Sign Out Session</span>
          </button>
        </div>
      )}
    </aside>
  );
};

