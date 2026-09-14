import React, { useState, useEffect } from 'react';
import { SCHEMES as STATIC_SCHEMES } from '../data/schemes';
import SchemeCard from '../components/SchemeCard';
import { ADMIN_CONFIG } from '../config/adminConfig';
import { schemesAPI } from '../api/client';

const { dashboardStats: STATIC_STAT_CARDS } = ADMIN_CONFIG;

export default function Dashboard({ onViewScheme, schemes: liveSchemes, onViewAll }) {
  const SCHEMES = liveSchemes || STATIC_SCHEMES;
  const featured = SCHEMES.filter(s => s.tags.includes('best') || s.tags.includes('hot')).slice(0, 6);

  const [statCards, setStatCards] = useState(STATIC_STAT_CARDS);

  useEffect(() => {
    schemesAPI.stats()
      .then(r => {
        if (!r.data) return;
        const lookup = {};
        r.data.forEach(s => { lookup[s.category] = s.count; });
        setStatCards(prev => prev.map(card => {
          const catKey = {
            'Total Schemes': 'ALL',
            'Grant': 'GRANT',
            'Equity': 'EQUITY',
            'Loan Only': 'LOAN ONLY',
            'Loan Subsidy': 'LOAN SUBSIDY',
            'Debt + Equity': 'DEBT EQUITY',
            'Certifications': 'CERTGEM',
            'Grant+Debt+Eq': 'GRANT-DEBT-EQUITY',
          }[card.label];
          if (catKey && lookup[catKey] !== undefined) return { ...card, value: lookup[catKey] };
          return card;
        }));
      })
      .catch(() => {}); // fall back to static values silently
  }, []);

  return (
    <div className="page-transition">
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center text-lg flex-shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-none">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-800">Featured Schemes</h2>
        <span onClick={onViewAll} className="text-xs text-[#1a5dfe] font-semibold cursor-pointer hover:underline">View All</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map(s => (
          <SchemeCard key={s.id} scheme={s} onClick={onViewScheme} />
        ))}
      </div>
    </div>
  );
}