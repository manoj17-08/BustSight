import React from 'react';
import { ShieldAlert, Fingerprint, Layers, CheckCircle2, ChevronRight, AlertOctagon } from 'lucide-react';

export default function BustArchetypes({ archetypes }) {
  if (!archetypes || archetypes.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Bust Fingerprinting & Archetype Classification
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Classifies forecast failures into 5 distinct meteorological archetypes rather than generic probabilities.
          </p>
        </div>

        <div className="bg-[#070c1a] px-3.5 py-2 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
          <div className="text-[10px] text-slate-500">ARCHETYPE TAXONOMY</div>
          <div className="text-cyan-300 font-bold">NCMRWF 5-Archetype Standard</div>
        </div>
      </div>

      {/* Grid of Archetypes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {archetypes.map((arch, idx) => (
          <div
            key={arch.id || idx}
            className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl hover:border-cyan-500/50 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="bg-blue-950 text-cyan-300 font-mono text-[10px] px-2 py-0.5 rounded border border-blue-800">
                  {arch.ncmrwf_code}
                </span>
                <span className="text-red-400 font-mono text-xs font-bold">
                  Bust: {arch.avg_bust_probability}%
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">
                {arch.title}
              </h3>

              <div className="text-[11px] text-slate-400 font-mono mb-3">
                Historical Frequency: <span className="text-cyan-400 font-semibold">{arch.historical_frequency}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-[#070d1d] p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Primary Driver</span>
                  <p className="text-slate-200 text-xs mt-0.5 font-medium">{arch.key_driver}</p>
                </div>

                <div className="bg-[#070d1d] p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Typical Failure Pattern</span>
                  <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{arch.typical_error}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span>Classifier Weight: HIGH</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
