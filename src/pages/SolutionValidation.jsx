import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { RiskBadge } from '../components/RiskBadge';

const comparisonMock = [
  { id: "comp-1", brdReq: "Support native mobile SSO integration via Okta REST endpoints.", solCov: "Okta integration is drafted using standard OAuth web browser redirection; mobile native app redirects are not explicitly detailed in Salesforce plugin configuration.", status: "Gap Flagged", severity: "High", owner: "Neha R.", rec: "Update OAuth configs to leverage PKCE flow for mobile SSO validation." },
  { id: "comp-2", brdReq: "Synchronize Salesforce CRM lead pipelines within 60 seconds SLA.", solCov: "Synchronizes via daily cron batches running at midnight. Real-time webhooks omitted due to Salesforce platform limit assumptions.", status: "Gap Flagged", severity: "Critical", owner: "Neha R.", rec: "Implement real-time CDC (Change Data Capture) or high-frequency polling script." },
  { id: "comp-3", brdReq: "Broadband usage graph data loads within 500ms SLA page loading speed.", solCov: "Queries direct broadband billing SQL databases. Latency during peak usage hours is sized at 1.8 seconds average.", status: "Gap Flagged", severity: "Medium", owner: "Neha R.", rec: "Configure Redis caching layer in the API Gateway routing module." },
  { id: "comp-4", brdReq: "Support secure credit card checkouts passing PCI-DSS Level 2 audit.", solCov: "Integrates with Stripe custom element tokenization. Treasury ledger logs do not save credit card credentials locally.", status: "Fully Aligned", severity: "Low", owner: "Neha R.", rec: "No actions required. Design meets security compliance guidelines." }
];

export default function SolutionValidation() {
  const [selectedCompId, setSelectedCompId] = useState("comp-1");

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          BRD vs Solution Doc Alignment Analyzer
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Automated double-validation comparison scanning Business Requirements against Solution Architecture designs to isolate technical gaps.
        </p>
      </div>

      {/* AI Gap Detection Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        
        <div className="card border-t-4 border-t-red-600 bg-red-50/10 space-y-2">
          <div className="flex justify-between items-start text-red-800 font-bold text-xs uppercase">
            <span>1. Missing Scope</span>
            <AlertCircle size={14} className="text-red-600" />
          </div>
          <p className="text-[10px] text-slate-500 leading-tight font-medium">
            Mobile PKCE OAuth flows are omitted in CRM architecture solution doc.
          </p>
        </div>

        <div className="card border-t-4 border-t-amber-500 bg-amber-50/10 space-y-2">
          <div className="flex justify-between items-start text-amber-800 font-bold text-xs uppercase">
            <span>2. Conflicts</span>
            <AlertTriangle size={14} className="text-amber-500" />
          </div>
          <p className="text-[10px] text-slate-500 leading-tight font-medium">
            BRD assumes active realtime CDC, Solution drafts 24hr cron batches.
          </p>
        </div>

        <div className="card border-t-4 border-t-blue-500 bg-blue-50/10 space-y-2">
          <div className="flex justify-between items-start text-blue-800 font-bold text-xs uppercase">
            <span>3. Dependencies</span>
            <AlertCircle size={14} className="text-blue-500" />
          </div>
          <p className="text-[10px] text-slate-500 leading-tight font-medium">
            SSO rolls are blocked waiting for SecOps Okta token review sign-off.
          </p>
        </div>

        <div className="card border-t-4 border-t-purple-500 bg-purple-50/10 space-y-2">
          <div className="flex justify-between items-start text-purple-800 font-bold text-xs uppercase">
            <span>4. Cost Mismatch</span>
            <AlertTriangle size={14} className="text-purple-500" />
          </div>
          <p className="text-[10px] text-slate-500 leading-tight font-medium">
            Sized Billing estimate ($380k) exceeds historical project budget index.
          </p>
        </div>

        <div className="card border-t-4 border-t-rose-600 bg-rose-50/10 space-y-2">
          <div className="flex justify-between items-start text-rose-800 font-bold text-xs uppercase">
            <span>5. Non-Functional Gaps</span>
            <AlertCircle size={14} className="text-rose-600" />
          </div>
          <p className="text-[10px] text-slate-500 leading-tight font-medium">
            Broadband latency sizing (1.8s) breaches corporate 500ms loading SLA.
          </p>
        </div>

      </div>

      {/* Detailed Side by Side Matrix */}
      <div className="card space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-blue-600" />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              CRM Integration: Side-by-Side BRD vs Solution Gap Assessment
            </h3>
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition">
            <RefreshCw size={11} />
            <span>Re-scan Documents</span>
          </button>
        </div>

        <div className="enterprise-table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>BRD Requirement</th>
                <th>Solution Coverage Design</th>
                <th>Gap Status</th>
                <th>Severity</th>
                <th>Architect Owner</th>
                <th>AI Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMock.map((comp) => (
                <tr 
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`cursor-pointer transition ${comp.id === selectedCompId ? "bg-blue-50/20" : ""}`}
                >
                  <td className="font-semibold text-slate-800 w-[200px] leading-relaxed">{comp.brdReq}</td>
                  <td className="text-xs leading-relaxed text-slate-600 w-[280px]">{comp.solCov}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      comp.status === "Fully Aligned" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      {comp.status === "Fully Aligned" ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                      <span>{comp.status}</span>
                    </span>
                  </td>
                  <td>
                    <RiskBadge level={comp.severity} />
                  </td>
                  <td className="font-semibold text-slate-700">{comp.owner}</td>
                  <td className="text-blue-700 font-semibold max-w-[200px] leading-relaxed" title={comp.rec}>
                    {comp.rec}
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
