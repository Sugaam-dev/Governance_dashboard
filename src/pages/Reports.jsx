import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Download, Share2, BarChart2, Calendar, ShieldCheck, FileSpreadsheet, FileDown } from 'lucide-react';
import { monthlyCycleTimeTrend } from '../data/trendMetrics';

export default function Reports() {
  
  const reportCards = [
    { title: "Portfolio Health Report", desc: "Detailed summary of all 22 active integrations, their active gates, and current risk ratings.", size: "1.2 MB", format: "PDF" },
    { title: "Approval Cycle Time Report", desc: "Granular breakdown of gate-stuck metrics, average SLA breaches, and stakeholder delay indicators.", size: "850 KB", format: "Excel" },
    { title: "Cost Approval Report", desc: "Financial governance summary displaying estimated budgets, approved allocations, and pending balances.", size: "2.4 MB", format: "PDF" },
    { title: "BRD-Solution Mismatch Report", desc: "Traceability assessment detailing AI-detected scope anomalies and technical alignment issues.", size: "420 KB", format: "Excel" },
    { title: "Risk & Escalation Report", desc: "Multidimensional risk matrix cell mappings, top warning projects, and AI mitigations.", size: "1.6 MB", format: "PDF" },
    { title: "Development Readiness Report", desc: "Assesses final Go/No-Go gate compliance records before engineering onboarding sprints.", size: "540 KB", format: "Excel" }
  ];

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Executive Governance Reports
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Generate and export baseline compliance logs, cycle-time trends, and technical readiness reviews for board presentations.
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition">
            <Share2 size={12} />
            <span>Share Reports Pack</span>
          </button>
        </div>
      </div>

      {/* Cycle Time Trend Chart Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <div className="card lg:col-span-8 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Average Approval Gate Cycle Time Trend (Days stuck)
          </h3>
          
          <div className="h-[240px] w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyCycleTimeTrend}
                margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <Tooltip />
                <Line type="monotone" dataKey="avgDays" name="Average Stuck Days" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Executive summary pill */}
        <div className="lg:col-span-4 card bg-slate-900 border border-slate-800 text-slate-100 flex flex-col justify-between p-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <BarChart2 size={14} />
              <span>SLA Compliance Summary</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Cycle times increased slightly in May 2026 to **3.2 days stuck average**, representing a **12.5% increase** from Q1 due to Salesforce CRM integration reviews.
            </p>
          </div>

          <div className="space-y-2 text-[10px] text-slate-400 font-semibold border-t border-slate-800 pt-3">
            <div className="flex justify-between">
              <span>SLA Target Goal</span>
              <span className="text-emerald-500">&lt; 3.0 Days</span>
            </div>
            <div className="flex justify-between">
              <span>Active Overdue</span>
              <span className="text-rose-500">5 Projects Breached</span>
            </div>
          </div>
        </div>

      </div>

      {/* Reports Directory Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Active Document Exports Directory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportCards.map((rep, idx) => (
            <div key={idx} className="card flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-xs tracking-tight">{rep.title}</h4>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[8px] font-bold border ${
                    rep.format === "PDF" 
                      ? "bg-rose-50 text-rose-700 border-rose-200" 
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}>
                    {rep.format === "PDF" ? <FileDown size={9} /> : <FileSpreadsheet size={9} />}
                    <span>{rep.format}</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-medium leading-relaxed">{rep.desc}</p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-2.5">
                <span className="text-[9px] text-slate-400 font-bold uppercase">{rep.size} size</span>
                <button className="bg-slate-50 hover:bg-slate-100 border text-slate-700 font-bold text-[9px] px-2 py-1 rounded transition flex items-center gap-1">
                  <Download size={10} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
