import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ShieldAlert, TrendingDown, Activity, AlertOctagon, CheckCircle2, ChevronRight } from 'lucide-react';

export default function BustProbabilityCard({ confidenceData, leadDay }) {
  if (!confidenceData) return null;

  const { overall_confidence, overall_bust_probability, regional_breakdown, lead_day_curve, primary_archetype } = confidenceData;

  const isCritical = overall_bust_probability > 75;

  return (
    <div className="space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Overall Confidence */}
        <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Forecast Confidence Index
            </div>
            <div className="text-3xl font-black text-cyan-400 font-mono mt-1">
              {overall_confidence}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Lead Time: Day {leadDay} Forecast Grid
            </p>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-cyan-500/30 flex items-center justify-center bg-cyan-950/40">
            <Activity className="w-7 h-7 text-cyan-400" />
          </div>
        </div>

        {/* Metric 2: Bust Probability */}
        <div className={`border rounded-xl p-4 shadow-xl flex items-center justify-between ${
          isCritical
            ? 'bg-gradient-to-r from-red-950/60 to-slate-900 border-red-800/60'
            : 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-800/60'
        }`}>
          <div>
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-red-400 animate-pulse" />
              Bust Failure Probability
            </div>
            <div className="text-3xl font-black text-red-400 font-mono mt-1">
              {overall_bust_probability}%
            </div>
            <p className="text-[11px] text-red-300/80 mt-1 font-medium">
              {isCritical ? '⚠️ HIGH UNCERTAINTY / MODEL DIVERGENCE' : 'MILD MODEL UNCERTAINTY'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-red-500/30 flex items-center justify-center bg-red-950/50">
            <ShieldAlert className="w-7 h-7 text-red-400" />
          </div>
        </div>

        {/* Metric 3: Primary Archetype */}
        <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Identified Meteorological Archetype
            </div>
            <div className="text-sm font-bold text-white mt-1 line-clamp-2">
              {primary_archetype}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-cyan-300">
            <span>NCUM vs GFS Match: 42%</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Main Analysis Grid: Lead-Time Curve & Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Lead-Time Curve Chart */}
        <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Lead-Time Confidence Decay Curve (Day 1 - 10)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              NCMRWF Operational Window
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lead_day_curve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorBust" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="confidence" name="Confidence Index (%)" stroke="#06b6d4" fillOpacity={1} fill="url(#colorConf)" strokeWidth={2} />
                <Area type="monotone" dataKey="bust_probability" name="Bust Probability (%)" stroke="#ef4444" fillOpacity={1} fill="url(#colorBust)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-2 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>Confidence %</span>
            </div>
            <div className="flex items-center gap-1.5 text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span>Bust Probability %</span>
            </div>
          </div>
        </div>

        {/* Regional Breakdown Table */}
        <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Regional Subcontinent Risk Breakdown
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">
              5 Key Meteorological Sectors
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-56 pr-1">
            {regional_breakdown && regional_breakdown.map((reg, idx) => {
              const isRiskHigh = reg.risk === 'CRITICAL' || reg.risk === 'HIGH';
              return (
                <div key={idx} className="bg-[#070d1d] border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {reg.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Confidence: {reg.confidence}% | Bust: {reg.bust_prob}%
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    reg.risk === 'CRITICAL'
                      ? 'bg-red-950 text-red-400 border border-red-800/60'
                      : reg.risk === 'HIGH'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  }`}>
                    {reg.risk}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex justify-between">
            <span>Grid Domain: 0.25° Resolution</span>
            <span className="text-slate-300">NCMRWF Operational Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
