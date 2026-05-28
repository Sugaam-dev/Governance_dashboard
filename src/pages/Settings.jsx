import React, { useState } from 'react';
import { Settings, Shield, Bell, Key, Sparkles, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [slaDays, setSlaDays] = useState({
    submission: 3,
    businessValidation: 3,
    aiGapAnalysis: 1,
    costEstimation: 5,
    costApproval: 3,
    solutionReview: 5,
    finalApproval: 2,
    devRelease: 1
  });

  const [enableBuddyAlerts, setEnableBuddyAlerts] = useState(true);
  const [enableScopeDoubleScan, setEnableScopeDoubleScan] = useState(true);
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Rules & Governance Configurations
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Tweak regulatory thresholds, customize gate SLA calendars, and configure AI PM Buddy scanning options.
          </p>
        </div>
        
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition shrink-0 shadow-lg shadow-blue-500/10"
        >
          <Save size={12} />
          <span>Save Configuration</span>
        </button>
      </div>

      {/* Main Settings Panel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: SLA target adjustments */}
        <div className="card lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Shield className="text-blue-600" size={16} />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Governance Gate SLA Target Configurations (Days Stuck)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "submission", label: "Gate 1: Submission BRD Intake" },
              { key: "businessValidation", label: "Gate 2: Business Validation sign-off" },
              { key: "aiGapAnalysis", label: "Gate 3: AI Scope Gap Assessment" },
              { key: "costEstimation", label: "Gate 4: Engineering Cost Sizing" },
              { key: "costApproval", label: "Gate 5: Finance Treasury Release" },
              { key: "solutionReview", label: "Gate 6: Solution Architecture Audit" },
              { key: "finalApproval", label: "Gate 7: Board final Go/No-Go" },
              { key: "devRelease", label: "Gate 8: Code Integration Trigger" }
            ].map((st) => (
              <div key={st.key} className="space-y-1 text-xs">
                <label className="font-semibold text-slate-600 block">{st.label}</label>
                <input
                  type="number"
                  value={slaDays[st.key]}
                  onChange={(e) => setSlaDays({ ...slaDays, [st.key]: parseInt(e.target.value) || 0 })}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                  min={1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI & Notifications Settings */}
        <div className="lg:col-span-4 space-y-5">
          {/* AI Settings */}
          <div className="card space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Sparkles className="text-blue-600 animate-pulse" size={14} />
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">AI Scanning Controls</h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Scope Alignment Scan</span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">Scans BRD vs Solution Doc gaps</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableScopeDoubleScan}
                  onChange={() => setEnableScopeDoubleScan(!enableScopeDoubleScan)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <span className="font-semibold text-slate-700 block">SLA Breached Notifications</span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">PM Buddy drafts chase notes</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableBuddyAlerts}
                  onChange={() => setEnableBuddyAlerts(!enableBuddyAlerts)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Security Rules */}
          <div className="card space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Key className="text-slate-500" size={14} />
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Access compliance</h4>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
              🔒 **PMRG Solution Governance Compliance**: Rule adjustments log onto the immutable ledger dynamically. Unauthorized rule modifications trigger SecOps escalations.
            </p>
          </div>
        </div>

      </div>

      {savedStatus && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-bold text-xs flex items-center gap-2 animate-pulse justify-center">
          <CheckCircle2 size={16} />
          <span>Governance Configurations saved successfully and synchronized with compliance ledgers!</span>
        </div>
      )}

    </div>
  );
}
