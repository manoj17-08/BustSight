import React, { useState } from 'react';
import { Server, Code, Play, Download, Copy, Check, Terminal, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

export default function ApiExplorer({ scenarioId, leadDay }) {
  const [activeEndpoint, setActiveEndpoint] = useState('/api/v1/forecast-confidence');
  const [apiResponse, setApiResponse] = useState({
    "status": "SUCCESS",
    "scenario_id": "monsoon_depression",
    "lead_day": 5,
    "overall_confidence": 36.8,
    "overall_bust_probability": 63.2,
    "model_agreement": "NCUM vs GFS Divergence: 42% Match",
    "primary_archetype": "Monsoon Depression Track & Velocity Displacement",
    "regional_breakdown": [
      { "name": "Bay of Bengal & Odisha Coast", "confidence": 28.8, "bust_prob": 71.2, "risk": "CRITICAL" },
      { "name": "Western Ghats & Konkan", "confidence": 32.8, "bust_prob": 67.2, "risk": "HIGH" },
      { "name": "Gangetic Plains & Bihar", "confidence": 42.8, "bust_prob": 57.2, "risk": "MODERATE" }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { url: '/api/v1/forecast-confidence', method: 'GET', desc: 'Region-wise confidence for Day 1-10 forecasts' },
    { url: '/api/v1/error-zones', method: 'GET', desc: 'GeoJSON polygons of isolated error-prone zones' },
    { url: '/api/v1/shap-attribution', method: 'GET', desc: 'XGBoost SHAP TreeExplainer feature weights' },
    { url: '/api/v1/bust-archetypes', method: 'GET', desc: '5 Meteorological Bust Archetypes taxonomy' },
    { url: '/api/v1/analogs', method: 'GET', desc: 'AnEn historical precedent matches (ERA5 dataset)' }
  ];

  const testEndpoint = async (url) => {
    setActiveEndpoint(url);
    setLoading(true);
    try {
      const targetUrl = `${url}?scenario_id=${scenarioId || 'monsoon_depression'}&lead_day=${leadDay || 5}`;
      const res = await fetch(targetUrl);
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      console.error('API Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    testEndpoint(activeEndpoint);
  }, [scenarioId, leadDay]);

  const copyJson = () => {
    if (apiResponse) {
      navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadJson = () => {
    if (apiResponse) {
      const blob = new Blob([JSON.stringify(apiResponse, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bustsight_${activeEndpoint.replace(/\//g, '_')}.json`;
      a.click();
    }
  };

  const pythonSnippet = `import requests

url = "http://127.0.0.1:8080${activeEndpoint}"
params = {"scenario_id": "${scenarioId || 'monsoon_depression'}", "lead_day": ${leadDay || 5}}

response = requests.get(url, params=params)
data = response.json()
print("BustSight Confidence Output:", data)`;

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              NCMRWF Operational REST API & GeoJSON Data Suite
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Modular REST API design enabling seamless integration into IMD/NCMRWF operational visualization software.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <a
            href="http://127.0.0.1:8080/docs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-md shadow-blue-500/20"
          >
            <span>Live Swagger OpenAPI Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Endpoints Sidebar */}
        <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 flex justify-between items-center">
            <span>NCMRWF API Endpoints</span>
            <span className="text-[10px] text-emerald-400 font-mono">100% OPERATIONAL</span>
          </div>

          {endpoints.map((ep) => (
            <button
              key={ep.url}
              onClick={() => testEndpoint(ep.url)}
              className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-mono flex flex-col gap-1.5 ${
                activeEndpoint === ep.url
                  ? 'bg-blue-600/20 border-cyan-400 text-cyan-300 shadow-md shadow-blue-500/10 font-bold'
                  : 'bg-[#070d1d] border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-800">
                  {ep.method}
                </span>
                <span className="font-bold truncate">{ep.url}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-sans">{ep.desc}</span>
            </button>
          ))}
        </div>

        {/* Live Response & Python Snippet */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#050a14] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
            <div className="bg-[#091021] px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <Code className="w-4 h-4 text-cyan-400" />
                <span>Live REST Output ({activeEndpoint})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyJson}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                  title="Copy JSON"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadJson}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-[11px]"
                  title="Download JSON File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .json</span>
                </button>
              </div>
            </div>

            <div className="p-4 text-slate-300 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="text-cyan-400 animate-pulse">Fetching live endpoint response...</div>
              ) : apiResponse ? (
                <pre className="text-[11px] leading-tight text-cyan-300">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              ) : (
                <div className="text-slate-400">Loading endpoint response...</div>
              )}
            </div>
          </div>

          {/* Python Snippet */}
          <div className="bg-[#0b1326] border border-blue-900/40 rounded-xl p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-300">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" /> Python Operational Integration Snippet
              </div>
              <span className="text-[10px] font-mono text-cyan-400">Copy to operational script</span>
            </div>
            <pre className="bg-[#050a14] p-3 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto border border-slate-800">
              {pythonSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
