import React, { useState } from 'react';
import { RefreshCw, Search, CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { RiskBadge } from '../components/RiskBadge';

const initialCRs = [
  { id: "CR-801", project: "CRM Integration", raisedBy: "Ramesh K.", impact: "Adds Salesforce real-time webhook connector ($15k budget, 2 days schedule impact)", priority: "Critical", status: "Awaiting Approval", gate: "Cost Approval", approver: "Anil S.", date: "2026-05-24" },
  { id: "CR-802", project: "Billing Module", raisedBy: "Suresh G.", impact: "Avalara API tax compliance schema updates ($8k budget, 1 day schedule impact)", priority: "High", status: "Approved", gate: "Solution Document Review", approver: "Neha R.", date: "2026-05-22" },
  { id: "CR-803", project: "API Gateway", raisedBy: "Priya M.", impact: "Increase rate limiter from 10k to 50k requests (Negligible budget, 0 day impact)", priority: "Medium", status: "Approved", gate: "Development Release", approver: "Suresh G.", date: "2026-05-18" },
  { id: "CR-804", project: "Portal Redesign", raisedBy: "Ramesh K.", impact: "Include credit note support in custom checkout ($25k budget, 4 days schedule impact)", priority: "High", status: "Rejected", gate: "Submission", approver: "Ramesh K.", date: "2026-05-15" },
  { id: "CR-805", project: "HR Self-Service", raisedBy: "Neha R.", status: "Approved", impact: "SSO connector token refresh sync protocol modification", priority: "Low", gate: "Final Approval", approver: "Ramesh K.", date: "2026-05-20" }
];

export default function ChangeRequests() {
  const [crs, setCrs] = useState(initialCRs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  const handleDecision = (id, newStatus) => {
    setCrs(crs.map(cr => cr.id === id ? { ...cr, status: newStatus } : cr));
  };

  const filteredCRs = crs.filter(cr => {
    const matchesSearch = cr.project.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cr.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cr.impact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "All" || cr.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Scope Revision & Change Request (CR) Control
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Trace and process deviations from baseline BRDs. Under PMRG Solution rules, all structural CR adjustments must receive explicit stakeholder approval.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="card flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 w-full gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={14} className="text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search CRs, projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Priority */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition text-slate-700 font-semibold cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-full shrink-0">
          {filteredCRs.length} Change Requests Registered
        </span>
      </div>

      {/* Directory list table */}
      <div className="card p-0 overflow-hidden shadow-sm">
        <div className="enterprise-table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>CR ID</th>
                <th>Project</th>
                <th>Raised By</th>
                <th>Justification & Impact</th>
                <th>Priority</th>
                <th>Current Gate</th>
                <th>Approver</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Decision Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCRs.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-slate-400 font-medium">
                    No change requests registered under this view.
                  </td>
                </tr>
              ) : (
                filteredCRs.map((cr) => (
                  <tr key={cr.id}>
                    <td className="font-bold text-slate-800">{cr.id}</td>
                    <td className="font-semibold text-slate-700">{cr.project}</td>
                    <td>{cr.raisedBy}</td>
                    <td className="max-w-[280px] font-medium leading-relaxed" title={cr.impact}>
                      {cr.impact}
                    </td>
                    <td>
                      <RiskBadge level={cr.priority} />
                    </td>
                    <td>
                      <StatusBadge stage={cr.gate} />
                    </td>
                    <td className="font-semibold">{cr.approver}</td>
                    <td className="font-semibold">{cr.date}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        cr.status === "Approved" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : cr.status === "Rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {cr.status === "Approved" ? <CheckCircle2 size={10} /> : cr.status === "Rejected" ? <XCircle size={10} /> : <Clock size={10} />}
                        <span>{cr.status}</span>
                      </span>
                    </td>
                    <td>
                      {cr.status === "Awaiting Approval" ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleDecision(cr.id, "Approved")}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[9px] px-2 py-1 rounded transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecision(cr.id, "Rejected")}
                            className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-[9px] px-2 py-1 rounded transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Locked</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
