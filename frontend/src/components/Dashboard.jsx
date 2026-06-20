import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#a855f7', '#06b6d4'];
const GLOW_CLASSES = ['glow-green', 'glow-amber', 'glow-blue', '', 'glow-purple'];

function Dashboard({ footprints, insights }) {
  const totalFootprint = insights?.totalFootprint || 0;
  const breakdown = insights?.categoryBreakdown || [];
  const equivalence = insights?.equivalence;

  const pieData = breakdown.map(cat => ({
    name: cat.category,
    value: cat.total,
    icon: cat.icon
  }));

  const recentActivity = footprints.slice(0, 8);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card !p-3 !rounded-xl" style={{ background: 'rgba(6,11,24,0.95)' }}>
          <p className="text-white font-semibold text-sm">{payload[0].name || payload[0].payload?.name}</p>
          <p className="text-ecoGreen stat-number text-lg">{payload[0].value?.toFixed(1)} kg CO₂e</p>
        </div>
      );
    }
    return null;
  };

  const statsCards = [
    { icon: '🌍', value: totalFootprint, label: 'Total kg CO₂e', color: 'text-ecoGreen', glowClass: 'glow-green', gradient: 'from-ecoGreen/20 to-teal-500/5' },
    { icon: '🌳', value: equivalence?.trees || 0, label: 'Trees to offset', color: 'text-emerald-400', glowClass: 'glow-green', gradient: 'from-emerald-500/20 to-green-500/5' },
    { icon: '🚗', value: equivalence?.driving || 0, label: 'Miles equivalent', color: 'text-amber-400', glowClass: 'glow-amber', gradient: 'from-amber-500/20 to-orange-500/5' },
    { icon: '📱', value: equivalence?.phoneCharges || 0, label: 'Phone charges', color: 'text-blue-400', glowClass: 'glow-blue', gradient: 'from-blue-500/20 to-cyan-500/5' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statsCards.map((stat, idx) => (
          <div
            key={stat.label}
            className={`glass-card-hover animate-fadeIn cursor-default`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-[20px] opacity-50`}></div>
            <div className="relative text-center py-2">
              <div className="text-3xl mb-3 animate-float" style={{ animationDelay: `${idx * 500}ms` }}>{stat.icon}</div>
              <div className={`stat-number text-4xl ${stat.color}`}>{stat.value}</div>
              <div className="text-[11px] text-gray-500 mt-2 uppercase tracking-[0.15em] font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="glass-card animate-fadeIn delay-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ecoGreen/20 to-teal-500/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-ecoGreen rounded-full animate-glow-pulse"></div>
            </div>
            <h3 className="text-lg font-bold tracking-tight">Category Breakdown</h3>
          </div>
          {pieData.length > 0 ? (
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={300}
                    animationDuration={1200}
                    animationEasing="ease-out"
                    strokeWidth={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[260px] flex flex-col items-center justify-center text-gray-600 gap-3">
              <span className="text-4xl opacity-30">📊</span>
              <p className="text-sm">No data yet — start logging activities</p>
            </div>
          )}
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-5 justify-center">
            {breakdown.map((cat, i) => (
              <div key={cat.category} className="flex items-center gap-2 text-sm group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="text-gray-500 group-hover:text-gray-300 transition-colors">{cat.icon} {cat.category}</span>
                <span className="stat-number text-white text-sm">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-card animate-fadeIn delay-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-glow-pulse"></div>
            </div>
            <h3 className="text-lg font-bold tracking-tight">Emissions Comparison</h3>
          </div>
          {breakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={breakdown} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis
                  dataKey="category"
                  tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  unit=" kg"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.05)', radius: 8 }} />
                <Bar dataKey="total" radius={[10, 10, 4, 4]} animationDuration={1200} animationEasing="ease-out">
                  {breakdown.map((entry, index) => (
                    <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[290px] flex flex-col items-center justify-center text-gray-600 gap-3">
              <span className="text-4xl opacity-30">📉</span>
              <p className="text-sm">No data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card animate-fadeIn delay-400">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-glow-pulse"></div>
            </div>
            <h3 className="text-lg font-bold tracking-tight">Recent Activity</h3>
          </div>
          {recentActivity.length > 0 && (
            <span className="text-xs text-gray-600 font-medium bg-white/5 px-3 py-1.5 rounded-full">{footprints.length} total entries</span>
          )}
        </div>
        {recentActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-600 gap-3">
            <span className="text-5xl opacity-20">🌱</span>
            <p className="text-sm">No activity recorded yet</p>
            <p className="text-xs text-gray-700">Head to "Log Activity" to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentActivity.map((fp, idx) => (
              <div
                key={fp._id}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06] transition-all duration-400 group cursor-default"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-400">
                    {fp.category === 'Transportation' ? '🚗' : fp.category === 'Energy' ? '⚡' : fp.category === 'Food' ? '🍔' : '🛍️'}
                  </div>
                  <div>
                    <span className="block font-semibold text-[15px] group-hover:text-ecoGreen transition-colors duration-300">{fp.category}</span>
                    <span className="text-xs text-gray-600">{fp.value} {fp.unit} · {new Date(fp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="stat-number text-ecoGreen text-lg">+{fp.co2Equivalent.toFixed(1)}</span>
                  <span className="text-gray-600 text-xs ml-1">kg</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fun Fact */}
      {insights?.funFact && (
        <div className="glass-card animate-fadeIn delay-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-ecoGreen/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-start gap-5 relative">
            <div className="text-4xl animate-float">💡</div>
            <div>
              <h4 className="text-[11px] font-bold text-ecoGreen uppercase tracking-[0.2em] mb-2">Did You Know?</h4>
              <p className="text-gray-400 leading-relaxed text-[15px]">{insights.funFact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
