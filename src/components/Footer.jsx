import React from 'react';
import { CloudLightning, Shield, Code2, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060a16] border-t border-slate-800/80 mt-12 py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <CloudLightning className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">
                BustSight • AI Forecast Bust Detection System
              </div>
              <div className="text-[11px] text-slate-500">
                National Centre for Medium Range Weather Forecasting (NCMRWF) • Ministry of Earth Sciences (MoES)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="bg-slate-900 px-3 py-1 rounded border border-slate-800 text-cyan-300">
              SIH 2026 PS ID: 26079
            </span>
            <span className="bg-slate-900 px-3 py-1 rounded border border-slate-800 text-indigo-300">
              Team Infex (ID: 138755)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] font-mono leading-relaxed">
          <div>
            <div className="text-slate-300 font-bold mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> Mandated NCMRWF Outcomes
            </div>
            <p className="text-slate-500">
              Native implementation of all 5 outcomes: Forecast Confidence Map, Bust Probability, Error Isolation Polygons, SHAP XAI Attribution, and Operational REST API Dashboard.
            </p>
          </div>

          <div>
            <div className="text-slate-300 font-bold mb-1 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Technology Stack
            </div>
            <p className="text-slate-500">
              Python, XGBoost, SHAP, SciPy, FastAPI, React.js, Tailwind CSS, React-Leaflet, Recharts, ERA5 & IMD 0.25° Reanalysis Grids.
            </p>
          </div>

          <div>
            <div className="text-slate-300 font-bold mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" /> Hackathon Compliance
            </div>
            <p className="text-slate-500">
              Smart India Hackathon 2026 • Category: Software • Theme: Smart Automation • Target: Operational Duty Forecasters.
            </p>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-600 pt-4 border-t border-slate-900">
          © 2026 BustSight by Team Infex. Built for NCMRWF / MoES Operational Forecasting Workflow.
        </div>
      </div>
    </footer>
  );
}
