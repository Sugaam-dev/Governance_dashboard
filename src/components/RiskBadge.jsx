import React from 'react';

export const RiskBadge = ({ level }) => {
  let style = "bg-slate-100 text-slate-800 border-slate-200";

  switch (level) {
    case "Low":
      style = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "Medium":
      style = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "High":
      style = "bg-rose-50 text-rose-700 border-rose-200";
      break;
    case "Critical":
      style = "bg-red-950 text-white border-red-900 font-bold";
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      {level}
    </span>
  );
};
