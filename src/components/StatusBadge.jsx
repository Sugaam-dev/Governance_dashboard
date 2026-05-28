import React from 'react';

export const StatusBadge = ({ stage }) => {
  let style = "bg-slate-100 text-slate-800 border-slate-200";

  switch (stage) {
    case "Submission":
      style = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case "Business Validation":
      style = "bg-indigo-50 text-indigo-700 border-indigo-200";
      break;
    case "AI Gap Analysis":
      style = "bg-teal-50 text-teal-700 border-teal-200";
      break;
    case "Cost Estimation":
      style = "bg-orange-50 text-orange-700 border-orange-200";
      break;
    case "Cost Approval":
      style = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "Solution Document Review":
      style = "bg-purple-50 text-purple-700 border-purple-200";
      break;
    case "Final Approval":
      style = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "Development Release":
      style = "bg-violet-50 text-violet-700 border-violet-200";
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      {stage}
    </span>
  );
};
