import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';

export const StatCard = ({ title, value, subtext, trend, trendDirection, color = "blue", icon: Icon }) => {
  // Map color definitions
  const colorStyles = {
    green: {
      border: "border-l-4 border-l-emerald-500 border-slate-200",
      bg: "bg-white",
      text: "text-emerald-700",
      valColor: "text-slate-900"
    },
    amber: {
      border: "border-l-4 border-l-amber-500 border-slate-200",
      bg: "bg-white",
      text: "text-amber-700",
      valColor: "text-slate-900"
    },
    red: {
      border: "border-l-4 border-l-rose-500 border-slate-200",
      bg: "bg-white",
      text: "text-rose-700",
      valColor: "text-slate-900"
    },
    maroon: {
      border: "border-l-4 border-l-rose-950 border-slate-200",
      bg: "bg-rose-50/20",
      text: "text-rose-950",
      valColor: "text-rose-950 font-bold"
    },
    blue: {
      border: "border-l-4 border-l-blue-500 border-slate-200",
      bg: "bg-white",
      text: "text-blue-700",
      valColor: "text-slate-900"
    }
  };

  const style = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`card ${style.border} ${style.bg} hover:-translate-y-0.5 transition-transform duration-200`}>
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider h-4 block">
            {title}
          </span>
          <h3 className={`text-2xl font-bold mt-1 tracking-tight ${style.valColor}`}>
            {value}
          </h3>
        </div>
        {Icon && (
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-2.5">
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold rounded px-1.5 py-0.2 ${
            trendDirection === "up" 
              ? "bg-emerald-50 text-emerald-700" 
              : trendDirection === "down" 
                ? "bg-rose-50 text-rose-700"
                : "bg-slate-50 text-slate-600"
          }`}>
            {trendDirection === "up" ? <ArrowUpRight size={10} /> : trendDirection === "down" ? <ArrowDownRight size={10} /> : null}
            {trend}
          </span>
        )}
        <span className="text-xs text-slate-500 truncate block">
          {subtext}
        </span>
      </div>
    </div>
  );
};
