import React, { useState, useEffect } from 'react';
import { X, Search, XCircle, ChevronRight, Sparkles, Target, Gift, Banknote, TrendingUp, LayoutGrid } from 'lucide-react';

const INDUSTRIES = [
  'AgriTech / Food Tech', 'FinTech', 'HealthTech / MedTech', 'EdTech',
  'SaaS / Software', 'EV / Clean Energy', 'Deep Tech / AI / Robotics',
  'Manufacturing', 'Defence', 'Biotech', 'Infrastructure / Logistics',
  'Social Impact / NGO', 'Women-Led Startup', 'Sector Agnostic',
];

const COMPANY_TYPES = [
  'Private Limited', 'LLP', 'Registered Partnership', 'MSME (Proprietor)', 'NGO',
];

const TURNOVER_OPTIONS = [
  'Pre-Revenue (Idea / Prototype)',
  'Early Revenue (< ₹25 Lakhs)',
  'Growth Stage (₹25L – ₹1 Cr)',
  'Established (₹1 Cr – ₹10 Cr)',
  'Scale-Up (₹10 Cr+)',
];

const FUNDING_TYPES = [
  { key: 'GRANT',  label: 'Grant',       icon: Gift,       desc: 'Non-repayable' },
  { key: 'DEBT',   label: 'Debt / Loan', icon: Banknote,   desc: 'Repayable loan' },
  { key: 'EQUITY', label: 'Equity',      icon: TrendingUp, desc: 'Investor stake' },
  { key: 'ANY',    label: 'Any',         icon: LayoutGrid, desc: 'All types' },
];

function scoreScheme(scheme, filters) {
  let score = 0;
  const { fundingType, industry, companyType, turnover, funding } = filters;
  const catMap = {
    GRANT:  ['GRANT', 'GRANT-DEBT-EQUITY'],
    DEBT:   ['LOAN ONLY', 'LOAN SUBSIDY', 'DEBT EQUITY', 'GRANT-DEBT-EQUITY'],
    EQUITY: ['EQUITY', 'DEBT EQUITY', 'GRANT-DEBT-EQUITY'],
    ANY:    ['GRANT', 'GRANT-DEBT-EQUITY', 'DEBT EQUITY', 'EQUITY', 'LOAN ONLY', 'LOAN SUBSIDY', 'CERTGEM'],
  };
  if (catMap[fundingType]?.includes(scheme.category)) score += 40;
  else return 0;
  if (companyType) {
    const ct = scheme.companyTypes || [];
    if (ct.some(c => c.toLowerCase().includes(companyType.toLowerCase()) || c === 'All Types')) score += 30;
    else score -= 10;
  }
  if (industry) {
    const keywords = industry.toLowerCase().split(/[\s/]+/);
    const sectors = [...(scheme.focusSectors || []), ...(scheme.industrySectors || [])].map(s => s.toLowerCase());
    const isAgnostic = sectors.some(s => s.includes('agnostic') || s.includes('all sector'));
    if (isAgnostic) score += 15;
    else if (keywords.some(kw => sectors.some(s => s.includes(kw)))) score += 25;
  }
  // Turnover stage scoring — favour schemes whose eligibility mentions the stage
  if (turnover) {
    const tv = turnover.toLowerCase();
    const eligText = (scheme.eligibility || []).join(' ').toLowerCase();
    const isPreRevenue = tv.includes('pre-revenue') || tv.includes('idea');
    const isEarly = tv.includes('early revenue') || tv.includes('25 lakh');
    const isGrowth = tv.includes('growth');
    const isEstablished = tv.includes('established') || tv.includes('1 cr');
    const isScaleUp = tv.includes('scale-up') || tv.includes('10 cr');
    if (isPreRevenue && (eligText.includes('startup') || eligText.includes('early') || eligText.includes('idea'))) score += 10;
    if (isEarly && (eligText.includes('early') || eligText.includes('revenue'))) score += 10;
    if (isGrowth && (eligText.includes('growth') || eligText.includes('sme') || eligText.includes('msme'))) score += 10;
    if ((isEstablished || isScaleUp) && (eligText.includes('turnover') || eligText.includes('established'))) score += 10;
  }
  // Funding amount — boost schemes whose maxFunding aligns with requested amount
  if (funding && funding.trim()) {
    const reqNum = parseFloat(funding.replace(/[^\d.]/g, ''));
    if (!isNaN(reqNum) && scheme.maxFunding) {
      const maxNum = parseFloat(scheme.maxFunding.replace(/[^\d.]/g, ''));
      if (!isNaN(maxNum) && maxNum >= reqNum) score += 10;
    }
  }
  if (scheme.status === 'Active') score += 5;
  return score;
}

const css = `
  .ec-modal { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
  .ec-body { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
  .ec-form { padding: 16px; overflow-y: auto; border-bottom: 1px solid #f3f4f6; }
  .ec-results { flex: 1; overflow-y: auto; padding: 16px; }
  @media (min-width: 768px) {
    .ec-body { flex-direction: row; }
    .ec-form { width: 300px; flex-shrink: 0; border-bottom: none; border-right: 1px solid #f3f4f6; padding: 24px; }
    .ec-results { padding: 24px; }
  }
`;

export default function EligibilityChecker({ schemes, onClose, onViewScheme }) {
  const [fundingType, setFundingType] = useState('GRANT');
  const [industry,    setIndustry]    = useState('');
  const [companyType, setCompanyType] = useState('');
  const [turnover,    setTurnover]    = useState('');
  const [funding,     setFunding]     = useState('');
  const [results,     setResults]     = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [searched,    setSearched]    = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleFind = () => {
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      const scored = schemes
        .map(s => ({ ...s, _score: scoreScheme(s, { fundingType, industry, companyType, turnover, funding }) }))
        .filter(s => s._score > 0)
        .sort((a, b) => b._score - a._score)
        .slice(0, 12);
      setResults(scored);
      setLoading(false);
    }, 600);
  };

  const matchLabel = (score) => {
    if (score >= 80) return { text: 'Excellent Match', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' };
    if (score >= 60) return { text: 'Good Match',      color: 'text-[#1a5dfe]',   bg: 'bg-blue-50',   dot: 'bg-[#1a5dfe]' };
    if (score >= 40) return { text: 'Possible Match',  color: 'text-amber-600',   bg: 'bg-amber-50',  dot: 'bg-amber-500' };
    return               { text: 'Partial Match',   color: 'text-gray-500',    bg: 'bg-gray-100',  dot: 'bg-gray-400' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
      style={{ background: 'rgba(10,14,40,0.7)', backdropFilter: 'blur(4px)' }}>
      <style>{css}</style>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden"
        style={{ animation: 'modalIn 0.2s ease-out', maxHeight: '92vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1a5dfe 0%, #1a5dfe 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Target size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base md:text-lg leading-tight">Smart Eligibility Checker</h2>
              <p className="text-[#a8c0fd] text-xs hidden sm:block">Enter your details to find matching schemes.</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors flex-shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="ec-body">

          {/* Form */}
          <div className="ec-form flex flex-col gap-4">

            {/* Funding Type pills */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Funding Type</label>
              <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                {FUNDING_TYPES.map(f => (
                  <button key={f.key} onClick={() => setFundingType(f.key)}
                    className={`flex flex-col items-center gap-0.5 md:gap-1 p-2 md:p-2.5 rounded-xl border-2 text-sm font-medium transition-all
                      ${fundingType === f.key
                        ? 'border-[#1a5dfe] bg-[#e8effe] text-[#1a5dfe]'
                        : 'border-gray-200 text-gray-600 hover:border-[#a8c0fd]'}`}>
                    <f.icon size={18} />
                    <span className="text-[10px] md:text-xs font-semibold">{f.label}</span>
                    <span className="text-[9px] md:text-[10px] text-gray-400 hidden md:block">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Business Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a8c0fd] focus:border-[#1a5dfe] bg-gray-50">
                <option value="">Select an Industry</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Business Type</label>
              <select value={companyType} onChange={e => setCompanyType(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a8c0fd] focus:border-[#1a5dfe] bg-gray-50">
                <option value="">Select a Type</option>
                {COMPANY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Business Turnover</label>
              <select value={turnover} onChange={e => setTurnover(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a8c0fd] focus:border-[#1a5dfe] bg-gray-50">
                <option value="">Select Turnover</option>
                {TURNOVER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Funding Required</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                <input type="text" value={funding} onChange={e => setFunding(e.target.value)}
                  placeholder="e.g. 25 Lakhs"
                  className="w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a8c0fd] focus:border-[#1a5dfe] bg-gray-50" />
              </div>
            </div>

            <button onClick={handleFind}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#1a5dfe' }}>
              <Search size={16} />
              Find Matching Schemes
            </button>
          </div>

          {/* Results */}
          <div className="ec-results">
            {!searched && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#fef3c7' }}>
                  <Sparkles size={28} style={{ color: '#fdcf00' }} />
                </div>
                <p className="font-semibold text-gray-700">Eligible schemes will appear here.</p>
                <p className="text-sm text-gray-400 max-w-xs">Fill in the details and click <strong>Find Matching Schemes</strong>.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center gap-4 py-10">
                <div className="w-10 h-10 border-4 border-[#a8c0fd] border-t-[#1a5dfe] rounded-full animate-spin" />
                <p className="text-sm text-gray-500 font-medium">Analysing your profile…</p>
              </div>
            )}

            {!loading && results !== null && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">
                      {results.length > 0 ? `${results.length} Matching Scheme${results.length !== 1 ? 's' : ''} Found` : 'No Schemes Found'}
                    </h3>
                    <p className="text-xs text-gray-400">Sorted by best match</p>
                  </div>
                  {results.length > 0 && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">✓ Ready</span>
                  )}
                </div>

                {results.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <XCircle size={40} className="text-gray-300" />
                    <p className="text-gray-500 font-medium">No schemes matched your profile.</p>
                    <p className="text-sm text-gray-400">Try selecting "Any" funding type or a different industry.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3">
                  {results.map((scheme) => {
                    const match = matchLabel(scheme._score);
                    return (
                      <div key={scheme.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all hover:border-[#a8c0fd] bg-white group">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${match.bg} ${match.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${match.dot}`} />
                                {match.text}
                              </span>
                              <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{scheme.category}</span>
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm truncate">{scheme.name}</h4>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{scheme.organization}</p>
                            <div className="flex items-center gap-3 mt-2">
                              {scheme.maxFunding && (
                                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">Up to {scheme.maxFunding}</span>
                              )}
                              <span className="text-xs text-gray-400">{scheme.location || 'Pan India'}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => { onViewScheme(scheme); onClose(); }}
                            className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-[#1a5dfe] hover:text-[#0040cc] border border-[#a8c0fd] hover:border-[#1a5dfe] px-3 py-1.5 rounded-lg transition-all group-hover:bg-[#e8effe]">
                            View <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}