import React, { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import PortfolioDashboard from './pages/PortfolioDashboard';
import GovernanceWorkflow from './pages/GovernanceWorkflow';
import Projects from './pages/Projects';
import ProjectDetail from './components/ProjectDetail';
import Documents from './pages/Documents';
import ChangeRequests from './pages/ChangeRequests';
import CostApprovals from './pages/CostApprovals';
import SolutionValidation from './pages/SolutionValidation';
import RiskHeatmap from './pages/RiskHeatmap';
import PMBuddy from './pages/PMBuddy';
import AuditTrail from './pages/AuditTrail';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Centralized mock data
import { projects } from './data/projects';
import { users } from './data/users';
import { governanceTrends } from './data/trendMetrics';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [redirectTarget, setRedirectTarget] = useState(null);
  
  // Connects dashboard chips to buddy chat pre-fills
  const [buddyInitialQuery, setBuddyInitialQuery] = useState(null);

  // Apply state from history entry
  const applyState = (state) => {
    if (!state) return;
    if (state.view === "landing") {
      setShowLanding(true);
      setShowAuth(false);
    } else if (state.view === "auth") {
      setShowLanding(false);
      setShowAuth(true);
    } else if (state.view === "app") {
      setShowLanding(false);
      setShowAuth(false);
      setActivePage(state.page);
      setSelectedProjectId(state.projectId);
      if (state.buddyQuery) {
        setBuddyInitialQuery(state.buddyQuery);
      }
    }
  };

  // Browser History API synchronization
  useEffect(() => {
    // 1. Initialize history state on first render
    const initialHash = window.location.hash || "#landing";
    if (initialHash === "#landing") {
      window.history.replaceState({ view: "landing", page: "dashboard", projectId: null, buddyQuery: null }, "", "#landing");
    } else if (initialHash === "#auth") {
      window.history.replaceState({ view: "auth", page: "dashboard", projectId: null, buddyQuery: null }, "", "#auth");
    } else {
      const pageName = initialHash.replace("#", "").split("/")[0] || "dashboard";
      const projId = initialHash.split("/")[1] || null;
      window.history.replaceState({ view: "app", page: pageName, projectId: projId, buddyQuery: null }, "", initialHash);
      
      // Apply locally for refresh safety
      setShowLanding(false);
      setShowAuth(false);
      setActivePage(pageName);
      setSelectedProjectId(projId);
    }

    const handlePopState = (e) => {
      if (e.state) {
        applyState(e.state);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Unified navigation helper
  const navigateTo = (view, page = "dashboard", projectId = null, buddyQuery = null) => {
    if (buddyQuery !== null) {
      setBuddyInitialQuery(buddyQuery);
    }

    const state = { view, page, projectId, buddyQuery };
    const hash = view === "landing"
      ? "#landing"
      : view === "auth"
        ? "#auth"
        : `#${page}${projectId ? '/' + projectId : ''}`;

    window.history.pushState(state, '', hash);
    applyState(state);
  };

  // Reset session and return to Landing
  const handleLogout = () => {
    setCurrentUser(null);
    setRedirectTarget(null);
    navigateTo("landing");
  };

  // Navigate to project detail page
  const handleSelectProject = (projectId) => {
    navigateTo("app", "projectdetail", projectId);
  };

  // Connects quick action chips to conversational buddy
  const handleTriggerBuddyQuery = (queryText) => {
    navigateTo("app", "buddy", null, queryText);
  };

  // Successful login callback handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    const target = redirectTarget || "dashboard";
    setRedirectTarget(null); // Reset target redirection
    navigateTo("app", target, null);
  };

  // Main page switching router
  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <PortfolioDashboard
            projects={projects}
            users={users}
            trends={governanceTrends}
            onSelectProject={handleSelectProject}
            onTriggerBuddyQuery={handleTriggerBuddyQuery}
            onChangePage={(page) => navigateTo("app", page, null)}
          />
        );
      case "workflow":
        return (
          <GovernanceWorkflow 
            projects={projects} 
            onSelectProject={handleSelectProject} 
          />
        );
      case "projects":
        return (
          <Projects 
            projects={projects} 
            onSelectProject={handleSelectProject} 
          />
        );
      case "projectdetail":
        return (
          <ProjectDetail 
            projectId={selectedProjectId} 
            projects={projects} 
            onBack={() => window.history.back()} 
          />
        );
      case "documents":
        return <Documents />;
      case "changerequests":
        return <ChangeRequests />;
      case "costs":
        return <CostApprovals />;
      case "validation":
        return <SolutionValidation />;
      case "heatmap":
        return <RiskHeatmap />;
      case "buddy":
        return (
          <PMBuddy 
            initialQuery={buddyInitialQuery} 
            // Reset query after parsing inside buddy component
            onParsedQuery={() => setBuddyInitialQuery(null)} 
          />
        );
      case "audit":
        return <AuditTrail />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return (
          <PortfolioDashboard
            projects={projects}
            users={users}
            trends={governanceTrends}
            onSelectProject={handleSelectProject}
            onTriggerBuddyQuery={handleTriggerBuddyQuery}
            onChangePage={(page) => navigateTo("app", page, null)}
          />
        );
    }
  };

  // 1. Render Landing Page if active
  if (showLanding) {
    return (
      <LandingPage 
        onLaunchDashboard={() => {
          if (currentUser) {
            navigateTo("app", "dashboard", null);
          } else {
            navigateTo("auth", "dashboard", null);
          }
        }} 
        onBuddyClick={() => {
          if (currentUser) {
            navigateTo("app", "buddy", null);
          } else {
            setRedirectTarget("buddy");
            navigateTo("auth", "buddy", null);
          }
        }}
      />
    );
  }

  // 2. Render Auth SSO Portal if active
  if (showAuth) {
    return (
      <Auth 
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }

  // 3. Render Main App Shell
  return (
    <AppShell
      activePage={activePage}
      setActivePage={(page) => {
        navigateTo("app", page, null);
      }}
      onBackToLanding={() => navigateTo("landing")}
      currentUser={currentUser}
      onLogout={handleLogout}
      activeProjectCount={projects.length}
    >
      {renderActivePage()}
    </AppShell>
  );
}
