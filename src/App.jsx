import React, { useState } from 'react';
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
  
  // Connects dashboard chips to buddy chat pre-fills
  const [buddyInitialQuery, setBuddyInitialQuery] = useState(null);

  // Reset session and return to Landing
  const handleLogout = () => {
    setCurrentUser(null);
    setShowLanding(true);
    setShowAuth(false);
    setActivePage("dashboard");
  };

  // Navigate to project detail page
  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    setActivePage("projectdetail");
  };

  // Connects quick action chips to conversational buddy
  const handleTriggerBuddyQuery = (queryText) => {
    setBuddyInitialQuery(queryText);
    setActivePage("buddy");
  };

  // Back button navigation
  const handleBackToProjects = () => {
    setActivePage("projects");
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
            onChangePage={setActivePage}
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
            onBack={handleBackToProjects} 
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
            onChangePage={setActivePage}
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
            setShowLanding(false);
          } else {
            setShowLanding(false);
            setShowAuth(true);
          }
        }} 
      />
    );
  }

  // 2. Render Auth SSO Portal if active
  if (showAuth) {
    return (
      <Auth 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setShowAuth(false);
        }} 
      />
    );
  }

  // 3. Render Main App Shell
  return (
    <AppShell
      activePage={activePage}
      setActivePage={(page) => {
        // Reset selected project when clicking other pages
        if (page !== "projectdetail") setSelectedProjectId(null);
        setActivePage(page);
      }}
      onBackToLanding={() => setShowLanding(true)}
      currentUser={currentUser}
      onLogout={handleLogout}
      activeProjectCount={projects.length}
    >
      {renderActivePage()}
    </AppShell>
  );
}
