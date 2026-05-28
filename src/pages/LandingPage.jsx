import React from 'react';
import { ShieldCheck, Bot, BarChart3, FileText, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function LandingPage({ onLaunchDashboard }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Top Navigation */}
      <header className="max-w-7xl mx-auto w-full px-6 h-20 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center">
          <img src="/logo.png" alt="PMRG Solution Logo" className="h-10 max-w-[200px] object-contain" />
        </div>
        <button
          onClick={onLaunchDashboard}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition duration-150 shadow-lg shadow-blue-500/10"
        >
          <span>Open Dashboard</span>
          <ArrowRight size={14} />
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto w-full px-6 py-20 flex-1 flex flex-col justify-center items-center text-center">
        {/* Release Status Tag */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <Zap size={12} className="animate-pulse" />
          <span>Governance Decision Control Layer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl" style={{ fontFamily: 'var(--font-display)', margin: '0 0 1.5rem 0' }}>
          PMRG Solution AI-Assisted <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
            Change Governance Platform
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-xl max-w-3xl leading-relaxed font-light mb-10">
          An AI-assisted governance platform that controls BRD-to-development flow, provides portfolio visibility across 22 projects, and equips project managers with a smart Buddy for approvals, risks, and next actions.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onLaunchDashboard}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-xl shadow-blue-500/20 scale-100 hover:scale-[1.02]"
          >
            <span>Launch Governance Control Centre</span>
            <ArrowRight size={16} />
          </button>
          
          <div className="text-xs text-slate-500 mt-2 sm:mt-0 font-medium">
            Authorized Personnel Only • Enterprise SSO Integrated
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 text-left hover:border-slate-700 transition">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/15">
              <Zap size={20} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              1. Governance Workflow
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Rigid 8-gate lifecycle controlling code deployment. Tracks projects automatically from intake, through costing and solutions, to ultimate development validation.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 text-left hover:border-slate-700 transition">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/15">
              <FileText size={20} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              2. Document Intelligence
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              AI-driven intake system that automatically summarizes uploaded Business Requirement Documents (BRDs) and flags scope anomalies against solution docs.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 text-left hover:border-slate-700 transition">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/15">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              3. Portfolio Visibility
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Real-time executive dashboard including multi-dimensional project risk heatmaps, unapproved spend charts, and active SLA bottleneck matrices.
            </p>
          </div>
        </div>

        {/* Secondary Features Banner */}
        <div className="w-full mt-12 bg-slate-800/20 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-around items-start md:items-center gap-6">
          <div className="flex items-center gap-3 text-left">
            <div className="h-8 w-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
              <Bot size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase">Project Manager Buddy</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">Quickly generate escalations, agendas, and draft chasing notifications.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase">Human-In-The-Loop Approval</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">AI assessment prompts suggestions, but all gate changes require human verification.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-600 font-semibold max-w-7xl mx-auto w-full">
        © 2026 PMRG Solution Broadband & Cable Communications Ltd. All rights reserved. • Internal Decision Control Layer
      </footer>
    </div>
  );
}
