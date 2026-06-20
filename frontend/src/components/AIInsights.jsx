import React from 'react';

const PRIORITY_STYLES = {
  critical: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    badge: 'bg-red-500/20 text-red-400',
    label: '🔴 Critical'
  },
  warning: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-500/20 text-amber-400',
    label: '🟡 Important'
  },
  info: {
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    badge: 'bg-blue-500/20 text-blue-400',
    label: '🔵 Tip'
  }
};

function AIInsights({ insights }) {
  if (!insights) return null;

  const { summary, totalFootprint, personalizedTips, equivalence, funFact, categoryBreakdown } = insights;

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <div className="glass-card animate-fadeIn bg-gradient-to-r from-ecoGreen/10 via-teal-500/10 to-cyan-500/10 border-ecoGreen/20">
        <div className="flex items-start gap-4">
          <div className="text-4xl animate-float">🧠</div>
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ecoGreen to-teal-400 mb-2">
              AI Carbon Analysis
            </h2>
            <p className="text-gray-300 leading-relaxed">{summary}</p>
            {totalFootprint > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  <span className="text-gray-400">Total: </span>
                  <span className="text-ecoGreen font-bold">{totalFootprint} kg CO₂e</span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  <span className="text-gray-400">Categories tracked: </span>
                  <span className="text-white font-bold">{categoryBreakdown?.length || 0}</span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  <span className="text-gray-400">Trees to offset: </span>
                  <span className="text-emerald-400 font-bold">{equivalence?.trees || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personalized Tips */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-ecoGreen rounded-full animate-pulse"></span>
          Personalized Reduction Strategies
        </h3>
        <div className="space-y-4">
          {personalizedTips.map((tip, idx) => {
            const style = PRIORITY_STYLES[tip.priority] || PRIORITY_STYLES.info;
            return (
              <div
                key={idx}
                className={`glass-card animate-fadeIn ${style.border} ${style.bg} hover:scale-[1.01] transition-transform duration-300`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-white">{tip.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.badge}`}>
                        {style.label}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm">{tip.message}</p>
                    {tip.impact && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs bg-ecoGreen/20 text-ecoGreen px-3 py-1 rounded-full font-medium">
                          💪 Potential: {tip.impact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Equivalence */}
      {equivalence && totalFootprint > 0 && (
        <div className="glass-card animate-fadeIn stagger-3">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            Your Footprint in Perspective
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-2">🌳</div>
              <div className="text-2xl font-extrabold text-emerald-400">{equivalence.trees}</div>
              <div className="text-sm text-gray-500 mt-1">trees needed for 1 year to absorb your CO₂</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-2">🚗</div>
              <div className="text-2xl font-extrabold text-amber-400">{equivalence.driving}</div>
              <div className="text-sm text-gray-500 mt-1">miles of driving equivalent</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-2">📱</div>
              <div className="text-2xl font-extrabold text-blue-400">{equivalence.phoneCharges}</div>
              <div className="text-sm text-gray-500 mt-1">smartphone charges equivalent</div>
            </div>
          </div>
        </div>
      )}

      {/* Fun Fact */}
      {funFact && (
        <div className="glass-card animate-fadeIn stagger-4 border-ecoGreen/20 bg-gradient-to-r from-ecoGreen/5 to-teal-500/5">
          <div className="flex items-start gap-4">
            <div className="text-3xl animate-float">🔬</div>
            <div>
              <h4 className="text-sm font-bold text-ecoGreen uppercase tracking-wider mb-2">AI Fun Fact</h4>
              <p className="text-gray-300 leading-relaxed">{funFact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
