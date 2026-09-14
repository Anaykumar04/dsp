import React, { useState, useEffect, useMemo } from 'react';
import { X, TrendingUp, Search, Zap, MapPin, ChevronRight, Sparkles, Building2, ArrowUpRight, Flame, Zap as ZapIcon, Leaf, Star } from 'lucide-react';

const TAG_ICONS = { hot: Flame, easy: ZapIcon, early: Leaf, best: Star };
const TAG_LABELS = { hot: 'High Funding', easy: 'Easy Approval', early: 'Early Stage', best: 'Best for You' };
const TAG_COLORS = {
  hot:   { bg: '#fff1e6', color: '#c2410c', border: '#fed7aa' },
  easy:  { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  early: { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' },
  best:  { bg: '#fff9cc', color: '#7a5e00', border: '#fdcf00' },
};

const CATEGORY_COLORS = {
  'GRANT':             { bg: '#fff9cc', color: '#7a5e00', border: '#fdcf00' },
  'GRANT-DEBT-EQUITY': { bg: '#fff9cc', color: '#7a5e00', border: '#fdcf00' },
  'DEBT EQUITY':       { bg: '#e8effe', color: '#1a5dfe', border: '#a8c0fd' },
  'EQUITY':            { bg: '#e8effe', color: '#1a5dfe', border: '#a8c0fd' },
  'LOAN ONLY':         { bg: '#fff9cc', color: '#7a5e00', border: '#fdcf00' },
  'LOAN SUBSIDY':      { bg: '#fff9cc', color: '#7a5e00', border: '#fdcf00' },
  'CERTGEM':           { bg: '#e8effe', color: '#1a5dfe', border: '#a8c0fd' },
};

export default function FundingOpportunities({ schemes, onClose, onViewScheme }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const newSchemes = useMemo(() => schemes.filter(s => s.isNew === true), [schemes]);

  const filtered = useMemo(() => {
    if (!search.trim()) return newSchemes;
    const q = search.toLowerCase();
    return newSchemes.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.organization?.toLowerCase().includes(q) ||
      s.tags?.some(t => t.toLowerCase().includes(q))
    );
  }, [newSchemes, search]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      style={{ background: 'rgba(10,14,40,0.75)', backdropFilter: 'blur(6px)' }}>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden"
        style={{ animation: 'modalIn 0.2s ease-out', maxHeight: '90vh' }}>

        {/* ── Header ── */}
        <div className="flex-shrink-0 px-5 md:px-7 pt-6 pb-5"
          style={{ background: 'linear-gradient(135deg, #0f3cc9 0%, #1a5dfe 100%)' }}>

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-white font-bold text-xl leading-tight">Funding Opportunities</h2>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-widest"
                    style={{ background: '#fdcf00', color: '#5a4500' }}>
                    Recently Added
                  </span>
                </div>
                <p className="text-[#a8c0fd] text-xs mt-0.5">
                  {newSchemes.length} new scheme{newSchemes.length !== 1 ? 's' : ''} recently added — explore and apply
                </p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <X size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#a8c0fd' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, organization…"
              className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              onFocus={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onBlur={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
            />
          </div>
        </div>

        {/* ── Count bar ── */}
        <div className="flex items-center justify-between px-5 md:px-7 py-2.5 flex-shrink-0"
          style={{ background: '#eef2ff', borderBottom: '1px solid #e0e7ff' }}>
          <p className="text-xs font-medium" style={{ color: '#1a5dfe' }}>
            Showing <strong>{filtered.length}</strong> scheme{filtered.length !== 1 ? 's' : ''}
            {search.trim() && <span style={{ color: '#6b7fcc' }}> for "{search}"</span>}
          </p>
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: '#fff', color: '#1a5dfe', border: '1px solid #a8c0fd' }}>
            <Sparkles size={10} /> New additions
          </span>
        </div>

        {/* ── List ── */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#f1f5f9' }}>
                <Zap size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-600 font-semibold">No funding opportunities found</p>
              <p className="text-sm text-gray-400 max-w-xs">
                {newSchemes.length === 0
                  ? 'Mark schemes as "Recently Added" in Admin Panel to show them here.'
                  : 'Try a different search term.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((scheme, idx) => {
                const catStyle = CATEGORY_COLORS[scheme.category] || { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
                return (
                  <div key={scheme._id || scheme.id}
                    className="group flex items-center gap-4 px-5 md:px-7 py-4 hover:bg-blue-50/40 transition-colors cursor-pointer"
                    onClick={() => { onViewScheme(scheme); onClose(); }}>

                    {/* Index number */}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#e8effe', color: '#1a5dfe' }}>
                      {idx + 1}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{scheme.name}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide flex-shrink-0"
                          style={{ background: catStyle.bg, color: catStyle.color, borderColor: catStyle.border }}>
                          {scheme.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Building2 size={11} />
                          {scheme.organization || '—'}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={11} />
                          {scheme.applicableFor || scheme.location || 'Pan India'}
                        </span>
                        {scheme.tags?.map(tag => {
                          const Icon = TAG_ICONS[tag];
                          const s = TAG_COLORS[tag];
                          if (!s) return null;
                          return (
                            <span key={tag} className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border"
                              style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                              {Icon && <Icon size={10} />}
                              {TAG_LABELS[tag]}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Max funding + CTA */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {scheme.maxFunding && (
                        <div className="text-right hidden sm:block">
                          <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#7a5e00' }}>Max Funding</p>
                          <p className="text-base font-extrabold leading-tight" style={{ color: '#7a5e00' }}>{scheme.maxFunding}</p>
                        </div>
                      )}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                        style={{ background: '#1a5dfe' }}>
                        <ArrowUpRight size={15} className="text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        input::placeholder { color: #a8c0fd; }
      `}</style>
    </div>
  );
}