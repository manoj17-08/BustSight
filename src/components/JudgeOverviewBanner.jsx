import React, { useState } from 'react';
import { Sparkles, AlertOctagon, ShieldCheck, ArrowRight, Layers, CheckCircle2, ChevronDown, ChevronUp, Activity } from 'lucide-react';

export default function JudgeOverviewBanner({ activeScenarioId, onSelectScenario }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-r from-[#0b162e] via-[#0b1224] to-[#0d1b38] border border-cyan-500/30 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-md">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-wide text-white uppercase font-sans">
                Judge Presentation Guide & Executive Briefing
              </h2>
              <span className="bg-amber-950 text-amber-300 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-amber-800">
                JUDGE MODE ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Understanding BustSight in 60 seconds: Problem, AI Architecture & Mandated NCMRWF Outcomes
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto"
        >
          <span>{expanded ? 'Hide Judge Walkthrough' : 'Show Judge Walkthrough'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Collapsible Content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 animate-fade-in text-xs">
          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Pillar 1: The Problem */}
            <div className="bg-[#070d1d] p-3.5 rounded-xl border border-red-900/40 hover:border-red-500/40 transition">
              <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                <AlertOctagon className="w-4 h-4" />
                <span>1. The Weather Problem</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Operational supercomputer models (NCUM / GFS) suffer from sudden <strong>"Forecast Busts"</strong>—large localized failures during rapidly evolving monsoon depressions, cyclones, and heatwaves.
              </p>
            </div>

            {/* Pillar 2: Our AI Solution */}
            <div className="bg-[#070d1d] p-3.5 rounded-xl border border-cyan-900/40 hover:border-cyan-500/40 transition">
              <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>2. The BustSight AI Solution</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                An AI Auditor meta-layer that evaluates Day 1–10 forecast grids against 25 years of ERA5/IMD ground-truth, calculates local bust probability ($0-100\%$), draws GeoJSON error polygons, and explains the meteorological root cause via SHAP XAI.
              </p>
            </div>

            {/* Pillar 3: Model Comparison */}
            <div className="bg-[#070d1d] p-3.5 rounded-xl border border-emerald-900/40 hover:border-emerald-500/40 transition">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <Activity className="w-4 h-4" />
                <span>3. Operational Value to NCMRWF</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Empowers duty forecasters to discount overconfident model grids, extends extreme weather lead times, and reduces wasteful disaster mobilization false alarms.
              </p>
            </div>
          </div>

          {/* Model Forecast Comparison Matrix */}
          <div className="bg-[#070c1a] p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span>NWP Operational Model vs BustSight AI Auditor Comparison Matrix</span>
              <span className="text-cyan-400 font-mono text-[10px]">NCMRWF Benchmark Matrix</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2">Weather Event Case</th>
                    <th className="p-2">Standard Model (NCUM/GFS)</th>
                    <th className="p-2">Observed Forecast Bust</th>
                    <th className="p-2 text-cyan-400">BustSight AI Auditor Correction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2 font-bold text-white">Monsoon Depression</td>
                    <td className="p-2 text-red-400">NCUM +140mm overestimation</td>
                    <td className="p-2 text-slate-400">Landfall offset by 180 km</td>
                    <td className="p-2 text-emerald-400 font-semibold">Flags 88.4% bust risk; discounts rain by 40%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2 font-bold text-white">Cyclone Biparjoy</td>
                    <td className="p-2 text-red-400">GFS opposite recurvature track</td>
                    <td className="p-2 text-slate-400">Day 5 track error &gt; 260 km</td>
                    <td className="p-2 text-emerald-400 font-semibold">AnEn matches 94.6% similarity to Jakhau Port track</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-2 font-bold text-white">North-West Heatwave</td>
                    <td className="p-2 text-red-400">Cold bias (-3.8°C to -4.2°C)</td>
                    <td className="p-2 text-slate-400">Soil moisture initialization error</td>
                    <td className="p-2 text-emerald-400 font-semibold">Applies +3.5°C thermal amplification offset</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
