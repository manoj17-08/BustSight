import React from 'react';
import { Wind, Waves, Sun, AlertTriangle, Layers, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function ScenarioSelector({ scenarios, activeScenarioId, onSelectScenario, leadDay, setLeadDay }) {
  return (
    <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Interactive Benchmark Weather Scenarios (Judge Case Studies)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any scenario below to immediately load historical satellite grids, forecast errors, and SHAP XAI diagnostics.
          </p>
        </div>

        {/* Lead Day Slider */}
        <div className="bg-[#070c1a] border border-cyan-500/30 px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg">
          <Calendar className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div className="flex flex-col">
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <span className="text-slate-400">Forecast Lead Time:</span>
              <span className="text-cyan-300 font-bold ml-2">Day {leadDay} Forecast Grid</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={leadDay}
              onChange={(e) => setLeadDay(parseInt(e.target.value))}
              className="w-40 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scen) => {
          const isActive = activeScenarioId === scen.id;
          let Icon = Wind;
          let colorClass = 'from-blue-600/20 to-cyan-600/10 border-blue-500/30';
          let iconColor = 'text-cyan-400';
          let bgImage = '/assets/monsoon_radar.jpg';

          if (scen.id === 'cyclone_biparjoy') {
            Icon = Waves;
            colorClass = 'from-teal-600/20 to-emerald-600/10 border-teal-500/30';
            iconColor = 'text-teal-400';
            bgImage = '/assets/cyclone_radar.jpg';
          } else if (scen.id === 'heatwave_north') {
            Icon = Sun;
            colorClass = 'from-amber-600/20 to-orange-600/10 border-amber-500/30';
            iconColor = 'text-amber-400';
            bgImage = '/assets/monsoon_radar.jpg';
          }

          return (
            <div
              key={scen.id}
              onClick={() => onSelectScenario(scen.id)}
              className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 relative group flex flex-col justify-between ${
                isActive
                  ? `bg-gradient-to-br ${colorClass} border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/50 scale-[1.02]`
                  : 'bg-[#0e172e]/70 border-slate-800 hover:border-slate-600 hover:bg-[#0e172e]'
              }`}
            >
              {/* Image Preview Banner */}
              <div className="h-28 w-full relative overflow-hidden">
                <img
                  src={bgImage}
                  alt={scen.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e172e] via-transparent to-transparent"></div>
                
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-slate-700 text-[10px] font-mono font-bold text-white">
                  <Icon className={`w-3 h-3 ${iconColor}`} />
                  <span>{scen.season}</span>
                </div>

                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shadow-lg ${
                    scen.primary_bust_risk > 85
                      ? 'bg-red-950 text-red-400 border-red-800/80'
                      : 'bg-amber-950 text-amber-400 border-amber-800/80'
                  }`}>
                    Bust Risk: {scen.primary_bust_risk}%
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition">
                    {scen.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mt-1">
                    {scen.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Critical Days: Day {scen.critical_lead_days.join(', ')}</span>
                  <span className={`font-bold flex items-center gap-1 ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-400'
                  }`}>
                    {isActive ? <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> : null}
                    {isActive ? 'Active Preset' : 'Select Benchmark →'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
