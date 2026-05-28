import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Briefcase, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { users } from '../data/users';

export default function Auth({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Senior Project Manager");
  const [dept, setDept] = useState("PMO Office");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (isSignUp) {
        // Sign Up Flow (Demo purpose: registers user in local state session)
        if (!name || !email || !password) {
          setError("All fields are required for registration.");
          setLoading(false);
          return;
        }

        const newUser = {
          id: `user_${name.toLowerCase().replace(" ", "_")}`,
          name: name,
          role: role,
          department: dept,
          email: email,
          avatar: name.split(" ").map(n => n[0]).join("").toUpperCase(),
          color: "bg-blue-100 text-blue-800"
        };

        setSuccessMsg("Account created! Logging you in...");
        setLoading(false);
        
        setTimeout(() => {
          onLoginSuccess(newUser);
        }, 1000);

      } else {
        // Login Flow
        if (email === "priya.m@pmrg.com" && password === "password") {
          // Default PM login
          const defaultPM = users.find(u => u.email === email) || {
            id: "user_priya_m",
            name: "Priya M.",
            role: "Senior Project Manager",
            department: "PMO Office",
            email: "priya.m@pmrg.com",
            avatar: "PM",
            color: "bg-amber-100 text-amber-800"
          };
          
          setSuccessMsg("Access authorized. Redirecting to control centre...");
          setLoading(false);
          
          setTimeout(() => {
            onLoginSuccess(defaultPM);
          }, 1000);
        } else {
          // Check other mock users
          const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (matchedUser && password === "password") {
            setSuccessMsg(`Welcome back, ${matchedUser.name}! Authorizing...`);
            setLoading(false);
            setTimeout(() => {
              onLoginSuccess(matchedUser);
            }, 1000);
          } else {
            setError("Invalid credentials. Enter priya.m@pmrg.com and password.");
            setLoading(false);
          }
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-md w-full space-y-6 z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex-center text-white font-black text-2xl mx-auto shadow-lg shadow-blue-500/20" style={{ fontFamily: 'var(--font-display)' }}>
            H
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            PMRG Solution Governance Dashboard
          </h2>
          <p className="text-xs text-slate-400 font-medium">Authorized Stakeholder Single Sign-On (SSO)</p>
        </div>

        {/* Card Panel */}
        <div className="bg-slate-800/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-700/50 mb-6">
            <button
              onClick={() => { setIsSignUp(false); setError(""); }}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition ${
                !isSignUp ? "text-blue-400 border-b-2 border-blue-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(""); }}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition ${
                isSignUp ? "text-blue-400 border-b-2 border-blue-500 font-extrabold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {isSignUp && (
              <>
                {/* Full Name */}
                <div className="space-y-1 text-left text-xs">
                  <label className="font-semibold text-slate-400">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                      <User size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 w-full text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                </div>

                {/* Stakeholder Role */}
                <div className="space-y-1 text-left text-xs">
                  <label className="font-semibold text-slate-400">Stakeholder Role</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                      <Briefcase size={14} />
                    </span>
                    <select
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        // Map standard departments automatically
                        if (e.target.value === "Finance Lead") setDept("Corporate Treasury");
                        else if (e.target.value === "Solution Architect") setDept("Enterprise Architecture");
                        else if (e.target.value === "Business Owner") setDept("Digital Operations");
                        else setDept("PMO Office");
                      }}
                      className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 w-full text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition cursor-pointer font-semibold"
                    >
                      <option value="Senior Project Manager">Senior Project Manager (PMO)</option>
                      <option value="Finance Lead">Finance Lead (Treasury)</option>
                      <option value="Business Owner">Business Owner (Digital Ops)</option>
                      <option value="Solution Architect">Solution Architect (Architecture)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-1 text-left text-xs">
              <label className="font-semibold text-slate-400">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  placeholder="stakeholder@pmrg.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 w-full text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1 text-left text-xs">
              <label className="font-semibold text-slate-400">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                  <Lock size={14} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 w-full text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs font-bold text-rose-500 text-left bg-rose-500/10 p-2 rounded border border-rose-500/20 flex items-center gap-1.5 animate-pulse">
                <AlertCircle size={12} />
                <span>{error}</span>
              </p>
            )}

            {/* Success Message */}
            {successMsg && (
              <p className="text-xs font-bold text-emerald-400 text-left bg-emerald-500/10 p-2 rounded border border-emerald-500/20 flex items-center gap-1.5">
                <CheckCircle2 size={12} />
                <span>{successMsg}</span>
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-lg transition duration-200 shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? "Register Secure Account" : "Authenticate Access"}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

          </form>

          {/* Instant Demo Login Button */}
          {!isSignUp && (
            <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
              <p className="text-[10px] text-slate-400 font-semibold mb-2">Want a quick walkthrough?</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    const defaultDemo = {
                      id: "user_demo",
                      name: "Demo User",
                      role: "Senior Project Manager",
                      department: "PMO Office",
                      email: "demo@pmrg.com",
                      avatar: "DU",
                      color: "bg-blue-100 text-blue-800"
                    };
                    setSuccessMsg("Authorized. Redirecting to control centre...");
                    setLoading(false);
                    setTimeout(() => {
                      onLoginSuccess(defaultDemo);
                    }, 800);
                  }, 400);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800/85 text-blue-400 hover:text-blue-300 font-bold text-xs py-3 rounded-lg border border-slate-700 transition flex items-center justify-center gap-2 shadow-lg hover:border-slate-600"
              >
                <Sparkles size={14} className="text-blue-500 animate-pulse" />
                <span>Instant Demo Login</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
