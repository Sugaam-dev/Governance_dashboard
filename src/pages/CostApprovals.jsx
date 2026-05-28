import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { DollarSign, Percent, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';
import { costApprovalsData, projectCostsBreakdown, monthlySpendTrend, costMetrics } from '../data/costs';
import { RiskBadge } from '../components/RiskBadge';

export default function CostApprovals() {
  
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Cost Approvals & Treasury Cockpit
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Manage and release project funding. AI scans estimated budgets against historical benchmarks; final release requires Treasury signing.
        </p>
      </div>

      {/* Financial Indicators Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="card border-l-4 border-l-blue-500 flex justify-between items-center p-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Sized Budget</span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              ${(costMetrics.totalEstimatedCost / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg text-slate-400">
            <DollarSign size={16} />
          </div>
        </div>

        <div className="card border-l-4 border-l-emerald-500 flex justify-between items-center p-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Approved Spend</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1">
              ${(costMetrics.totalApprovedCost / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg text-slate-400">
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
        </div>

        <div className="card border-l-4 border-l-amber-500 flex justify-between items-center p-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pending Treasury Sign-off</span>
            <span className="text-2xl font-black text-amber-600 block mt-1">
              ${(costMetrics.totalPendingApproval / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg text-slate-400">
            <AlertCircle size={16} className="text-amber-500" />
          </div>
        </div>

        <div className="card border-l-4 border-l-rose-500 flex justify-between items-center p-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">SLA Breached Costs</span>
            <span className="text-2xl font-black text-rose-600 block mt-1">
              {costMetrics.unapprovedCostsBreached} Projects
            </span>
          </div>
          <div className="p-2 bg-slate-50 border rounded-lg text-slate-400">
            <Percent size={16} className="text-rose-500" />
          </div>
        </div>

      </div>

      {/* Visual Cost Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Approved vs Pending Allocation chart */}
        <div className="card lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Cost Allocation by Key Integration Project ($ USD)
          </h3>
          
          <div className="h-[260px] w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectCostsBreakdown}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" tickSize={4} style={{ fontSize: '9px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="approved" name="Approved Spend" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="estimated" name="Estimated Spend" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Treasury Trend Area Chart */}
        <div className="card lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Monthly Spend Trajectory (Approved vs Pending)
          </h3>
          
          <div className="h-[260px] w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlySpendTrend}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '9px' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Area type="monotone" dataKey="approved" name="Approved" stroke="#22c55e" fillOpacity={1} fill="url(#colorApproved)" />
                <Area type="monotone" dataKey="pending" name="Pending" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPending)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Detail Table: Cost Approvals Directory */}
      <div className="card p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase block">
            Awaiting Treasury Allocations Ledger
          </span>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
            {costApprovalsData.length} projects pending finance sign-off
          </span>
        </div>

        <div className="enterprise-table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Sized Cost</th>
                <th>Approved Cost</th>
                <th>Under Variance</th>
                <th>Treasury Owner</th>
                <th>Days Overdue</th>
                <th>Risk Level</th>
                <th>Funding Gate Status</th>
              </tr>
            </thead>
            <tbody>
              {costApprovalsData.map((c, idx) => (
                <tr key={idx}>
                  <td className="font-bold text-slate-800">{c.name}</td>
                  <td className="font-bold">${c.estimated.toLocaleString()}</td>
                  <td className="text-emerald-700 font-semibold">${c.approved.toLocaleString()}</td>
                  <td className="text-rose-600 font-bold">${c.variance.toLocaleString()}</td>
                  <td>{c.owner}</td>
                  <td className={`font-bold ${c.daysPending >= 3 ? "text-rose-600" : "text-slate-600"}`}>
                    {c.daysPending} days
                  </td>
                  <td>
                    <RiskBadge level={c.risk} />
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Calendar size={10} />
                      <span>Pending Finance Review</span>
                    </span>
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
