import React from 'react';

function InsightCard({ text }) {
  return (
    <div className="glass-card hover:-translate-y-1 transition-transform cursor-default relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-ecoGreen/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex items-start gap-4 relative z-10">
        <div className="bg-ecoGreen/20 p-3 rounded-full">
          <svg className="w-6 h-6 text-ecoGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <p className="text-gray-300 leading-relaxed pt-1">
          {text}
        </p>
      </div>
    </div>
  );
}

export default InsightCard;
