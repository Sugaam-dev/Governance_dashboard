import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';
import { suggestedPrompts, buddyResponses, initialChatHistory, dailyBrief } from '../data/buddy';

export default function PMBuddy({ initialQuery }) {
  const [messages, setMessages] = useState(initialChatHistory);
  const [inputValue, setInputValue] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle pre-filled dashboard queries
  useEffect(() => {
    if (initialQuery) {
      handleQuerySubmit(initialQuery);
    }
  }, [initialQuery]);

  const handleQuerySubmit = (queryText) => {
    if (!queryText.trim()) return;

    // 1. Add User Message
    const userMsg = { sender: "user", time: "Just Now", message: queryText };
    setMessages(prev => [...prev, userMsg]);

    // 2. Generate AI response matching pre-packaged answers
    setTimeout(() => {
      let aiMsg = { sender: "buddy", time: "Just Now", message: "" };
      const matched = buddyResponses[queryText];

      if (matched) {
        aiMsg.message = matched.text;
        aiMsg.data = matched.data;
        aiMsg.draft = matched.draft;
        aiMsg.recommendation = matched.recommendation;
      } else {
        // Fallback generic answer
        aiMsg.message = `I have scanned the PMRG Solution database regarding your query: "${queryText}". Our portfolio is operating within standard parameters, but 3 projects are awaiting solution validation from Neha R.`;
        aiMsg.recommendation = "💡 Action: Use the 'Which approvals are older than 3 days?' prompt to view specific bottlenecks.";
      }

      setMessages(prev => [...prev, aiMsg]);
    }, 400);

    setInputValue("");
  };

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto h-[calc(100vh-10rem)] flex flex-col justify-between">
      
      {/* 1. Daily Governance Brief Panel */}
      <div className="card bg-slate-900 border border-slate-800 text-slate-100 p-4 space-y-2.5 shrink-0 shadow-lg">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
          <Sparkles size={14} />
          <span>PMRG Solution Daily AI Governance Brief</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-light">
          {dailyBrief.summary}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-800">
          {dailyBrief.highlights.map((h, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <AlertCircle size={12} className="text-rose-500 mt-0.5 shrink-0" />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Chat Area */}
      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between overflow-hidden">
        
        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => {
            const isAI = msg.sender === "buddy";
            return (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${isAI ? "mr-auto text-left" : "ml-auto flex-row-reverse text-right"}`}
              >
                {/* Avatar Icon */}
                <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${
                  isAI ? "bg-blue-100 text-blue-800 border" : "bg-slate-100 text-slate-700 border"
                }`}>
                  {isAI ? <Bot size={16} /> : <User size={16} />}
                </div>

                {/* Bubble message */}
                <div className={`space-y-3.5 rounded-xl p-3.5 text-xs shadow-sm leading-relaxed border ${
                  isAI 
                    ? "bg-slate-50 border-slate-200 text-slate-700" 
                    : "bg-blue-600 border-blue-700 text-white font-medium"
                }`}>
                  {/* Primary text */}
                  <p className="whitespace-pre-wrap font-medium">{msg.message}</p>

                  {/* Render Data Table if returned */}
                  {msg.data && (
                    <div className="enterprise-table-container my-2 text-slate-700 bg-white shadow-sm border rounded-lg">
                      <table className="enterprise-table text-[10px] text-left">
                        <thead>
                          <tr className="bg-slate-50">
                            {Object.keys(msg.data[0]).map((key, kIdx) => (
                              <th key={kIdx} className="p-1.5 uppercase font-bold text-slate-500 border-b">{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {msg.data.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              {Object.values(row).map((val, vIdx) => (
                                <td key={vIdx} className="p-1.5 border-b font-semibold text-slate-800">{val}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Render Copyable Draft Box */}
                  {msg.draft && (
                    <div className="bg-slate-900 text-slate-200 font-mono text-[10px] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed relative my-2 border border-slate-800">
                      {msg.draft}
                      <button
                        onClick={() => copyText(msg.draft, idx)}
                        className="absolute top-1.5 right-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1 rounded transition"
                        title="Copy to Clipboard"
                      >
                        {copiedIndex === idx ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      </button>
                    </div>
                  )}

                  {/* Recommendation pill */}
                  {msg.recommendation && (
                    <p className={`text-[10px] italic font-semibold border-t pt-2 mt-2 ${isAI ? "text-blue-700 border-slate-200" : "text-white/80 border-blue-500"}`}>
                      {msg.recommendation}
                    </p>
                  )}
                  
                  {/* Timestamp */}
                  <span className={`block text-[9px] mt-1 ${isAI ? "text-slate-400" : "text-white/60"}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto shrink-0">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleQuerySubmit(p)}
              className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[10px] px-2.5 py-1 rounded-full transition truncate max-w-[280px]"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0">
          <input
            type="text"
            placeholder="Ask your Buddy about unapproved costs, scope gaps, or SLA breaches..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuerySubmit(inputValue)}
            className="flex-1 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition"
          />
          <button 
            onClick={() => handleQuerySubmit(inputValue)}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-2 flex items-center justify-center transition shrink-0 shadow-lg shadow-blue-500/10"
          >
            <Send size={14} />
          </button>
        </div>

      </div>

    </div>
  );
}
