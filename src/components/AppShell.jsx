import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppShell = ({ activePage, setActivePage, onBackToLanding, currentUser, onLogout, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden w-full relative">
      {/* Sidebar Drawer Backdrop (Visible on mobile/tablet screens when menu is open) */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation (Absolute drawer on mobile, static sidebar on desktop) */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform md:relative md:translate-x-0 sidebar-transition shrink-0
        ${mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
      `}
      style={{
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setMobileOpen(false); // Auto-dismiss drawer after page transition on mobile
          }}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          currentUser={currentUser}
          onLogout={onLogout}
        />
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col overflow-hidden h-full min-w-0">
        {/* Top Header */}
        <Topbar 
          activePage={activePage} 
          onBackToLanding={onBackToLanding}
          activeProjectCount={22}
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
        />

        {/* Dynamic page container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in focus:outline-none bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};
