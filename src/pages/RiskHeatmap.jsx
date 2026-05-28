import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ShieldAlert, ShieldCheck, HelpCircle, Zap } from 'lucide-react';
import { riskDistribution, topCriticalRisks } from '../data/risks';
import { RiskBadge } from '../components/RiskBadge';

const monthlyRiskTrend = [
  { month: "Dec 2025", criticalCount: 1, highCount: 10 },
  { month: "Jan 2026", criticalCount: 2, highCount: 9 },
  { month: "Feb 2026", criticalCount: 1, highCount: 12 },
  { month: "Mar 2026", criticalCount: 3, highCount: 14 },
  { month: "Apr 2026", criticalCount: 2, highCount: 15 },
  { month: "May 2026", criticalCount: 4, highCount: 17 }
];

export default function RiskHeatmap() {
  
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Enterprise Risk Intelligence heatmaps
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Multidimensional risk evaluation across 22 projects. AI identifies schedule slips and code integration vulnerabilities automatically.
        </p>
      </div>

      {/* Visual Risk Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Risk Distribution by Dimension Chart */}
        <div className="card lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Risk Score Distribution Across 5 Dimensions
          </h3>
          
          <div className="h-[250px] w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskDistribution}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="low" name="Low Risk" stackId="a" fill="#10b981" />
                <Bar dataKey="medium" name="Medium Risk" stackId="a" fill="#f59e0b" />
                <Bar dataKey="high" name="High Risk" stackId="a" fill="#ef4444" />
                <Bar dataKey="critical" name="Critical Risk" stackId="a" fill="#7f1d1d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Count Trend Monthly */}
        <div className="card lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Monthly Compliance Risk Escalation Trend
          </h3>
          
          <div className="h-[250px] w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRiskTrend}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="criticalCount" name="Critical Risks" stroke="#7f1d1d" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="highCount" name="High Risks" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Critical Risks Table */}
      <div className="card p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-rose-600 animate-pulse" size={16} />
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase block">
              PMRG Solution Top Critical Active Portfolio Risks
            </span>
          </div>
        </div>

        <div className="enterprise-table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Rank Index</th>
                <th>Project</th>
                <th>Primary Risk Category</th>
                <th>Severity</th>
                <th>Schedule Impact Weight</th>
                <th>AI Suggested Mitigations</th>
              </tr>
            </thead>
            <tbody>
              {topCriticalRisks.map((tr, idx) => (
                <tr key={tr.id}>
                  <td className="font-bold text-slate-500 pl-4">{idx + 1}</td>
                  <td className="font-bold text-slate-800">{tr.project}</td>
                  <td className="font-semibold">{tr.riskType}</td>
                  <td>
                    <RiskBadge level={tr.severity} />
                  </td>
                  <td className="font-bold text-rose-600">{tr.impact} Impact</td>
                  <td className="text-blue-700 font-semibold max-w-[350px] leading-relaxed">{tr.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Mitigations Box */}
      <div className="card bg-blue-50 border border-blue-200 p-4 space-y-2.5">
        <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase">
          <Zap size={14} className="text-blue-500" />
          <span>AI Governance intelligence mitigation directive</span>
        </div>
        <p className="text-[11px] text-blue-700 leading-relaxed font-semibold">
          💡 **Portfolio Health Action**: Enforce the **3-day intake review SLA** strictly across all projects. Resolving the unreviewed BRD backlog in **Portal Redesign** and aligning the solution design gaps in **CRM Integration** by Friday will decrease active portfolio risk weight by **32%**.
        </p>
      </div>

    </div>
  );
}
