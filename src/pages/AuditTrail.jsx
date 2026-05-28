import React, { useState } from 'react';
import { Search, Calendar, History, ShieldAlert, Download, CheckCircle2 } from 'lucide-react';
import { auditLogs } from '../data/auditLogs';
import { StatusBadge } from '../components/StatusBadge';

export default function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = auditLogs.filter(log => 
    log.project.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Traceability Audit Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            System-wide compliance event tracking. Logs all project gate transitions, stakeholder approvals, and AI assessments to fulfill audit regulations.
          </p>
        </div>
        
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition shrink-0">
          <Download size={12} />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card flex items-center gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={14} className="text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search audit trail by project, actor, decision comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-full shrink-0">
          {filteredLogs.length} events logged
        </span>
      </div>

      {/* Audit events feed */}
      <div className="card p-0 overflow-hidden shadow-sm">
        <div className="enterprise-table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Project Name</th>
                <th>Action Event</th>
                <th>Actor Stakeholder</th>
                <th>Gate Gate Stage</th>
                <th>Decision Code</th>
                <th>Auditor Decision Comment</th>
                <th>Evidence Sign</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  {/* Timestamp */}
                  <td className="text-xs text-slate-400 font-medium">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  {/* Project */}
                  <td className="font-bold text-slate-800">{log.project}</td>
                  {/* Action */}
                  <td className="font-semibold">{log.action}</td>
                  {/* Actor */}
                  <td>{log.actor}</td>
                  {/* Gate */}
                  <td>
                    <StatusBadge stage={log.gate} />
                  </td>
                  {/* Decision */}
                  <td>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      log.decision === "Approved" || log.decision === "Released"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      <CheckCircle2 size={10} />
                      <span>{log.decision}</span>
                    </span>
                  </td>
                  {/* Comment */}
                  <td className="max-w-[280px] text-slate-500 truncate leading-relaxed font-medium" title={log.comment}>
                    {log.comment || "Gate transitioned successfully."}
                  </td>
                  {/* Evidence Link */}
                  <td>
                    <a href={log.evidenceLink} className="text-blue-600 font-bold hover:underline">
                      Verify SHA-256
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
