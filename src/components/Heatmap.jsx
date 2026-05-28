import React from 'react';
import { ShieldAlert } from 'lucide-react';

const dimensions = [
  { key: "approvalDelay", label: "Approval Delay" },
  { key: "costRisk", label: "Cost Risk" },
  { key: "brdGap", label: "BRD Gap" },
  { key: "devRisk", label: "Dev Risk" },
  { key: "scheduleSlip", label: "Schedule Slip" }
];

export const Heatmap = ({ projects, onProjectClick }) => {
  
  const getCellClass = (score) => {
    switch (score) {
      case "Low":
        return "heatmap-cell-low";
      case "Medium":
        return "heatmap-cell-medium";
      case "High":
        return "heatmap-cell-high";
      case "Critical":
        return "heatmap-cell-critical";
      default:
        return "bg-slate-50 text-slate-400";
    }
  };

  const getCellLetter = (score) => {
    switch (score) {
      case "Low": return "L";
      case "Medium": return "M";
      case "High": return "H";
      case "Critical": return "C";
      default: return "-";
    }
  };

  return (
    <div className="card w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Product Risk Matrix
          </h3>
          <p className="text-sm font-bold text-slate-800 mt-0.5">
            22 Projects × 5 Dimensions
          </p>
        </div>
        
        {/* Risk Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1">
            <span className="h-3 w-5 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-[9px]">L</span>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-5 rounded border border-amber-200 bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-[9px]">M</span>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-5 rounded border border-rose-200 bg-rose-50 text-rose-800 flex items-center justify-center font-bold text-[9px]">H</span>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-5 rounded border border-red-900 bg-red-950 text-white flex items-center justify-center font-bold text-[9px]">C</span>
            <span>Critical</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[650px]">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-2 mb-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="text-left pl-2">Project Name</div>
            {dimensions.map((dim) => (
              <div key={dim.key} className="py-1">{dim.label}</div>
            ))}
          </div>

          {/* Project Matrix Rows */}
          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className="grid grid-cols-6 gap-2 items-center text-xs hover:bg-slate-50 rounded-md transition duration-150 py-0.5"
              >
                {/* Project Title Cell */}
                <div 
                  onClick={() => onProjectClick(proj.id)}
                  className="font-semibold text-slate-700 truncate pl-2 hover:text-blue-600 hover:underline cursor-pointer"
                >
                  {proj.name}
                </div>

                {/* Dimension Cells */}
                {dimensions.map((dim) => {
                  const score = proj.riskScores?.[dim.key] || "Low";
                  return (
                    <div 
                      key={dim.key}
                      onClick={() => onProjectClick(proj.id)}
                      className={`heatmap-cell ${getCellClass(score)}`}
                      title={`${proj.name} - ${dim.label}: ${score}`}
                    >
                      {getCellLetter(score)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
