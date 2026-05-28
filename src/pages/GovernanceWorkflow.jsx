import React from 'react';
import { GitBranch, Clock, User, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

const gatesList = [
  { id: "Submission", label: "Submission", owner: "Project Manager", sla: "3 Days", docs: "BRD Document Intake", bg: "border-t-blue-500" },
  { id: "Business Validation", label: "Business Validation", owner: "Business Owner", sla: "3 Days", docs: "Business Case alignment sign-off", bg: "border-t-indigo-500" },
  { id: "AI Gap Analysis", label: "AI Gap Analysis", owner: "Governance Engine", sla: "1 Day", docs: "Automated scan validation report", bg: "border-t-teal-500" },
  { id: "Cost Estimation", label: "Cost Estimation", owner: "VP of Engineering", sla: "5 Days", docs: "Technical sizing estimate", bg: "border-t-orange-500" },
  { id: "Cost Approval", label: "Cost Approval", owner: "Finance Lead", sla: "3 Days", docs: "Approved cost sign-off", bg: "border-t-amber-500" },
  { id: "Solution Document Review", label: "Solution Document Review", owner: "Solution Architect", sla: "5 Days", docs: "Approved Solution architecture doc", bg: "border-t-purple-500" },
  { id: "Final Approval", label: "Final Approval", owner: "Business Owner", sla: "2 Days", docs: "Final signed Go/No-Go capture", bg: "border-t-emerald-500" },
  { id: "Development Release", label: "Development Release", owner: "Dev Lead", sla: "1 Day", docs: "Code branch integration deployment", bg: "border-t-violet-500" }
];

export default function GovernanceWorkflow({ projects, onSelectProject }) {
  // Group projects by current stage
  const getProjectsInStage = (stage) => {
    return projects.filter(p => p.currentStage === stage);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          PMRG Solution Gate Governance Board
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Multi-gate validation chain tracking all 22 active integrations. Progressive gate access requires formal stakeholder verification.
        </p>
      </div>

      {/* Kanban Gates Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1600px] h-[580px]">
          {gatesList.map((gate) => {
            const stageProjects = getProjectsInStage(gate.id);
            const blockedProjects = stageProjects.filter(p => p.riskLevel === "Critical" || p.riskLevel === "High");

            return (
              <div 
                key={gate.id} 
                className={`bg-white border border-slate-200 border-t-4 ${gate.bg} rounded-xl p-3.5 w-[220px] flex flex-col justify-between shrink-0 shadow-sm`}
              >
                {/* Gate Meta Header */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 text-xs tracking-tight truncate max-w-[140px]">
                      {gate.label}
                    </h3>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                      {stageProjects.length}
                    </span>
                  </div>

                  {/* SLA Tag & Owner */}
                  <div className="space-y-1.5 mb-3 text-[10px] text-slate-500 font-semibold border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Clock size={11} className="text-slate-400" />
                      <span>SLA: {gate.sla} Target</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={11} className="text-slate-400" />
                      <span className="truncate">{gate.owner}</span>
                    </div>
                    {blockedProjects.length > 0 && (
                      <div className="flex items-center gap-1.5 text-rose-600">
                        <AlertCircle size={11} />
                        <span>{blockedProjects.length} Risk Flagged</span>
                      </div>
                    )}
                  </div>

                  {/* Project Cards Inside Gate Column */}
                  <div className="space-y-2 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin">
                    {stageProjects.length === 0 ? (
                      <div className="border border-dashed border-slate-200 rounded-lg p-6 text-center text-[10px] text-slate-400 font-medium">
                        No projects active
                      </div>
                    ) : (
                      stageProjects.map((p) => (
                        <div 
                          key={p.id}
                          onClick={() => onSelectProject(p.id)}
                          className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-lg p-2.5 cursor-pointer transition text-left group"
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="font-bold text-slate-700 text-[11px] truncate group-hover:text-blue-600">
                              {p.name}
                            </span>
                            <ChevronRight size={10} className="text-slate-400 mt-0.5 group-hover:translate-x-0.5 transition" />
                          </div>
                          
                          <p className="text-[9px] text-slate-500 truncate mt-1">
                            PM: {p.pm}
                          </p>

                          <div className="flex justify-between items-center mt-2.5 border-t border-slate-200/50 pt-1.5">
                            <span className="text-[8px] text-slate-400 font-bold uppercase">
                              {p.approvalAge} days stuck
                            </span>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              p.riskLevel === "Critical" 
                                ? "bg-red-950" 
                                : p.riskLevel === "High"
                                  ? "bg-rose-500"
                                  : p.riskLevel === "Medium"
                                    ? "bg-amber-400"
                                    : "bg-emerald-400"
                            }`} title={`Risk: ${p.riskLevel}`} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Requirements check indicator at the bottom of column */}
                <div className="mt-3 border-t border-slate-100 pt-2 text-[8px] font-bold text-slate-400 tracking-wide uppercase truncate">
                  Need: {gate.docs}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
