import React, { useState } from 'react';

const CATEGORY_CONFIG = {
  Transportation: { icon: '🚗', units: ['miles', 'km', 'flights', 'bus_miles'], gradient: 'from-amber-500 to-orange-500', glow: 'glow-amber', bg: 'from-amber-500/15 to-orange-500/5' },
  Energy: { icon: '⚡', units: ['kWh', 'therms', 'gallons_propane'], gradient: 'from-blue-500 to-cyan-500', glow: 'glow-blue', bg: 'from-blue-500/15 to-cyan-500/5' },
  Food: { icon: '🍔', units: ['meals', 'veg_meals', 'vegan_meals'], gradient: 'from-red-500 to-pink-500', glow: '', bg: 'from-red-500/15 to-pink-500/5' },
  Shopping: { icon: '🛍️', units: ['items', 'clothing', 'electronics'], gradient: 'from-purple-500 to-violet-500', glow: 'glow-purple', bg: 'from-purple-500/15 to-violet-500/5' }
};

function TrackerForm({ onAdded, knowledge }) {
  const [category, setCategory] = useState('Transportation');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('miles');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const calculateCO2 = (cat, val, un) => {
    if (knowledge && knowledge[cat] && knowledge[cat].factors[un]) {
      return val * knowledge[cat].factors[un].co2PerUnit;
    }
    let factor = 1;
    if (cat === 'Transportation') factor = un === 'miles' ? 0.4 : un === 'km' ? 0.25 : un === 'flights' ? 255 : 0.089;
    if (cat === 'Energy') factor = un === 'kWh' ? 0.9 : un === 'therms' ? 5.3 : 5.7;
    if (cat === 'Food') factor = un === 'meals' ? 2.5 : un === 'veg_meals' ? 0.7 : 0.4;
    if (cat === 'Shopping') factor = un === 'items' ? 10 : un === 'clothing' ? 15 : 50;
    return val * factor;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const co2Equivalent = calculateCO2(category, parseFloat(value), unit);
    try {
      const res = await fetch('http://localhost:5000/api/footprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ category, value: parseFloat(value), unit, co2Equivalent })
      });
      if (res.status === 401) {
        // session expired or unauthorized - reload to trigger session restore/login
        window.location.reload();
        return;
      }

      if (res.ok) {
        setSuccess(true);
        setValue('');
        onAdded();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to add footprint', err);
    } finally {
      setLoading(false);
    }
  };

  const co2Preview = value && !isNaN(parseFloat(value)) ? calculateCO2(category, parseFloat(value), unit) : 0;
  const catConfig = CATEGORY_CONFIG[category];
  const catKnowledge = knowledge?.[category];

  return (
    <div className="space-y-8">
      {/* Category Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {Object.entries(CATEGORY_CONFIG).map(([cat, config], idx) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setUnit(config.units[0]); }}
            className={`relative glass-card !p-5 text-center cursor-pointer animate-fadeIn group overflow-hidden
              ${category === cat ? `border-white/10 ${config.glow}` : 'hover:-translate-y-2'}`}
            style={{ animationDelay: `${idx * 80}ms`, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            {category === cat && (
              <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} rounded-[20px]`}></div>
            )}
            <div className="relative">
              <div className={`text-5xl mb-3 transition-transform duration-500 ${category === cat ? 'scale-110' : 'group-hover:scale-110'}`}>{config.icon}</div>
              <div className={`text-sm font-bold tracking-wide ${category === cat ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'} transition-colors`}>{cat}</div>
              {category === cat && (
                <div className={`mt-3 h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${config.gradient}`}></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Form Card */}
        <div className="glass-card animate-fadeIn delay-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${catConfig.gradient} flex items-center justify-center text-2xl shadow-lg`}>
              {catConfig.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Log {category}</h2>
              <p className="text-xs text-gray-600 mt-0.5">Track your carbon impact</p>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-ecoGreen/30 px-4 py-2 rounded-xl transition-all duration-400 flex items-center gap-2 font-medium text-gray-500 hover:text-ecoGreen"
          >
            <span>💡</span>
            {showInfo ? 'Hide' : 'Why it matters'}
          </button>
        </div>

        {/* Info Panel */}
        {showInfo && catKnowledge && (
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-ecoGreen/[0.06] to-teal-500/[0.02] border border-ecoGreen/10 animate-fadeIn">
            <h4 className="text-[11px] font-bold text-ecoGreen uppercase tracking-[0.2em] mb-3">Why {category} Matters</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{catKnowledge.importance}</p>
            <div className="border-t border-white/[0.04] pt-4">
              <h5 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-3">Quick Facts</h5>
              <div className="space-y-2">
                {catKnowledge.facts.slice(0, 3).map((fact, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-500">
                    <span className="text-ecoGreen/60 mt-0.5 text-xs">●</span>
                    <span className="leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] text-gray-500 mb-2.5 font-bold uppercase tracking-[0.15em]">Activity Type</label>
              <select
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 text-white outline-none focus:border-ecoGreen/50 focus:bg-white/[0.06] transition-all duration-400 text-sm font-medium"
                style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                value={unit}
                onChange={e => setUnit(e.target.value)}
              >
                {catConfig.units.map(u => (
                  <option key={u} value={u} style={{ background: '#060b18' }}>
                    {catKnowledge?.factors[u]?.label || u}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 mb-2.5 font-bold uppercase tracking-[0.15em]">Amount</label>
              <input
                type="number"
                required
                min="0"
                step="any"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 text-white outline-none focus:border-ecoGreen/50 focus:bg-white/[0.06] transition-all duration-400 text-sm font-medium placeholder:text-gray-700"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Enter amount..."
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-colors duration-700 ${co2Preview > 50 ? 'bg-red-500' : co2Preview > 10 ? 'bg-amber-500' : 'bg-ecoGreen'}`}></div>
            <div className="relative flex items-end justify-between">
              <div>
                <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold mb-2">Estimated Carbon Impact</div>
                <div className="flex items-baseline gap-3">
                  <span className={`stat-number text-5xl transition-all duration-700 ${co2Preview > 50 ? 'text-red-400' : co2Preview > 10 ? 'text-amber-400' : 'text-ecoGreen'}`}>
                    {co2Preview.toFixed(1)}
                  </span>
                  <span className="text-gray-600 text-sm font-medium">kg CO₂e</span>
                </div>
              </div>
              <div className="text-right space-y-1.5">
                <div className="text-xs text-gray-600 flex items-center gap-2 justify-end">
                  <span>🌳</span> {(co2Preview / 22).toFixed(2)} trees/year
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-2 justify-end">
                  <span>🚗</span> {(co2Preview / 0.4).toFixed(0)} miles
                </div>
              </div>
            </div>
            {/* Impact Bar */}
            <div className="mt-5">
              <div className="w-full bg-white/[0.04] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${co2Preview > 50 ? 'bg-gradient-to-r from-red-500 to-red-400' : co2Preview > 10 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-gradient-to-r from-ecoGreen to-teal-400'}`}
                  style={{ width: `${Math.min((co2Preview / 100) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-700 mt-2 font-medium tracking-wider uppercase">
                <span>Low Impact</span>
                <span>High Impact</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !value}
            className={`relative w-full py-4.5 rounded-2xl font-bold text-base transition-all duration-500 transform active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden group
              ${success ? 'bg-emerald-500 text-white' : 'text-ecoDark'}`}
            style={!success ? { background: 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)', padding: '18px' } : { padding: '18px' }}
          >
            {!success && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
            <span className="relative">
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-ecoDark/30 border-t-ecoDark rounded-full animate-spin"></div>
                  Logging...
                </span>
              ) : success ? (
                '✅ Activity Logged Successfully!'
              ) : (
                '🌱 Log Activity'
              )}
            </span>
          </button>
        </form>
      </div>

      {/* Equivalence Card */}
      {catKnowledge?.equivalences && (
        <div className="glass-card animate-fadeIn delay-300">
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Carbon Equivalences</h4>
          <div className="space-y-3">
            {Object.entries(catKnowledge.equivalences).map(([key, val]) => (
              <div key={key} className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                <span className="text-xl mt-0.5">📐</span>
                <p className="text-gray-400 leading-relaxed text-sm">{val}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackerForm;
