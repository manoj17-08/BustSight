import React, { useState, useEffect } from 'react';
import { ShieldAlert, CloudLightning, Activity, Terminal, Database, Server, RefreshCw, Cpu, CheckCircle2, Award, PlayCircle, HelpCircle, X } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, backendStatus, onRefreshData, onStartJudgeTour }) {
  const [timeIST, setTimeIST] = useState('');
  const [timeUTC, setTimeUTC] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeIST(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
      setTimeUTC(now.toISOString().slice(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: '1. Operational Map & Risk', icon: CloudLightning },
    { id: 'xai', label: '2. SHAP XAI Drivers', icon: Cpu },
    { id: 'archetypes', label: '3. Bust Archetypes', icon: ShieldAlert },
    { id: 'analogs', label: '4. AnEn Analog Search', icon: Database },
    { id: 'briefing', label: '5. Zero-Hallucination Briefings', icon: Terminal },
    { id: 'api', label: '6. NCMRWF REST API', icon: Server }
  ];

  return (
    <>
      <header className="bg-[#090f1f] border-b border-blue-900/50 sticky top-0 z-[999] shadow-2xl">
        {/* Top Info Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 px-4 py-1.5 border-b border-blue-900/40 flex flex-wrap justify-between items-center text-xs text-slate-300 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded font-mono font-medium border border-blue-500/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> MoES / NCMRWF Portal
            </span>
            <span className="text-slate-400">SIH 2026 PS: <strong className="text-white">26079</strong></span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 font-bold">Team Infex (ID: 138755)</span>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-0.5 rounded border border-slate-800 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">{timeIST}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{timeUTC}</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> FastAPI Ready
              </span>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-emerald-400 p-0.5 shadow-lg shadow-blue-500/20 shrink-0">
                <div className="w-full h-full bg-[#090f1e] rounded-[9px] flex items-center justify-center">
                  <CloudLightning className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black tracking-tight text-white font-sans">
                    Bust<span className="text-cyan-400">Sight</span>
                  </h1>
                  <span className="bg-cyan-950 text-cyan-300 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-cyan-800">
                    AI AUDITOR
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Medium-Range Weather Forecast Bust Detection & XAI Meta-Layer
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowChecklist(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/90 hover:bg-indigo-900 text-indigo-200 text-xs font-semibold border border-indigo-700/60 transition shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH PS Checklist</span>
            </button>

            <button
              onClick={onStartJudgeTour}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-md shadow-cyan-500/20 transition active:scale-95"
            >
              <PlayCircle className="w-4 h-4 fill-slate-950" />
              <span>Judge Quick Tour</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-slate-800 bg-[#070c1a] px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/50 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* SIH PS 26079 Evaluation Checklist Modal */}
      {showChecklist && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b1326] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  SIH 2026 PS 26079 — NCMRWF Mandated Compliance
                </h3>
              </div>
              <button
                onClick={() => setShowChecklist(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#070d1d] p-3 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-300">Mandated NCMRWF Expected Outcomes (5/5 Complete)</h4>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>1. Forecast Confidence Map:</strong> Day 1 to 10 region-wise confidence scores across India.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>2. Forecast Bust Probability:</strong> Quantitative failure probability (%) indicator per grid and lead time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>3. Error-Prone Area Isolation:</strong> Automated GeoJSON polygons bounding volatile areas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>4. Explainable Output (SHAP XAI):</strong> XGBoost TreeExplainer deterministic thermodynamic drivers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>5. Operational Dashboard & REST API:</strong> FastAPI REST endpoints + React dashboard interface.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#070d1d] p-3 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-300">Technical Innovations (Slide 2 Specification)</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <strong className="text-amber-400">Bust Fingerprinting:</strong> 5 distinct meteorological failure archetypes.
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <strong className="text-amber-400">SHAP Attribution:</strong> Exact mathematical weights causing model divergence.
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <strong className="text-amber-400">Zero-Hallucination:</strong> Deterministic LLM advisories without hallucination.
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <strong className="text-amber-400">Instant Analog:</strong> Multi-variate Euclidean distance matching (ERA5).
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowChecklist(false)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
