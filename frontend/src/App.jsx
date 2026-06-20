import React, { useState, useEffect } from 'react';
import TrackerForm from './components/TrackerForm';
import Dashboard from './components/Dashboard';
import AIInsights from './components/AIInsights';
import CarbonExplorer from './components/CarbonExplorer';
import LoginPage from './components/LoginPage';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [footprints, setFootprints] = useState([]);
  const [insights, setInsights] = useState(null);
  const [knowledge, setKnowledge] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(true);

  const fetchData = async () => {
    try {
      const [fpRes, inRes, knRes] = await Promise.all([
        fetch(`${API_URL}/footprint`, { credentials: 'include' }),
        fetch(`${API_URL}/insights`, { credentials: 'include' }),
        fetch(`${API_URL}/knowledge`, { credentials: 'include' })
      ]);
      const fpData = await fpRes.json();
      const inData = await inRes.json();
      const knData = await knRes.json();
      setFootprints(fpData);
      setInsights(inData);
      setKnowledge(knData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchData();
    }
  }, [user]);

  // Restore session on mount
  useEffect(() => {
    const restore = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        setUser({ name: data.name, email: data.email });
      } catch (err) {
        // ignore
      } finally {
        setRestoring(false);
      }
    };
    restore();
    // ensure we stop restoring eventually
    const timeout = setTimeout(() => setRestoring(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'log', label: 'Log Activity', icon: '➕' },
    { id: 'insights', label: 'AI Insights', icon: '🧠' },
    { id: 'explore', label: 'Carbon Explorer', icon: '🔬' },
  ];

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    // notify server to clear cookie
    fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    setUser(null);
    setActiveTab('dashboard');
    setFootprints([]);
    setInsights(null);
    setKnowledge(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#060b18' }}>
      {/* Premium animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full opacity-10 animate-float"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', filter: 'blur(40px)', animationDuration: '8s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit opacity-30">
            <div className="w-1.5 h-1.5 bg-ecoGreen rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit opacity-20" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
            <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {restoring && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-ecoGreen/20 rounded-full mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Restoring session...</p>
            </div>
          </div>
        )}

        {!restoring && !user && (
          <LoginPage onLogin={handleLogin} />
        )}

        {!restoring && user && (
          <>
            {/* Header */}
            <header className="border-b border-white/[0.04] sticky top-0 z-50"
              style={{ background: 'linear-gradient(180deg, rgba(6,11,24,0.95) 0%, rgba(6,11,24,0.85) 100%)', backdropFilter: 'blur(24px) saturate(1.8)' }}>
              <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-ecoGreen to-teal-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-ecoGreen to-teal-400 rounded-2xl flex items-center justify-center text-xl shadow-lg">
                      🌍
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gradient-green">
                      EcoTrack
                    </h1>
                    <p className="text-[11px] text-gray-600 uppercase tracking-[0.2em] font-medium mt-0.5">AI-Powered Carbon Intelligence</p>
                    <p className="text-sm text-gray-400 mt-2 hidden md:block">Welcome back, <span className="text-white">{user?.name}</span>. Your insights are ready.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  
                  {insights && insights.totalFootprint > 0 && (
                    <div className="hidden md:flex items-center gap-3 glass-card py-2.5 px-5 !rounded-2xl">
                      <div className="w-2 h-2 bg-ecoGreen rounded-full animate-glow-pulse"></div>
                      <span className="text-gray-500 text-sm font-medium">Live Footprint</span>
                      <span className="stat-number text-ecoGreen text-xl">{insights.totalFootprint}</span>
                      <span className="text-gray-600 text-xs">kg CO₂e</span>
                    </div>
                  )}

                  <div className="glass-card flex items-center gap-3 py-2.5 px-4 rounded-3xl bg-slate-950/80 border border-white/10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ecoGreen/10 text-lg text-ecoGreen">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-[112px]">
                      <p className="text-sm font-semibold text-white">{user?.name || 'Member'}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ecoGreen transition hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="max-w-6xl mx-auto px-6">
                <nav className="flex gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-3.5 text-sm font-semibold rounded-t-xl transition-all duration-400 flex items-center gap-2.5 group
                        ${activeTab === tab.id
                          ? 'text-white'
                          : 'text-gray-600 hover:text-gray-400'}`}
                    >
                      {activeTab === tab.id && (
                        <div className="absolute inset-0 rounded-t-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ecoGreen to-transparent"></div>
                        </div>
                      )}
                      <span className="relative z-10 text-base group-hover:scale-110 transition-transform duration-300">{tab.icon}</span>
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-10">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-ecoGreen/10 rounded-full"></div>
                    <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-ecoGreen rounded-full animate-spin"></div>
                    <div className="absolute inset-2 w-12 h-12 border-2 border-transparent border-t-teal-400/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium tracking-wider uppercase">Loading your data...</p>
                </div>
              ) : (
                <div key={activeTab} className="animate-fadeIn">
                  {activeTab === 'dashboard' && (
                    <Dashboard footprints={footprints} insights={insights} />
                  )}
                  {activeTab === 'log' && (
                    <TrackerForm onAdded={fetchData} knowledge={knowledge} />
                  )}
                  {activeTab === 'insights' && (
                    <AIInsights insights={insights} />
                  )}
                  {activeTab === 'explore' && (
                    <CarbonExplorer knowledge={knowledge} />
                  )}
                </div>
              )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/[0.03] py-8 mt-12">
              <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <p className="text-gray-700 text-xs">Built with 💚 for the planet</p>
                <p className="text-gray-700 text-xs">EcoTrack v2.0 — AI Carbon Intelligence</p>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
