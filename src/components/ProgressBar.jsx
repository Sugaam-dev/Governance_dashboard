import React from 'react';

export const ProgressBar = ({ label, count, total = 22, color = "blue", suffix = "" }) => {
  const percentage = Math.round((count / total) * 100);
  
  // Custom Tailwind equivalent color classes
  const colorMap = {
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    amber: "bg-amber-500",
    green: "bg-emerald-600",
    teal: "bg-teal-600",
    purple: "bg-purple-600"
  };

  const barColor = colorMap[color] || colorMap.blue;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-900">
          {count} <span className="text-slate-400 font-normal">/ {total} {suffix}</span>
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
