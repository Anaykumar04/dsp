import React from 'react';
import {
  Building2, Calendar, Tag, DollarSign, Users, ExternalLink, Eye, Briefcase, Gift, CheckCircle
} from 'lucide-react';

const BLUE_DARK   = '#1a5dfe';
const BLUE_XL     = '#e8effe';
const BLUE_BORDER = '#a8c0fd';
const YELLOW_BG   = '#fff9cc';
const YELLOW_BORDER = '#fdcf00';
const YELLOW_TEXT = '#7a5e00';

export default function SchemeDetail({ scheme, onBack }) {
  if (!scheme) return null;

  return (
    <div className="page-transition">

      {/* ── One joined card: Banner + Benefits + Eligibility ── */}
      <div className="rounded-xl mb-5 overflow-hidden" style={{ border: `1px solid ${BLUE_BORDER}` }}>

        {/* Header bar — dark blue */}
        <div className="px-6 py-4 flex flex-wrap items-center gap-3" style={{ background: BLUE_DARK }}>
          <h2 className="text-xl font-bold text-white flex-1">{scheme.name}</h2>

          {/* Active badge */}
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: '#16a34a', color: '#fff' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
            Active
          </span>

          {/* Category badge — yellow */}
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
            style={{ background: YELLOW_BG, color: YELLOW_TEXT, border: `1px solid ${YELLOW_BORDER}` }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
              <rect x="1" y="1" width="4" height="4" rx="1"/><rect x="7" y="1" width="4" height="4" rx="1"/>
              <rect x="1" y="7" width="4" height="4" rx="1"/><rect x="7" y="7" width="4" height="4" rx="1"/>
            </svg>
            {scheme.category}
          </span>
        </div>

        {/* Detail grid — light blue */}
        <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-3 gap-6" style={{ background: BLUE_XL }}>

          <div className="flex gap-3">
            <Building2 size={16} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: BLUE_DARK }}>Organization</p>
              <p className="text-sm font-medium text-gray-800">{scheme.organization}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Calendar size={16} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: BLUE_DARK }}>Last Date</p>
              <p className="text-sm font-medium text-gray-800">{scheme.lastDate}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Tag size={16} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: BLUE_DARK }}>Type</p>
              <p className="text-sm font-medium text-gray-800">{scheme.type}</p>
            </div>
          </div>

          {/* Min Charge — yellow highlight */}
          <div className="flex gap-3">
            <DollarSign size={16} style={{ color: YELLOW_TEXT, marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: YELLOW_TEXT }}>Min Charge</p>
              <p className="text-sm font-bold" style={{ color: YELLOW_TEXT }}>{scheme.minCharge}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Users size={16} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: BLUE_DARK }}>Applicable For</p>
              <p className="text-sm font-medium text-gray-800 uppercase">{scheme.applicableFor}</p>
            </div>
          </div>

          {/* Portal Link */}
          <div className="flex flex-col justify-center">
            {scheme.portalLink && scheme.portalLink !== '#' ? (
              <a href={scheme.portalLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all w-fit"
                style={{ background: '#fff', color: BLUE_DARK, border: `1px solid ${BLUE_BORDER}` }}
                onMouseEnter={e => { e.currentTarget.style.background = BLUE_DARK; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = BLUE_DARK; }}
              >
                <ExternalLink size={13} />
                Portal Link
              </a>
            ) : (
              <span className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg w-fit"
                style={{ background: '#fff', color: '#9ca3af', border: '1px solid #e5e7eb', cursor: 'not-allowed' }}>
                <ExternalLink size={13} />
                Not Set
              </span>
            )}
          </div>
        </div>

        {/* ── Benefits + Eligibility ── */}
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e8effe] px-6 py-5" style={{ borderTop: `1px solid ${BLUE_BORDER}` }}>

          {/* Benefits */}
          <div className="pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2 mb-2.5">
              <Users size={14} style={{ color: YELLOW_TEXT }} />
              <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: YELLOW_TEXT }}>Benefits</h3>
            </div>
            <ul className="space-y-1.5">
              {scheme.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#fdcf00' }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 mb-2.5">
              <Users size={14} style={{ color: BLUE_DARK }} />
              <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: BLUE_DARK }}>Eligibility</h3>
            </div>
            <ul className="space-y-1.5 mb-4">
              {scheme.eligibility.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full inline-block" style={{ background: BLUE_DARK }} />
                  {e}
                </li>
              ))}
            </ul>
            {scheme.focusSectors && scheme.focusSectors.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={13} style={{ color: BLUE_DARK }} />
                  <h3 className="text-xs font-bold" style={{ color: BLUE_DARK }}>Focus Sectors</h3>
                </div>
                <ul className="space-y-1.5">
                  {scheme.focusSectors.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#a8c0fd' }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Company Types */}
        {scheme.companyTypes && scheme.companyTypes.length > 0 && (
          <div className="px-6 pb-4 flex flex-wrap gap-1.5 items-center" style={{ borderTop: `1px solid ${BLUE_BORDER}` }}>
            <span className="text-[10px] font-semibold uppercase tracking-wide mr-1 pt-3" style={{ color: BLUE_DARK }}>Company Types:</span>
            {scheme.companyTypes.map((c, i) => (
              <span key={i} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-3"
                style={{ background: BLUE_XL, color: BLUE_DARK, border: `1px solid ${BLUE_BORDER}` }}>
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* View count */}
      <div className="flex justify-end">
        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
          <Eye size={13} />
          <span>View count</span>
        </button>
      </div>
    </div>
  );
}