import React from 'react';
import { Database, Search, Award, Calendar, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

export default function AnalogEnsemble({ analogData }) {
  if (!analogData || !analogData.top_matches) return null;

  const matches = analogData.top_matches;

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Analog Ensemble (AnEn) Historical Failure Matching Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Multi-variate Euclidean distance lookup across historical ERA5/IMD dataset archive (2000–2025).
          </p>
        </div>

        <div className="bg-[#070c1a] px-3.5 py-2 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
          <div className="text-[10px] text-slate-500">QUERY VECTOR</div>
          <div className="text-cyan-300 font-bold">{analogData.query_vector || '500hPa gpm + 850hPa uv + TPW'}</div>
        </div>
      </div>

      {/* Top 3 Precedent Cards */}
      <div className="space-y-3">
        {matches.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-cyan-500/40 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm shrink-0">
                #{idx + 1}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    {item.event_name}
                  </h3>
                  <span className="bg-slate-900 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {item.date}
                  </span>
                </div>

                <div className="text-xs text-slate-300 mt-1 space-y-1">
                  <p><strong className="text-amber-400">Observed Bust:</strong> {item.observed_bust}</p>
                  <p><strong className="text-emerald-400">AnEn Outcome:</strong> {item.outcome}</p>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800 shrink-0 font-mono">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase">Euclidean Similarity</div>
                <div className="text-lg font-black text-cyan-400">{item.similarity_score}%</div>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Distance: {item.euclidean_distance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
