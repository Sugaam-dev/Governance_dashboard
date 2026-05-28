import React, { useState } from 'react';
import { Search, Filter, RefreshCw, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { RiskBadge } from '../components/RiskBadge';

export default function Projects({ projects, onSelectProject }) {
  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedCost, setSelectedCost] = useState("All");
  const [selectedOwner, setSelectedOwner] = useState("All");

  // Get filter dimensions dynamically
  const stages = ["All", ...new Set(projects.map(p => p.currentStage))];
  const risks = ["All", "Low", "Medium", "High", "Critical"];
  const costStatuses = ["All", "Approved", "Pending"];
  const owners = ["All", ...new Set(projects.map(p => p.businessOwner))];

  // Filtering Logic
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.pm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.nextAction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === "All" || p.currentStage === selectedStage;
    const matchesRisk = selectedRisk === "All" || p.riskLevel === selectedRisk;
    const matchesCost = selectedCost === "All" || p.costStatus === selectedCost;
    const matchesOwner = selectedOwner === "All" || p.businessOwner === selectedOwner;

    return matchesSearch && matchesStage && matchesRisk && matchesCost && matchesOwner;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStage("All");
    setSelectedRisk("All");
    setSelectedCost("All");
    setSelectedOwner("All");
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            PMRG Solution Project Governance Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Search, filter, and drill down into the active states, budget items, and risk dimensions of 22 key integrations.
          </p>
        </div>
        
        <button 
          onClick={resetFilters}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-lg transition duration-150 flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw size={12} />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Filter Options Bar */}
      <div className="card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Search */}
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Search Keywords</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={12} className="text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Stage Filter */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Governance Gate</label>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition text-slate-700 font-semibold cursor-pointer"
          >
            {stages.map((st, idx) => (
              <option key={idx} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Risk Filter */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Risk Rating</label>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition text-slate-700 font-semibold cursor-pointer"
          >
            {risks.map((rk, idx) => (
              <option key={idx} value={rk}>{rk}</option>
            ))}
          </select>
        </div>

        {/* Cost Filter */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cost Status</label>
          <select
            value={selectedCost}
            onChange={(e) => setSelectedCost(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition text-slate-700 font-semibold cursor-pointer"
          >
            {costStatuses.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Owner Filter */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Business Owner</label>
          <select
            value={selectedOwner}
            onChange={(e) => setSelectedOwner(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition text-slate-700 font-semibold cursor-pointer"
          >
            {owners.map((o, idx) => (
              <option key={idx} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="card p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase block">
            Results Table
          </span>
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {filteredProjects.length} projects matched
          </span>
        </div>

        <div className="enterprise-table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Owner</th>
                <th>PM</th>
                <th>Current Stage</th>
                <th>Pending Approver</th>
                <th>Age</th>
                <th>Cost Status</th>
                <th>Risk</th>
                <th>Next Action</th>
                <th>SLA</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-slate-400 font-medium bg-white">
                    No projects match the selected filter parameters.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const isSlaBreached = p.slaStatus === "Breached";
                  return (
                    <tr key={p.id}>
                      {/* Name */}
                      <td className="font-bold text-slate-800 hover:text-blue-600 hover:underline cursor-pointer" onClick={() => onSelectProject(p.id)}>
                        {p.name}
                      </td>
                      {/* Owner */}
                      <td className="font-medium">{p.businessOwner}</td>
                      {/* PM */}
                      <td>{p.pm}</td>
                      {/* Current Stage */}
                      <td>
                        <StatusBadge stage={p.currentStage} />
                      </td>
                      {/* Pending Approver */}
                      <td className="font-semibold text-slate-700">
                        {p.pendingApprover}
                      </td>
                      {/* Age */}
                      <td className="font-bold">
                        {p.approvalAge}d
                      </td>
                      {/* Cost Status */}
                      <td>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.costStatus === "Approved" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {p.costStatus}
                        </span>
                      </td>
                      {/* Risk */}
                      <td>
                        <RiskBadge level={p.riskLevel} />
                      </td>
                      {/* Next Action */}
                      <td className="max-w-[180px] truncate text-slate-500 font-medium" title={p.nextAction}>
                        {p.nextAction}
                      </td>
                      {/* SLA Status */}
                      <td>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          p.slaStatus === "Breached" 
                            ? "bg-rose-50 text-rose-700 border-rose-200" 
                            : p.slaStatus === "Approaching SLA"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                          {isSlaBreached && <AlertCircle size={10} className="animate-pulse" />}
                          <span>{p.slaStatus}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
