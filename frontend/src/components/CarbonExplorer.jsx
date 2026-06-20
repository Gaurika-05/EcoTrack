import React, { useState } from 'react';

const CATEGORY_COLORS = {
  Transportation: { gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  Energy: { gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  Food: { gradient: 'from-red-500 to-pink-500', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  Shopping: { gradient: 'from-purple-500 to-violet-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' }
};

function CarbonExplorer({ knowledge }) {
  const [activeCategory, setActiveCategory] = useState('Transportation');

  if (!knowledge) return null;

  const cat = knowledge[activeCategory];
  const colors = CATEGORY_COLORS[activeCategory];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card animate-fadeIn">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">🔬</div>
          <div>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ecoGreen to-teal-400">
              Carbon Explorer
            </h2>
            <p className="text-sm text-gray-500">Explore the carbon content and impact of everyday activities</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.keys(knowledge).map((catName, idx) => {
          const catColors = CATEGORY_COLORS[catName];
          return (
            <button
              key={catName}
              onClick={() => setActiveCategory(catName)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 animate-fadeIn
                ${activeCategory === catName
                  ? `bg-gradient-to-r ${catColors.gradient} text-white shadow-lg`
                  : 'glass-card hover:bg-white/10'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <span className="text-lg">{knowledge[catName].icon}</span>
              {catName}
            </button>
          );
        })}
      </div>

      {/* Importance */}
      <div className={`glass-card animate-fadeIn ${colors.border} ${colors.bg}`}>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-sm`}>
            {cat.icon}
          </span>
          Why {activeCategory} Matters
        </h3>
        <p className="text-gray-300 leading-relaxed">{cat.importance}</p>
      </div>

      {/* Carbon Factors Table */}
      <div className="glass-card animate-fadeIn stagger-1">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-ecoGreen rounded-full animate-pulse"></span>
          Carbon Content per Activity
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-sm text-gray-500 font-medium">Activity</th>
                <th className="pb-3 text-sm text-gray-500 font-medium text-right">CO₂ per Unit</th>
                <th className="pb-3 text-sm text-gray-500 font-medium text-right">Impact Level</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cat.factors).map(([key, factor]) => {
                const level = factor.co2PerUnit > 20 ? 'High' : factor.co2PerUnit > 2 ? 'Medium' : 'Low';
                const levelColor = level === 'High' ? 'text-red-400 bg-red-500/20' : level === 'Medium' ? 'text-amber-400 bg-amber-500/20' : 'text-ecoGreen bg-ecoGreen/20';
                return (
                  <tr key={key} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3">
                      <span className="font-medium text-white">{factor.label}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`font-bold ${colors.text}`}>{factor.co2PerUnit} kg</span>
                      <span className="text-gray-500 text-sm ml-1">CO₂e</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${levelColor}`}>{level}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equivalences */}
      {cat.equivalences && (
        <div className="glass-card animate-fadeIn stagger-2">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
            Real-World Equivalences
          </h3>
          <div className="space-y-3">
            {Object.entries(cat.equivalences).map(([key, val]) => (
              <div key={key} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                <span className="text-2xl">📐</span>
                <p className="text-gray-300 leading-relaxed">{val}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facts */}
      <div className="glass-card animate-fadeIn stagger-3">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          Did You Know?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cat.facts.map((fact, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
              <span className="text-lg group-hover:scale-125 transition-transform">💡</span>
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reduction Strategies */}
      <div className="glass-card animate-fadeIn stagger-4">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-ecoGreen rounded-full animate-pulse"></span>
          How to Reduce {activeCategory} Emissions
        </h3>
        <div className="space-y-3">
          {cat.reductions.map((r, i) => {
            const impactColor = r.impact === 'high' ? 'bg-ecoGreen/20 text-ecoGreen' : r.impact === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400';
            return (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group hover:-translate-x-1">
                <div className="w-8 h-8 rounded-full bg-ecoGreen/20 flex items-center justify-center text-ecoGreen font-bold text-sm group-hover:bg-ecoGreen group-hover:text-ecoDark transition-all duration-300">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-white group-hover:text-ecoGreen transition-colors">{r.action}</h5>
                  <p className="text-sm text-gray-500">{r.savings}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${impactColor}`}>
                  {r.impact} impact
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CarbonExplorer;
