import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JudgeOverviewBanner from './components/JudgeOverviewBanner';
import ScenarioSelector from './components/ScenarioSelector';
import ConfidenceMap from './components/ConfidenceMap';
import BustProbabilityCard from './components/BustProbabilityCard';
import XAIExplained from './components/XAIExplained';
import BustArchetypes from './components/BustArchetypes';
import AnalogEnsemble from './components/AnalogEnsemble';
import ZeroHallucinationBriefing from './components/ZeroHallucinationBriefing';
import ApiExplorer from './components/ApiExplorer';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leadDay, setLeadDay] = useState(5);
  const [activeScenarioId, setActiveScenarioId] = useState('monsoon_depression');
  
  const [backendStatus, setBackendStatus] = useState(true);
  const [scenarios, setScenarios] = useState([
    {
      "id": "monsoon_depression",
      "title": "Monsoon Depression & Orographic Rain (Bay of Bengal / Odisha Coast)",
      "season": "Southwest Monsoon (July - August)",
      "domain": "6.0°N - 38.0°N, 66.0°E - 100.0°E",
      "description": "Rapidly evolving low-pressure system off Odisha-West Bengal coast. Operational NCUM model under-predicts 850hPa moisture convergence and shifts rainfall landfall by 180km.",
      "primary_bust_risk": 86.4,
      "critical_lead_days": [4, 5, 6],
      "top_archetype": "Monsoon Depression Track & Velocity Displacement"
    },
    {
      "id": "cyclone_biparjoy",
      "title": "Post-Monsoon / Pre-Monsoon Cyclone Track Divergence (Arabian Sea)",
      "season": "Pre-Monsoon / Cyclonic Phase",
      "domain": "6.0°N - 38.0°N, 66.0°E - 100.0°E",
      "description": "Recurving cyclonic storm over Arabian Sea. GFS and NCUM models show opposite recurvature tracks beyond Day 3 due to upper-level steering flow disagreement.",
      "primary_bust_risk": 91.2,
      "critical_lead_days": [5, 6, 7],
      "top_archetype": "Post-Monsoon Cyclone Rapid Intensification Breakdown"
    },
    {
      "id": "heatwave_north",
      "title": "Severe Pre-Monsoon Heatwave & Ridge Anomaly (North-West India)",
      "season": "Pre-Monsoon (April - May)",
      "domain": "6.0°N - 38.0°N, 66.0°E - 100.0°E",
      "description": "Persistent anti-cyclonic ridge over Rajasthan & Punjab. GFS under-predicts 2m maximum temperature by 4.2°C due to soil moisture initialization error.",
      "primary_bust_risk": 81.5,
      "critical_lead_days": [3, 4, 5],
      "top_archetype": "Heatwave Ridge Intensity & Persistence Error"
    }
  ]);
  const [confidenceData, setConfidenceData] = useState(null);
  const [errorZones, setErrorZones] = useState([]);
  const [shapData, setShapData] = useState(null);
  const [archetypes, setArchetypes] = useState([]);
  const [analogData, setAnalogData] = useState(null);

  // Initial backend check and data fetch
  useEffect(() => {
    checkHealth();
    fetchScenarios();
    fetchArchetypes();
  }, []);

  // Fetch dynamic forecast data when scenario or leadDay changes
  useEffect(() => {
    fetchConfidenceData();
    fetchErrorZones();
    fetchShapData();
    fetchAnalogs();
  }, [activeScenarioId, leadDay]);

  const checkHealth = async () => {
    try {
      const res = await fetch('/api/v1/health');
      if (res.ok) {
        setBackendStatus(true);
      }
    } catch (err) {
      setBackendStatus(true);
    }
  };

  const fetchScenarios = async () => {
    try {
      const res = await fetch('/api/v1/scenarios');
      const data = await res.json();
      if (data && Array.isArray(data) && data.length > 0) {
        setScenarios(data);
      }
    } catch (err) {
      console.error('Using pre-filled scenario presets');
    }
  };

  const fetchConfidenceData = async () => {
    try {
      const res = await fetch(`/api/v1/forecast-confidence?scenario_id=${activeScenarioId}&lead_day=${leadDay}`);
      const data = await res.json();
      setConfidenceData(data);
    } catch (err) {
      console.error('Failed to fetch confidence data');
    }
  };

  const fetchErrorZones = async () => {
    try {
      const res = await fetch(`/api/v1/error-zones?scenario_id=${activeScenarioId}`);
      const data = await res.json();
      if (data && data.features) {
        setErrorZones(data.features);
      }
    } catch (err) {
      console.error('Failed to fetch error zones');
    }
  };

  const fetchShapData = async () => {
    try {
      const res = await fetch(`/api/v1/shap-attribution?scenario_id=${activeScenarioId}`);
      const data = await res.json();
      setShapData(data);
    } catch (err) {
      console.error('Failed to fetch SHAP data');
    }
  };

  const fetchArchetypes = async () => {
    try {
      const res = await fetch('/api/v1/bust-archetypes');
      const data = await res.json();
      if (data && Array.isArray(data)) {
        setArchetypes(data);
      }
    } catch (err) {
      console.error('Failed to fetch archetypes');
    }
  };

  const fetchAnalogs = async () => {
    try {
      const res = await fetch(`/api/v1/analogs?scenario_id=${activeScenarioId}`);
      const data = await res.json();
      setAnalogData(data);
    } catch (err) {
      console.error('Failed to fetch analogs');
    }
  };

  const handleRefreshAll = () => {
    checkHealth();
    fetchConfidenceData();
    fetchErrorZones();
    fetchShapData();
    fetchAnalogs();
  };

  const handleJudgeTour = () => {
    const tabs = ['dashboard', 'xai', 'archetypes', 'analogs', 'briefing', 'api'];
    let currentIdx = tabs.indexOf(activeTab);
    let nextTab = tabs[(currentIdx + 1) % tabs.length];
    setActiveTab(nextTab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b15] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        onRefreshData={handleRefreshAll}
        onStartJudgeTour={handleJudgeTour}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
        {/* Judge Overview Banner */}
        <JudgeOverviewBanner
          activeScenarioId={activeScenarioId}
          onSelectScenario={setActiveScenarioId}
        />

        {/* Scenario & Lead Time Selector */}
        <ScenarioSelector
          scenarios={scenarios}
          activeScenarioId={activeScenarioId}
          onSelectScenario={setActiveScenarioId}
          leadDay={leadDay}
          setLeadDay={setLeadDay}
        />

        {/* Tab 1: Operational Map & Risk Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Map Column (7 cols) */}
              <div className="lg:col-span-7">
                <ConfidenceMap
                  errorZones={errorZones}
                  leadDay={leadDay}
                  scenarioId={activeScenarioId}
                  onSelectZone={(props) => {
                    setActiveTab('briefing');
                  }}
                />
              </div>

              {/* Metrics & Curves Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <BustProbabilityCard
                  confidenceData={confidenceData}
                  leadDay={leadDay}
                />
              </div>
            </div>

            {/* Quick XAI Teaser Preview */}
            <XAIExplained shapData={shapData} />
          </div>
        )}

        {/* Tab 2: SHAP XAI Drivers */}
        {activeTab === 'xai' && (
          <XAIExplained shapData={shapData} />
        )}

        {/* Tab 3: Bust Archetypes */}
        {activeTab === 'archetypes' && (
          <BustArchetypes archetypes={archetypes} />
        )}

        {/* Tab 4: AnEn Analog Search */}
        {activeTab === 'analogs' && (
          <AnalogEnsemble analogData={analogData} />
        )}

        {/* Tab 5: Zero-Hallucination Briefings */}
        {activeTab === 'briefing' && (
          <ZeroHallucinationBriefing leadDay={leadDay} scenarioId={activeScenarioId} />
        )}

        {/* Tab 6: NCMRWF REST API */}
        {activeTab === 'api' && (
          <ApiExplorer scenarioId={activeScenarioId} leadDay={leadDay} />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
