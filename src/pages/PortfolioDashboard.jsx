import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  MessageSquare, 
  Send, 
  UserPlus, 
  FileCheck, 
  Flame, 
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { Heatmap } from '../components/Heatmap';
import { StatusBadge } from '../components/StatusBadge';
import { RiskBadge } from '../components/RiskBadge';

export default function PortfolioDashboard({ 
  projects, 
  users, 
  trends, 
  onSelectProject, 
  onTriggerBuddyQuery, 
  onChangePage 
}) {
  // Checklist Interactive State
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: "Chase Anil S. — Billing Module cost approval", level: "Critical", completed: false },
    { id: 2, text: "Review CRM Integration — 4 BRD-to-solution gaps flagged by AI", level: "Critical", completed: false },
    { id: 3, text: "Escalate Portal Redesign — BRD unreviewed for 8 days", level: "Critical", completed: false },
    { id: 4, text: "Confirm solution doc submission for API Gateway and SSO Rollout", level: "High", completed: false },
    { id: 5, text: "Verify HR Self-Service has final go/no-go before dev starts", level: "High", completed: false },
    { id: 6, text: "Prepare Friday PMO governance call agenda", level: "High", completed: false },
    { id: 7, text: "Send Data Lake Phase 2 reminder", level: "Done", completed: true }
  ]);

  // PM Notes State
  const [pmNotes, setPmNotes] = useState("All cost discrepancies must be approved by Tuesday. Gaps in CRM integration are currently the primary bottleneck.");

  const toggleTodo = (id) => {
    setTodoItems(todoItems.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = todoItems.filter(t => t.completed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            PMRG Solution Governance Dashboard
          </h2>
          <p className="text-xs text-slate-500 font-medium">Enterprise Change Management & Portfolio Controls</p>
        </div>
        
        {/* Date & Count Badge */}
        <div className="flex items-center gap-2 bg-slate-100/60 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-700">
          <Calendar size={14} className="text-slate-500" />
          <span>Tue, 26 May 2026</span>
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mx-1.5" />
          <span className="text-blue-600 font-bold">22 projects active</span>
        </div>
      </div>

      {/* 2. Portfolio Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="On Track" 
          value="8" 
          subtext="No major dependencies" 
          color="green"
          trend="8 projects" 
          trendDirection="stable" 
        />
        <StatCard 
          title="At Risk" 
          value="6" 
          subtext="Minor delays or gaps" 
          color="amber"
          trend="Need attention" 
          trendDirection="warning"
        />
        <StatCard 
          title="Blocked" 
          value="4" 
          subtext="Awaiting escalations" 
          color="red"
          trend="SLA breached" 
          trendDirection="down" 
        />
        <StatCard 
          title="Awaiting Approval" 
          value="4" 
          subtext="Gate progression pending" 
          color="blue"
          trend="Awaiting sign-off" 
          trendDirection="up" 
        />
      </div>

      {/* 3. Approval Funnel & Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Funnel Gate Breakdown */}
        <div className="card lg:col-span-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Approval Funnel & Signals — Gate Breakdown
            </h3>
            <div className="space-y-3.5">
              <ProgressBar label="BRD submitted" count={22} color="blue" />
              <ProgressBar label="Business review" count={18} color="indigo" />
              <ProgressBar label="Cost approval" count={14} color="amber" />
              <ProgressBar label="Solution review" count={10} color="green" />
              <ProgressBar label="Final go/no-go" count={6} color="teal" />
              <ProgressBar label="Dev released" count={4} color="purple" />
            </div>
          </div>
        </div>

        {/* Right Column: Approval Age KPI Signals */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="card border-l-4 border-l-rose-500 flex flex-col justify-between p-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SLA Breached</span>
              <span className="text-3xl font-black text-rose-600 block mt-1">5</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold mt-3 block">Over 3 days delays</span>
          </div>

          <div className="card border-l-4 border-l-amber-500 flex flex-col justify-between p-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approaching SLA</span>
              <span className="text-3xl font-black text-amber-600 block mt-1">4</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold mt-3 block">1-2 days remaining</span>
          </div>

          <div className="card border-l-4 border-l-blue-500 flex flex-col justify-between p-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Approval Time</span>
              <span className="text-2xl font-black text-slate-800 block mt-1">3.2d</span>
            </div>
            <span className="text-[10px] text-rose-600 font-semibold mt-3 inline-flex items-center gap-0.5">
              <TrendingUp size={10} /> +0.4d cycle time
            </span>
          </div>

          <div className="card border-l-4 border-l-violet-500 flex flex-col justify-between p-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unapproved Costs</span>
              <span className="text-3xl font-black text-slate-800 block mt-1">7</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold mt-3 block">Finance pending</span>
          </div>
        </div>

      </div>

      {/* 4. Risk Heatmap Component */}
      <Heatmap 
        projects={projects} 
        onProjectClick={onSelectProject} 
      />

      {/* 5. Exception Panel & 6. Governance Trends (Split Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Exception Panel */}
        <div className="card lg:col-span-7 space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Exception Panel
            </h3>
            <p className="text-xs text-slate-500 font-medium">Critical governance events requiring direct attention</p>
          </div>
          
          <div className="space-y-2.5">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-0.5">Critical</span>
              <div className="text-xs">
                <span className="font-semibold text-slate-800 hover:underline cursor-pointer" onClick={() => onSelectProject("portal_redesign")}>Portal Redesign</span>
                <span className="text-slate-600"> — BRD submitted 8 days ago, no business review started.</span>
              </div>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-0.5">Critical</span>
              <div className="text-xs">
                <span className="font-semibold text-slate-800 hover:underline cursor-pointer" onClick={() => onSelectProject("crm_integration")}>CRM Integration</span>
                <span className="text-slate-600"> — solution document mismatches BRD on 4 scope items.</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-0.5">High</span>
              <div className="text-xs">
                <span className="font-semibold text-slate-800 hover:underline cursor-pointer" onClick={() => onSelectProject("billing_module")}>Billing Module</span>
                <span className="text-slate-600"> — cost approval pending 5 days, finance unresponsive.</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-0.5">High</span>
              <div className="text-xs">
                <span className="font-semibold text-slate-700">3 projects missing solution docs</span>
                <span className="text-slate-600"> despite BRD approved (API Gateway, SSO Rollout).</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-0.5">Watch</span>
              <div className="text-xs">
                <span className="font-semibold text-slate-700">2 projects approaching development</span>
                <span className="text-slate-600"> without final go/no-go approval captured.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Trends */}
        <div className="card lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-2 mb-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Governance Trends
              </h3>
              <p className="text-xs text-slate-500 font-medium">Weekly process movement comparison metrics</p>
            </div>
            
            <div className="space-y-3">
              {trends.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className="font-semibold text-slate-600">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{item.value}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.severity === "good" 
                        ? "bg-emerald-50 text-emerald-700" 
                        : item.severity === "bad" 
                          ? "bg-rose-50 text-rose-700"
                          : item.severity === "warning"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 7. PM Buddy Quick Queries */}
      <div className="card bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={16} className="text-blue-400" />
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
            PM Buddy Quick Queries
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4 font-light">Click a quick chip below to query your conversational PM Governance Buddy:</p>
        
        <div className="flex flex-wrap gap-2">
          {[
            "Waiting for finance approval",
            "BRD vs solution gaps",
            "Top 5 portfolio risks",
            "Stale approvals",
            "Ready for dev this week",
            "Draft escalation notes"
          ].map((query, idx) => (
            <button
              key={idx}
              onClick={() => onTriggerBuddyQuery(query)}
              className="bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-semibold text-xs px-3 py-1.5 rounded-lg transition duration-150 flex items-center gap-1.5"
            >
              <span>{query}</span>
              <ChevronRight size={12} className="text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* 8. PM Command Centre — TODAY (Grid Splitting) */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
          <Flame size={16} className="text-blue-600" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            PM Command Centre — Today's Playbook
          </h3>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions due today</span>
            <span className="text-2xl font-black text-rose-600 block mt-1">7</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow-ups overdue</span>
            <span className="text-2xl font-black text-amber-600 block mt-1">3</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meetings today</span>
            <span className="text-2xl font-black text-blue-600 block mt-1">2</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed this week</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1">4</span>
          </div>
        </div>

        {/* Three Column Playbook Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Column 1: Today's To-Do List */}
          <div className="card space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Today's To-Do List</h4>
              <p className="text-[10px] text-slate-400 font-medium">Verify gates and chase team bottlenecks</p>
            </div>
            
            <div className="space-y-3">
              {todoItems.map((item) => (
                <div key={item.id} className="checklist-item flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTodo(item.id)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${item.completed ? "line-through text-slate-400 font-normal" : "text-slate-700 font-semibold"}`}>
                      {item.text}
                    </p>
                  </div>
                  {!item.completed && (
                    <span className={`text-[8px] font-bold uppercase px-1 py-0.2 rounded shrink-0 ${
                      item.level === "Critical" 
                        ? "bg-rose-50 text-rose-700 border border-rose-200" 
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {item.level}
                    </span>
                  )}
                  {item.completed && (
                    <span className="text-[8px] font-bold uppercase px-1 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      Done
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Today's Plan & Chase List */}
          <div className="space-y-5">
            {/* Plan Agenda */}
            <div className="card space-y-3">
              <div className="border-b border-slate-100 pb-1.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Today's Plan</h4>
              </div>
              
              <div className="space-y-2">
                {[
                  { time: "09:00", label: "Daily governance brief", dur: "30 min" },
                  { time: "10:30", label: "Escalation call — Portal review", dur: "45 min" },
                  { time: "12:00", label: "Finance sync — Anil S.", dur: "30 min" },
                  { time: "14:15", label: "CRM solution doc review", dur: "1 hr" },
                  { time: "16:00", label: "PMO review call prep", dur: "45 min" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-slate-400" />
                      <span className="font-semibold text-slate-500">{item.time}</span>
                      <span className="text-slate-700 font-medium">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{item.dur}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* People to Chase */}
            <div className="card space-y-3">
              <div className="border-b border-slate-100 pb-1.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">People to Chase Today</h4>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Anil S. — Finance", desc: "Related: Billing Module. Delay: 5d.", reason: "Cost approval stuck" },
                  { name: "Ramesh K. — Business", desc: "Related: Portal Redesign. Delay: 8d.", reason: "BRD unreviewed" },
                  { name: "Neha R. — Architect", desc: "Related: API Gateway, SSO. Delay: 4d.", reason: "Missing solution docs" }
                ].map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                    <div>
                      <p className="font-bold text-slate-700">{p.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{p.desc} ({p.reason})</p>
                    </div>
                    <button 
                      onClick={() => onTriggerBuddyQuery("Draft escalation note for Portal Redesign.")}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-[10px] px-2 py-1 rounded transition shrink-0"
                    >
                      Draft note
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Attention Week & Buddy Assist */}
          <div className="space-y-5">
            {/* Projects Needing Attention */}
            <div className="card space-y-3">
              <div className="border-b border-slate-100 pb-1.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Attention This Week</h4>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: "Portal Redesign", level: "Critical", reason: "BRD stuck 8 days" },
                  { name: "CRM Integration", level: "Critical", reason: "4 BRD-solution gaps" },
                  { name: "Billing Module", level: "High", reason: "Cost approval overdue" },
                  { name: "HR Self-Service", level: "High", reason: "Dev starting, no signoff" },
                  { name: "API Gateway", level: "High", reason: "Solution doc missing" }
                ].map((p, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center text-xs cursor-pointer hover:bg-slate-50 p-1 rounded transition"
                    onClick={() => onSelectProject(p.name.toLowerCase().replace(" ", "_"))}
                  >
                    <span className="font-semibold text-slate-700 hover:underline">{p.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-medium">{p.reason}</span>
                      <RiskBadge level={p.level} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask Your Buddy Actions */}
            <div className="card space-y-3">
              <div className="border-b border-slate-100 pb-1.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ask Your Buddy</h4>
              </div>

              <div className="space-y-2.5">
                {[
                  { text: "Prepare Friday PMO agenda", q: "Prepare agenda for PMO governance review." },
                  { text: "Draft all overdue chase notes", q: "Draft escalation note for Portal Redesign." },
                  { text: "Suggest tomorrow's top priorities", q: "Which projects can start development this week?" }
                ].map((act, idx) => (
                  <button
                    key={idx}
                    onClick={() => onTriggerBuddyQuery(act.q)}
                    className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs px-3 py-2 rounded-lg transition duration-150 flex justify-between items-center"
                  >
                    <span>{act.text}</span>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* PM Notes Input Area */}
        <div className="card space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">PM Notes — Today</h4>
            <span className="text-[10px] text-slate-400 font-semibold">Will sync to daily email briefing automatically</span>
          </div>
          <textarea
            value={pmNotes}
            onChange={(e) => setPmNotes(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition"
            rows={2}
            placeholder="Type your daily notes here..."
          />
        </div>
      </div>

    </div>
  );
}
