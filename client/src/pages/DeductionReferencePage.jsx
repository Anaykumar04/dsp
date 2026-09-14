import React, { useState } from 'react';

const BD  = '#1a5dfe';   // blue dark
const YEL = '#fdcf00';   // yellow
const YBG = '#fff9cc';   // yellow bg
const YBR = '#fdcf00';   // yellow border
const BBG = '#e8effe';   // blue bg
const BBR = '#a8c0fd';   // blue border

// ── SVG Icons matching screenshots ──────────────────────────────
const FileIcon = ({ size = 16, color = BD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const EditIcon = ({ size = 16, color = BD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const CertIcon = ({ size = 16, color = BD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const TagIcon = ({ size = 16, color = BD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const ShieldIcon = ({ size = 16, color = BD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const SearchIcon = ({ size = 15, color = '#9ca3af' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const DollarIcon = ({ size = 18, color = YEL }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

// ── Nav items ────────────────────────────────────────────────────
const TABS = [
  { key: 'registration', label: 'Registration & Incorporation',  Icon: FileIcon  },
  { key: 'modification', label: 'Company Modifications',         Icon: EditIcon  },
  { key: 'certificates', label: 'Certificates & Documentation',  Icon: CertIcon  },
  { key: 'iso',          label: 'ISO & Standards',               Icon: TagIcon   },
  { key: 'government',   label: 'Government & Compliance',       Icon: ShieldIcon},
];

// ── Table data ───────────────────────────────────────────────────
const DATA = {
  registration: [
    { service: 'OPC / PVT LTD - INCORPORATION',                         minCharge: '12000/+GST',  govtFees: '-', bdm: '₹8,000.00',  remarks: 'with 2 director, 1 lakh authorized capital, one time name application' },
    { service: 'PUNJAB - Karnataka INCORPORATION',                      minCharge: '20000/+ GST', govtFees: '-', bdm: '₹15,000.00', remarks: 'with 2 director, 1 lakh authorized capital, one time name application' },
    { service: 'MADHYA PRADESH / KERALA / RAJASTHAN - INCORPORATION',   minCharge: '18000/+ GST', govtFees: '-', bdm: '₹13,000.00', remarks: 'with 2 director, 1 lakh authorized capital, one time name application' },
    { service: 'LLP INCORPORATION',                                     minCharge: '12000/+GST',  govtFees: '-', bdm: '₹8,000.00',  remarks: '-' },
    { service: 'SECTION - 8 COMPANY',                                  minCharge: '12000/+GST',  govtFees: '-', bdm: '₹8,000.00',  remarks: '-' },
    { service: 'Sole Proprietorship Registration',                      minCharge: '5000/- + GST',govtFees: '-', bdm: 'NO',         remarks: '-' },
    { service: 'NIDHI COMPANY Registration',                            minCharge: '30000/- + GST',govtFees:'Excluded', bdm: '-',   remarks: '-' },
    { service: 'Producer Company Registration',                         minCharge: '29000/- + GST',govtFees:'-', bdm: '-',          remarks: '-' },
    { service: 'Partnership Firm Registration',                         minCharge: '6999/- + GST',govtFees: '-', bdm: '-',          remarks: '-' },
  ],
  modification: [
    { service: 'Director Addition / Removal',    minCharge: '₹2,500 + GST', govtFees: 'As applicable',  bdm: '-', remarks: 'Per director' },
    { service: 'Company Name Change',            minCharge: '₹5,000 + GST', govtFees: 'As applicable',  bdm: '-', remarks: 'Includes MCA filing' },
    { service: 'Registered Office Change',       minCharge: '₹3,000 + GST', govtFees: 'As applicable',  bdm: '-', remarks: 'Within same state' },
    { service: 'Increase in Authorized Capital', minCharge: '₹4,000 + GST', govtFees: 'Stamp duty extra',bdm: '-', remarks: 'Based on capital increase' },
  ],
  certificates: [
    { service: 'DSC (Digital Signature Certificate)',    minCharge: '₹1,500 + GST', govtFees: '-',             bdm: '-', remarks: 'Per certificate, 2-year validity' },
    { service: 'DIN (Director Identification Number)',   minCharge: '₹1,000 + GST', govtFees: 'As applicable', bdm: '-', remarks: 'New DIN application' },
    { service: 'DIN KYC (Annual)',                       minCharge: '₹500 + GST',   govtFees: '-',             bdm: '-', remarks: 'Annual KYC update' },
    { service: 'ROC Annual Compliance',                  minCharge: '₹5,000 + GST', govtFees: 'As applicable', bdm: '-', remarks: 'Includes AOC-4 & MGT-7' },
  ],
  iso: [
    { service: 'ISO 9001 (Quality Management)',    minCharge: '₹8,000 + GST',  govtFees: '-',               bdm: '-', remarks: 'Consultation & documentation' },
    { service: 'ISO 14001 (Environmental)',        minCharge: '₹10,000 + GST', govtFees: '-',               bdm: '-', remarks: 'Consultation & documentation' },
    { service: 'ISO 27001 (Information Security)', minCharge: '₹12,000 + GST', govtFees: '-',               bdm: '-', remarks: 'Consultation & documentation' },
    { service: 'CE Marking',                       minCharge: '₹15,000 + GST', govtFees: 'Testing fees extra',bdm: '-', remarks: 'For export to European markets' },
  ],
  government: [
    { service: 'GST Registration',          minCharge: '₹2,000 + GST', govtFees: '-',           bdm: '-', remarks: 'New registration' },
    { service: 'MSME / Udyam Registration', minCharge: '₹1,500 + GST', govtFees: '-',           bdm: '-', remarks: 'Online registration' },
    { service: 'Startup India Recognition', minCharge: '₹3,000 + GST', govtFees: '-',           bdm: '-', remarks: 'DPIIT application' },
    { service: 'Trademark Registration',    minCharge: '₹5,000 + GST', govtFees: '₹4,500–9,000',bdm: '-', remarks: 'Per class, govt fees vary' },
    { service: 'Import Export Code (IEC)',  minCharge: '₹2,000 + GST', govtFees: '₹500',        bdm: '-', remarks: 'DGFT registration' },
  ],
};

// ── BDM cell color: yellow if has value, green if NO, gray if dash
const bdmColor = (val) => {
  if (val === 'NO') return '#16a34a';
  if (val === '-')  return '#9ca3af';
  return YEL; // amber for readability on white
};

export default function DeductionReferencePage() {
  const [active, setActive] = useState('registration');
  const [search, setSearch] = useState('');

  const activeTab = TABS.find(t => t.key === active);
  const rows = (DATA[active] || []).filter(r =>
    !search.trim() || r.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-transition">

      {/* Title */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-1" style={{ color: BD }}>Amount Deduction Reference</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          This document provides information on service charges, government fees, and BDM deductions for various services offered by Enego Group.
        </p>
      </div>

      {/* Two-column: sidebar + content */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* ── LEFT SIDEBAR NAV ── */}
        <div className="w-full lg:w-56 lg:flex-shrink-0">
          <div className="rounded-xl overflow-hidden bg-white" style={{ border: `1px solid ${BBR}` }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: BBR }}>
              <p className="text-sm font-bold" style={{ color: BD }}>Service Categories</p>
            </div>
            <div className="p-2 flex flex-col gap-0.5">
              {TABS.map(tab => {
                const isActive = tab.key === active;
                return (
                  <button
                    key={tab.key}
                    onClick={() => { setActive(tab.key); setSearch(''); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all"
                    style={isActive
                      ? { background: BBG, border: `1px solid ${BBR}` }
                      : { background: 'transparent', border: '1px solid transparent' }}
                  >
                    <tab.Icon size={15} color={isActive ? BD : '#6b7280'} />
                    <span className="text-sm leading-snug" style={{ color: isActive ? BD : '#374151', fontWeight: isActive ? 600 : 400 }}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Reference card */}
          <div className="rounded-xl p-4 mt-4 bg-white" style={{ border: `1px solid ${BBR}` }}>
            <p className="text-sm font-bold mb-3" style={{ color: BD }}>Quick Reference</p>
            <div className="flex flex-col gap-2.5 text-sm text-gray-600">
              <p><strong className="text-gray-800">Min. Charges:</strong> Base service fees excluding taxes</p>
              <p><strong className="text-gray-800">Govt. Fees:</strong> Mandatory government charges</p>
              <p><strong className="text-gray-800">BDM Deduction:</strong> Business Development Manager commission</p>
              <p><strong className="text-gray-800">GST:</strong> Applicable on all service charges at prevailing rates</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl overflow-hidden bg-white" style={{ border: `1px solid ${BBR}` }}>

            {/* Table header bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b" style={{ borderColor: BBR }}>
              <h3 className="text-sm font-bold" style={{ color: BD }}>
                {activeTab?.label} Services
              </h3>
              {/* Search */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search services..."
                  className="pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none"
                  style={{ border: `1px solid ${BBR}`, width: '100%', maxWidth: 200, color: '#374151' }}
                />
              </div>
            </div>

            {/* MOBILE: Cards */}
            <div className="block md:hidden">
              {rows.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-gray-400">No services found.</div>
              ) : rows.map((row, i) => (
                <div key={row.service + i} style={{ borderTop: `1px solid ${BBR}`, padding: '14px 16px', background: i % 2 === 0 ? '#fff' : '#f8faff' }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: BD }}>{row.service}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#9ca3af' }}>Min. Charges</p>
                      <p className="text-sm text-gray-600">{row.minCharge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#9ca3af' }}>Govt. Fees</p>
                      <p className="text-sm text-gray-600">{row.govtFees}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#9ca3af' }}>BDM Deduction</p>
                      <p className="text-sm font-bold" style={{ color: bdmColor(row.bdm) }}>{row.bdm}</p>
                    </div>
                    {row.remarks !== '-' && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#9ca3af' }}>Remarks</p>
                        <p className="text-xs text-gray-400">{row.remarks}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP: Grid table */}
            <div className="hidden md:block" style={{ overflowX: 'auto' }}>
              <div className="grid px-5 py-3 border-b" style={{ gridTemplateColumns: '2.5fr 1.3fr 1.2fr 1.2fr 1.5fr', gap: 12, borderColor: BBR, background: '#f8faff', minWidth: 600 }}>
                {['SERVICE', 'MIN. CHARGES', 'GOVT. FEES', 'BDM DEDUCTION', 'REMARKS'].map(h => (
                  <p key={h} className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#6b7280' }}>{h}</p>
                ))}
              </div>
              {rows.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-gray-400">No services found.</div>
              ) : rows.map((row, i) => (
                <div key={row.service + i} className="grid px-5 py-4" style={{ gridTemplateColumns: '2.5fr 1.3fr 1.2fr 1.2fr 1.5fr', gap: 12, borderTop: `1px solid ${BBR}`, background: '#fff', minWidth: 600 }}>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{row.service}</p>
                  <p className="text-sm text-gray-500 self-center">{row.minCharge}</p>
                  <p className="text-sm text-gray-500 self-center">{row.govtFees}</p>
                  <p className="text-sm font-bold self-center" style={{ color: bdmColor(row.bdm) }}>{row.bdm}</p>
                  <p className="text-xs text-gray-400 self-center leading-relaxed">{row.remarks}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Important Information */}
          <div className="rounded-xl p-4 mt-4 flex gap-3 items-start" style={{ background: YBG, border: `1px solid ${YBR}` }}>
            <div className="flex-shrink-0 mt-0.5">
              <DollarIcon size={18} color="#fdcf00" />
            </div>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: '#7a5e00' }}>Important Information</p>
              <p className="text-sm leading-relaxed" style={{ color: '#7a5e00' }}>
                All rates mentioned are subject to change. Government fees may vary based on current regulations.
                BDM deductions are calculated based on the final invoice amount excluding GST and government fees unless specified otherwise.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}