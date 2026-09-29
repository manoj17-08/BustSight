import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker, useMap } from 'react-leaflet';
import { Compass, Info, Layers, RefreshCw } from 'lucide-react';

// Custom Map Center Updater when scenario changes
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 5.2, { duration: 1.2 });
  }, [center, map]);
  return null;
}

export default function ConfidenceMap({ errorZones, leadDay, scenarioId, onSelectZone }) {
  const [showPolygons, setShowPolygons] = useState(true);
  const [showGridPoints, setShowGridPoints] = useState(true);

  // Map center over India
  const defaultCenter = [21.5, 79.5];

  // Dynamic grid points simulation for Indian Meteorological domain
  const gridPoints = [
    { id: 'g1', lat: 19.8, lon: 86.2, name: 'Puri / Odisha Coast Grid', confidence: Math.max(10, 88 - leadDay * 8), bust_prob: Math.min(95, 12 + leadDay * 8), model_bias: 'NCUM precip +140mm overestimation', status: 'CRITICAL' },
    { id: 'g2', lat: 18.9, lon: 72.8, name: 'Mumbai / Konkan Grid', confidence: Math.max(15, 82 - leadDay * 7), bust_prob: Math.min(90, 18 + leadDay * 7), model_bias: 'GFS misses mesoscale convective surge', status: 'HIGH' },
    { id: 'g3', lat: 26.9, lon: 75.8, name: 'Jaipur / Rajasthan Grid', confidence: Math.max(20, 90 - leadDay * 6), bust_prob: Math.min(85, 10 + leadDay * 6), model_bias: 'NCUM 2m Temp cold bias (-3.8°C)', status: 'HIGH' },
    { id: 'g4', lat: 22.5, lon: 88.3, name: 'Kolkata / Sundarbans Grid', confidence: Math.max(25, 85 - leadDay * 6), bust_prob: Math.min(80, 15 + leadDay * 6), model_bias: 'Track deviation +60km East', status: 'MODERATE' },
    { id: 'g5', lat: 13.0, lon: 80.2, name: 'Chennai / Coromandel Grid', confidence: Math.max(40, 95 - leadDay * 5), bust_prob: Math.min(60, 5 + leadDay * 5), model_bias: 'Moderate agreement (NCUM/GFS 82%)', status: 'LOW' },
    { id: 'g6', lat: 31.6, lon: 74.8, name: 'Amritsar / Punjab Grid', confidence: Math.max(30, 92 - leadDay * 6), bust_prob: Math.min(70, 8 + leadDay * 6), model_bias: 'Western disturbance trough timing lag 12h', status: 'MODERATE' }
  ];

  return (
    <div className="bg-[#0b1326] border border-blue-900/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[500px] h-full">
      {/* Map Control Bar Header */}
      <div className="bg-[#080e1d] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-200 uppercase tracking-wide">
            GeoSpatial Forecast Confidence Map (India Domain 6°-38°N, 66°-100°E)
          </span>
          <span className="bg-cyan-950 text-cyan-300 font-mono text-[10px] px-2 py-0.5 rounded border border-cyan-800">
            Day {leadDay} Grid
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-300">
            <input
              type="checkbox"
              checked={showPolygons}
              onChange={(e) => setShowPolygons(e.target.checked)}
              className="accent-cyan-400 rounded cursor-pointer"
            />
            <span>GeoJSON Polygons</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-blue-300">
            <input
              type="checkbox"
              checked={showGridPoints}
              onChange={(e) => setShowGridPoints(e.target.checked)}
              className="accent-blue-400 rounded cursor-pointer"
            />
            <span>NWP Grid Points</span>
          </label>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 w-full min-h-[440px]">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%', minHeight: '440px' }}
        >
          <MapRecenter center={defaultCenter} />

          {/* 100% Free Esri World Dark Gray Canvas Tile Layer (NO API KEY REQUIRED) */}
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            maxZoom={16}
          />

          {/* GeoJSON Polygons for Error-Prone Zones */}
          {showPolygons && errorZones && errorZones.map((feature, idx) => {
            const props = feature.properties || {};
            const coords = feature.geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
            
            const isCritical = props.model_divergence_level === 'CRITICAL';
            const polyColor = isCritical ? '#ef4444' : '#f59e0b';
            
            return (
              <Polygon
                key={feature.id || idx}
                positions={coords}
                pathOptions={{
                  color: polyColor,
                  fillColor: polyColor,
                  fillOpacity: 0.35,
                  weight: 2,
                  dashArray: '5, 5'
                }}
                eventHandlers={{
                  click: () => onSelectZone && onSelectZone(props)
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1.5 text-xs font-sans">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                      <span className="font-bold text-slate-100">{feature.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isCritical ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'
                      }`}>
                        {props.model_divergence_level}
                      </span>
                    </div>
                    <p className="text-slate-300 font-mono text-[11px]">
                      Bust Probability: <span className="text-red-400 font-bold">{props.bust_probability}%</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      <strong className="text-cyan-300">Dominant Factor:</strong> {props.dominant_factor}
                    </p>
                    <div className="pt-1 text-[10px] text-emerald-400 font-mono">
                      Action: {props.recommended_action}
                    </div>
                  </div>
                </Popup>
              </Polygon>
            );
          })}

          {/* Interactive Grid Point Markers */}
          {showGridPoints && gridPoints.map((pt) => {
            const color = pt.bust_prob > 80 ? '#ef4444' : pt.bust_prob > 50 ? '#f59e0b' : '#10b981';
            return (
              <CircleMarker
                key={pt.id}
                center={[pt.lat, pt.lon]}
                radius={pt.bust_prob > 80 ? 9 : 7}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.85,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1.5 text-xs">
                    <div className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                      {pt.name} ({pt.lat}°N, {pt.lon}°E)
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="bg-slate-900 p-1.5 rounded">
                        <div className="text-slate-400 text-[9px]">CONFIDENCE</div>
                        <div className="text-cyan-400 font-bold text-xs">{pt.confidence}%</div>
                      </div>
                      <div className="bg-slate-900 p-1.5 rounded">
                        <div className="text-slate-400 text-[9px]">BUST PROB</div>
                        <div className="text-red-400 font-bold text-xs">{pt.bust_prob}%</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-300">
                      <strong>Model Bias:</strong> {pt.model_bias}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Map Floating Legend */}
        <div className="absolute bottom-3 left-3 z-[1000] glass-panel p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1.5 shadow-2xl pointer-events-auto">
          <div className="font-bold text-slate-200 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-cyan-400" /> Legend & Risk Key
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
            <span>Critical Bust Risk (&gt;75%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
            <span>High Uncertainty (50-75%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            <span>Reliable Forecast (&lt;50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
