import React, { useState } from 'react';
import { FileText, Upload, Sparkles, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { documentsData } from '../data/documents';

export default function Documents() {
  const [selectedDocId, setSelectedDocId] = useState(documentsData[0].id);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const selectedDoc = documentsData.find(d => d.id === selectedDocId) || documentsData[0];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Simulate dummy upload progress
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1500);
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          BRD Document Intelligence Core
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          PMRG Solution's AI document parser. Automatically parses PDF requirements, extracts structural scopes, and maps dependencies dynamically.
        </p>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Upload & Doc List */}
        <div className="lg:col-span-5 space-y-5">
          {/* Upload Area */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`card border-dashed border-2 flex-center flex-col p-8 text-center transition cursor-pointer ${
              dragActive ? "border-blue-500 bg-blue-50/30" : "border-slate-300 hover:border-blue-500"
            }`}
          >
            <Upload size={28} className={`${dragActive ? "text-blue-500 animate-bounce" : "text-slate-400"}`} />
            
            <p className="text-xs font-bold text-slate-700 mt-3">Drag & Drop BRD PDF here</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">Supports PDF requirements up to 25MB</p>
            
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition mt-4">
              Select PDF File
            </button>

            {uploadProgress !== null && (
              <div className="w-full mt-4 space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-slate-500">
                  <span>Uploading Requirement Document...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border">
                  <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Doc List */}
          <div className="card space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Parsed Repository
            </h3>

            <div className="space-y-2">
              {documentsData.map((doc) => {
                const isSelected = doc.id === selectedDocId;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3 border rounded-xl cursor-pointer transition text-left flex items-start gap-3 ${
                      isSelected 
                        ? "border-blue-500 bg-blue-50/20" 
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <FileText size={18} className={isSelected ? "text-blue-600" : "text-slate-400"} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs truncate ${isSelected ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>
                        {doc.title}
                      </p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-1">
                        Project: {doc.projectName} • Uploaded: {doc.uploadedDate}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction Intelligence Panel */}
        <div className="lg:col-span-7 card space-y-5 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-500" />
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  AI extracted requirement metadata
                </h3>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                AI Match: 98%
              </span>
            </div>

            {/* Content Scopes */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-600">
              
              {/* Summary */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700 uppercase text-[10px]">Executive AI Summary</h4>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium">{selectedDoc.summary}</p>
              </div>

              {/* Scopes */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700 uppercase text-[10px]">Functional Scopes Extracted ({selectedDoc.scope.length})</h4>
                <ul className="list-disc pl-4 space-y-1 font-medium">
                  {selectedDoc.scope.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Grid split: Assumptions & Dependencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-700 uppercase text-[10px]">Assumptions Captured</h4>
                  <ul className="list-disc pl-4 space-y-1 font-medium text-[11px] text-slate-500">
                    {selectedDoc.assumptions.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-700 uppercase text-[10px]">Identified Dependencies</h4>
                  <ul className="list-disc pl-4 space-y-1 font-medium text-[11px] text-slate-500">
                    {selectedDoc.dependencies.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Impacted Systems */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700 uppercase text-[10px]">Impacted PMRG Solution Systems</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDoc.impactedSystems.map((sys, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                      {sys}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Info Warning */}
              {selectedDoc.missingInformation && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5">
                  <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={14} />
                  <div>
                    <h5 className="font-bold text-rose-800 uppercase text-[9px]">Missing Requirement Alert</h5>
                    <p className="text-[11px] text-rose-700 font-medium mt-0.5">{selectedDoc.missingInformation}</p>
                  </div>
                </div>
              )}

              {/* Approvals */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-700 uppercase text-[10px]">SLA Approvers Gate Matrix</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDoc.approvalNeeds.map((app, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 border rounded-lg text-[10px] font-semibold">
                      <span className="text-slate-500">{app.role}: <span className="text-slate-800 font-bold">{app.name}</span></span>
                      <span className={`inline-flex items-center gap-1 ${app.status === "Approved" ? "text-emerald-600" : "text-amber-600"}`}>
                        {app.status === "Approved" ? <CheckCircle size={10} /> : <Clock size={10} />}
                        <span>{app.status}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-lg transition duration-150">
            Enforce Governance Progression Gate
          </button>
        </div>

      </div>

    </div>
  );
}
