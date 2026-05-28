import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppShell = ({ activePage, setActivePage, onBackToLanding, currentUser, onLogout, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden w-full">
      {/* Sidebar navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        currentUser={currentUser}
        onLogout={onLogout}
      />



      {/* Main viewport */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Top Header */}
        <Topbar 
          activePage={activePage} 
          onBackToLanding={onBackToLanding}
          activeProjectCount={22} 
        />

        {/* Dynamic page container */}
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};
