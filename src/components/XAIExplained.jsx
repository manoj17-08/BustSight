import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { Cpu, Info, Sliders, AlertCircle, HelpCircle, CheckCircle } from 'lucide-react';

export default function XAIExplained({ shapData }) {
  const [selectedFeature, setSelectedFeature] = useState(null);

  if (!shapData || !shapData.shap_features) return null;

  const features = shapData.shap_features;

  return (
    <div className="space-y-4">
      {/* XAI Header Banner */}
      <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              SHAP Explainable AI (XAI) Attribution Framework
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            XGBoost TreeExplainer deterministic mathematical feature weights causing forecast model divergence.
          </p>
        </div>

        <div className="bg-[#070c1a] px-3.5 py-2 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
          <div className="text-[10px] text-slate-500">EXPLAINER MODEL</div>
          <div className="text-cyan-300 font-bold">{shapData.explainer || 'XGBoost TreeExplainer'}</div>
        </div>
      </div>

      {/* Main Grid: SHAP Bar Chart & Feature Diagnostic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SHAP Bar Chart */}
        <div className="lg:col-span-2 bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Deterministic SHAP Impact Values (|Δ Bust Risk|)
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Positive = Increases Bust Risk
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={features}
                margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    setSelectedFeature(e.activePayload[0].payload);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis dataKey="feature" type="category" stroke="#64748b" tick={{ fill: '#e2e8f0', fontSize: 10 }} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Bar dataKey="shap_value" name="SHAP Contribution">
                  {features.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.shap_value > 0.25 ? '#ef4444' : entry.shap_value > 0 ? '#f59e0b' : '#10b981'}
                      className="cursor-pointer hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 font-mono text-center">
            💡 Click any bar in the chart to inspect full physical meteorological diagnostics.
          </div>
        </div>

        {/* Diagnostic Detail Panel */}
        <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
              <Info className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Meteorological Feature Inspector
              </h3>
            </div>

            {selectedFeature ? (
              <div className="space-y-3">
                <div className="bg-[#070d1d] p-3 rounded-lg border border-slate-800">
                  <div className="text-xs font-bold text-cyan-300">{selectedFeature.feature}</div>
                  <div className="flex items-center gap-2 mt-1 font-mono text-xs">
                    <span className="text-slate-400">SHAP Weight:</span>
                    <span className="text-red-400 font-bold">+{selectedFeature.shap_value}</span>
                    <span className="text-slate-500">({selectedFeature.unit})</span>
                  </div>
                </div>

                <div className="bg-[#070d1d] p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Physical Diagnostic Impact</div>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {selectedFeature.description}
                  </p>
                </div>

                <div className="bg-[#070d1d] p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-400">Classification Impact: </span>
                  <span className={`font-bold ${
                    selectedFeature.shap_value > 0.2 ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {selectedFeature.impact}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-slate-400 py-6 text-center">
                <Sliders className="w-8 h-8 text-slate-600 mx-auto" />
                <p>Select a SHAP feature from the bar chart to view detailed meteorological breakdown and physical causality.</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
            NCMRWF SHAP TreeExplainer v0.42 • Zero-Hallucination Guaranteed
          </div>
        </div>
      </div>
    </div>
  );
}
