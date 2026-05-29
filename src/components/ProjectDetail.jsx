import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  DollarSign, 
  FileText, 
  ShieldAlert, 
  History, 
  Bot, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ChevronRight
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { RiskBadge } from '../components/RiskBadge';

export default function ProjectDetail({ projectId, projects, onBack }) {
  // If project is not found, fallback to Portal Redesign
  const project = projects.find(p => p.id === projectId) || projects[0];
  
  const [activeTab, setActiveTab] = useState("Overview");
  const [copiedNote, setCopiedNote] = useState(false);

  const copyChaseNote = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const tabs = [
    { id: "Overview", label: "Overview", icon: Calendar },
    { id: "Documents", label: "Documents", icon: FileText },
    { id: "Approvals", label: "Approvals", icon: CheckCircle2 },
    { id: "Costing", label: "Costing", icon: DollarSign },
    { id: "Risks", label: "Risks", icon: ShieldAlert },
    { id: "Audit", label: "Audit Trail", icon: History },
    { id: "Buddy", label: "Buddy Notes", icon: Bot }
  ];

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Back to directory header */}
      <div className="flex justify-between items-center bg-white p-3 border border-slate-200 rounded-xl shadow-sm">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 border border-blue-200 transition flex items-center gap-1.5 text-xs font-bold shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Go Back</span>
        </button>
        <span className="text-[10px] text-slate-400 font-bold uppercase">Project ID: {project.id}</span>
      </div>

      {/* Hero Overview Card */}
      <div className="card space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {project.name}
              </h2>
              <StatusBadge stage={project.currentStage} />
              <RiskBadge level={project.riskLevel} />
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1"><User size={12} className="text-slate-400" /> PM: {project.pm}</span>
              <span className="flex items-center gap-1"><User size={12} className="text-slate-400" /> Business Owner: {project.businessOwner}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2 shrink-0">
            <Clock size={14} className="text-slate-400" />
            <div className="text-[10px] leading-tight">
              <span className="font-semibold text-slate-500 uppercase block">Stuck Age</span>
              <span className="font-bold text-slate-800 text-xs">{project.approvalAge} days at current gate</span>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
          {project.description}
        </p>
      </div>

      {/* Tabs Layout */}
      <div className="tabs-header">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn flex items-center gap-1.5 pb-2.5 px-3 ${activeTab === tab.id ? "active" : ""}`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Contents */}
      <div className="animate-fade-in">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Timeline */}
            <div className="card lg:col-span-8 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Lifecycle Timeline & Approval Sprints
              </h3>
              
              <div className="space-y-1 pl-2">
                {[
                  { stage: "Submission", label: "BRD intake review, metadata registration.", completed: true, date: "Completed — May 20" },
                  { stage: "Business Validation", label: "Business Owner validation alignment.", completed: project.id !== "portal_redesign", date: "Approved — May 22" },
                  { stage: "AI Gap Analysis", label: "Automated scan on document gaps.", completed: !["portal_redesign", "reporting_tool", "identity_migration"].includes(project.id), date: "Passed — May 23" },
                  { stage: "Cost Estimation", label: "Technical architecture engineering sizing.", completed: !["portal_redesign", "reporting_tool", "invoice_engine", "vendor_management"].includes(project.id), date: "Sized — May 24" },
                  { stage: "Cost Approval", label: "Finance approval budget allocation.", completed: !["portal_redesign", "reporting_tool", "invoice_engine", "billing_module", "data_lake_ph2"].includes(project.id), date: "Funded — May 25" },
                  { stage: "Solution Document Review", label: "Architectural alignment validation.", completed: ["mobile_app", "audit_trail", "hr_self_service", "workflow_engine"].includes(project.id), date: "Architecture sign-off" },
                  { stage: "Final Approval", label: "Go/No-Go capture compliance seal.", completed: ["mobile_app", "audit_trail", "workflow_engine"].includes(project.id), date: "Board sign-off" },
                  { stage: "Development Release", label: "Deployment branch trigger.", completed: ["mobile_app", "audit_trail"].includes(project.id), date: "Engineers assigned" }
                ].map((item, idx) => {
                  const isActive = project.currentStage === item.stage;
                  return (
                    <div key={idx} className="timeline-event">
                      <div className={`timeline-dot ${item.completed ? "completed" : ""} ${isActive ? "active" : ""}`} />
                      <div className="flex justify-between items-start text-xs pl-2">
                        <div>
                          <p className={`font-bold ${isActive ? "text-blue-600 text-sm" : item.completed ? "text-slate-800" : "text-slate-400"}`}>
                            {item.stage} {isActive && " (Active Gate)"}
                          </p>
                          <p className="text-slate-500 text-[10px] font-medium mt-0.5">{item.label}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold shrink-0">{item.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-4 space-y-4">
              <div className="card space-y-3.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Gate Summary</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-semibold">Active Gate</span>
                    <span className="font-bold text-slate-800">{project.currentStage}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-semibold">SLA Status</span>
                    <span className={`font-bold ${project.slaStatus === "Breached" ? "text-rose-600" : "text-emerald-600"}`}>{project.slaStatus}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-semibold">Pending Owner</span>
                    <span className="font-bold text-slate-800">{project.pendingApprover}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-semibold">Cost Status</span>
                    <span className="font-bold text-slate-800">{project.costStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Sized Budget</span>
                    <span className="font-bold text-slate-800">${project.cost.estimated.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="card bg-blue-50 border border-blue-200 space-y-2.5">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase">
                  <Bot size={14} />
                  <span>AI Assistant Recommendation</span>
                </div>
                <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                  "{project.nextAction}. Under PMRG Solution governance procedures, this project is classified as {project.riskLevel} risk due to {project.riskScores.brdGap === "Critical" ? "AI flagged BRD-to-solution scope mismatches" : "SLA gate breaching cycle times"}."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOCUMENTS */}
        {activeTab === "Documents" && (
          <div className="card space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Related Documents & Artifact Intelligence
            </h3>
            
            {project.documents && project.documents.length > 0 ? (
              <div className="space-y-3.5">
                {project.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-start gap-3">
                      <FileText className="text-blue-500 mt-0.5 shrink-0" size={18} />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">Type: {doc.type} • Uploaded: {doc.date} • Status: {doc.status}</p>
                      </div>
                    </div>
                    
                    <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[10px] px-2.5 py-1.5 rounded transition shrink-0">
                      View AI Summary
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-slate-200 rounded-lg space-y-2">
                <FileText className="text-slate-300 mx-auto" size={32} />
                <p className="text-xs font-bold text-slate-400">No documents registered on this project yet.</p>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-3 py-1.5 rounded transition">
                  Upload BRD File
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: APPROVALS */}
        {activeTab === "Approvals" && (
          <div className="card space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Stakeholder Approval Sign-off History
            </h3>
            
            <div className="enterprise-table-container">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th>Stakeholder</th>
                    <th>Role</th>
                    <th>Gate Stage</th>
                    <th>Status</th>
                    <th>Age/Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {project.auditTrail && project.auditTrail.length > 0 ? (
                    project.auditTrail.map((log, idx) => (
                      <tr key={idx}>
                        <td className="font-bold">{log.actor}</td>
                        <td className="font-medium text-slate-500">Approver</td>
                        <td>{log.action}</td>
                        <td>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Approved
                          </span>
                        </td>
                        <td>{log.date}</td>
                        <td className="text-[10px] text-slate-400 font-medium">Traceable Signed</td>
                      </tr>
                    ))
                  ) : null}
                  {project.pendingApprover !== "None" && (
                    <tr className="bg-amber-50/20">
                      <td className="font-bold">{project.pendingApprover}</td>
                      <td className="font-medium text-slate-500">Required Sign-off</td>
                      <td>{project.currentStage}</td>
                      <td>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Pending
                        </span>
                      </td>
                      <td className="font-bold text-rose-600">{project.approvalAge} days overdue</td>
                      <td>
                        <button 
                          onClick={() => copyChaseNote(project.buddyNotes)}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[9px] px-2 py-1 rounded transition shrink-0"
                        >
                          Chase Sign-off
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COSTING */}
        {activeTab === "Costing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Cost Breakdown */}
            <div className="card lg:col-span-8 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Project Budget Allocation & Costs
              </h3>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Budget</span>
                  <span className="text-xl font-bold text-slate-800 block mt-1">${project.cost.estimated.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approved Budget</span>
                  <span className="text-xl font-bold text-slate-800 block mt-1">${project.cost.approved.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Remaining Variance</span>
                  <span className={`text-xl font-bold block mt-1 ${project.cost.variance > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                    ${project.cost.variance.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3.5 mt-4">
                <ProgressBar label="Budget Utilized Ratio" count={project.cost.approved} total={project.cost.estimated} color="blue" suffix="USD" />
              </div>
            </div>

            {/* Financial Risk summary */}
            <div className="card lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Treasury Compliance Check
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Cost Risk Indicator</span>
                  <span className="font-bold">{project.riskScores.costRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Variance Code</span>
                  <span className="font-bold text-slate-800">{project.costStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Audited Entity</span>
                  <span className="font-bold text-slate-800">Treasury Ledgers</span>
                </div>
              </div>
              
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] leading-relaxed text-slate-600 font-medium">
                💰 Under corporate policy 8.3, estimated costing variances exceeding $100k require a joint review between PMO Priya M. and Anil S.
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RISKS */}
        {activeTab === "Risks" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Dimensions */}
            <div className="card lg:col-span-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Risk Scores Across 5 Dimensions
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: "Approval delay", val: project.riskScores.approvalDelay },
                  { label: "Cost risk", val: project.riskScores.costRisk },
                  { label: "BRD gap", val: project.riskScores.brdGap },
                  { label: "Dev risk", val: project.riskScores.devRisk },
                  { label: "Schedule slip", val: project.riskScores.scheduleSlip }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-600">{item.label}</span>
                    <RiskBadge level={item.val} />
                  </div>
                ))}
              </div>
            </div>

            {/* AI Gaps */}
            <div className="card lg:col-span-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                AI Detected Gaps & Technical Gaps
              </h3>
              
              {project.aiGaps && project.aiGaps.length > 0 ? (
                <div className="space-y-3">
                  {project.aiGaps.map((gap, idx) => (
                    <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg space-y-1.5 text-xs text-slate-700 font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-red-800 font-bold uppercase">{gap.category}</span>
                        <span className="bg-red-600 text-white text-[8px] font-bold px-1 rounded">{gap.severity}</span>
                      </div>
                      <p className="leading-relaxed text-slate-600">{gap.detail}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-slate-200 rounded-lg text-slate-400 font-medium text-xs">
                  ✅ AI Governance engine scanned this project and detected 0 structural gaps.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT TRAIL */}
        {activeTab === "Audit" && (
          <div className="card space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Traceable Audit Events Ledger
            </h3>
            
            {project.auditTrail && project.auditTrail.length > 0 ? (
              <div className="space-y-3.5">
                {project.auditTrail.map((log, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-start gap-3">
                    <History size={16} className="text-slate-400 mt-0.5 shrink-0" />
                    <div className="text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{log.action}</span>
                        <span className="text-[10px] text-slate-400">By {log.actor} • {log.date}</span>
                      </div>
                      <p className="text-slate-600 mt-1 leading-relaxed">{log.comment || "Action completed and logged in compliance database."}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 text-xs font-medium">
                No audited timeline logs registered on this project.
              </div>
            )}
          </div>
        )}

        {/* TAB 7: PM BUDDY NOTES */}
        {activeTab === "Buddy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Quick Draft Notes */}
            <div className="card lg:col-span-8 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                AI Assistant Chase Notes
              </h3>
              
              <p className="text-xs text-slate-600 font-medium">
                Below is the AI generated notification designed to chase the pending gate approver. Copy it or trigger Outlook integration.
              </p>
              
              <div className="bg-slate-900 text-slate-200 font-mono text-xs p-4 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed relative">
                {`Hi ${project.pendingApprover},\n\nHope you are well.\n\nCould you please review and sign off the ${project.currentStage} gate for the "${project.name}" project? The BRD is currently pending your action for ${project.approvalAge} days, breaching our standard SLA.\n\nWe need your sign-off to prevent schedule slippage of downstream dev releases.\n\nDashboard link: http://governance.pmrg.internal/project/${project.id}\n\nBest regards,\nPriya M.`}
                
                <button 
                  onClick={() => copyChaseNote(`Hi ${project.pendingApprover},\n\nCould you please review and sign off the ${project.currentStage} gate for "${project.name}"? Stuck for ${project.approvalAge} days.`)}
                  className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded transition"
                  title="Copy to Clipboard"
                >
                  <Copy size={14} />
                </button>
              </div>

              {copiedNote && (
                <p className="text-xs font-bold text-emerald-600 text-right animate-pulse">✓ Note copied to clipboard!</p>
              )}
            </div>

            {/* Recommendations */}
            <div className="card lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                PM Buddy Q&A Context
              </h4>
              
              <p className="text-xs leading-relaxed text-slate-500 font-semibold">
                Buddy Notes: <span className="font-normal text-slate-600">"{project.buddyNotes}"</span>
              </p>
              
              <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 font-semibold space-y-1">
                <p>💡 AI Recommendation:</p>
                <p className="font-normal text-slate-500 leading-relaxed">
                  Arrange a morning calendar blocker with {project.pendingApprover} to complete the validation gate directly.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
