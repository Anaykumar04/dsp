import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

const TAG_STYLES = {
  hot:   'bg-orange-50 text-orange-600 border-orange-200',
  easy:  'bg-green-50 text-green-600 border-green-200',
  early: 'bg-purple-50 text-purple-600 border-purple-200',
  best:  'bg-yellow-50 text-yellow-600 border-yellow-300',
};
const TAG_LABELS = {
  hot:   '🔥 High Funding',
  easy:  '⚡ Easy Approval',
  early: '🌱 Early Stage',
  best:  '⭐ Best for You',
};

const CATEGORY_BADGE = {
  'GRANT':             'bg-[#fff9cc] text-[#7a5e00] border-[#fdcf00]',
  'GRANT-DEBT-EQUITY': 'bg-[#fff9cc] text-[#7a5e00] border-[#fdcf00]',
  'DEBT EQUITY':       'bg-[#e8effe] text-[#1a5dfe] border-[#a8c0fd]',
  'EQUITY':            'bg-[#e8effe] text-[#1a5dfe] border-[#a8c0fd]',
  'LOAN ONLY':         'bg-[#fff9cc] text-[#7a5e00] border-[#fdcf00]',
  'LOAN SUBSIDY':      'bg-[#fff9cc] text-[#7a5e00] border-[#fdcf00]',
  'CERTGEM':           'bg-[#e8effe] text-[#1a5dfe] border-[#a8c0fd]',
  'DASHBOARD':         'bg-[#e8effe] text-[#1a5dfe] border-[#a8c0fd]',
};

export default function SchemeCard({ scheme, onClick }) {
  return (
    <div
      className="scheme-card bg-white rounded-xl cursor-pointer overflow-hidden"
      onClick={() => onClick(scheme)}
    >
      {/* Top accent strip */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #1a5dfe 0%, #fdcf00 100%)' }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight flex-1">{scheme.name}</h3>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 uppercase tracking-wide ${CATEGORY_BADGE[scheme.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
            {scheme.category}
          </span>
        </div>

        {/* Org */}
        <p className="text-xs text-gray-400 mb-4 truncate">{scheme.organization}</p>

        {/* Funding amount — yellow highlight box */}
        <div className="rounded-lg px-3 py-2.5 mb-3 flex items-center justify-between" style={{ background: '#fff9cc', border: '1px solid #fdcf00' }}>
          <p className="text-[10px] font-semibold text-yellow-600 uppercase tracking-wide">Max Funding</p>
          <p className="text-base font-extrabold" style={{ color: '#7a5e00' }}>{scheme.maxFunding}</p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <MapPin size={12} className="text-gray-400" />
          <span>{scheme.applicableFor}</span>
        </div>

        {/* Tags */}
        {scheme.tags && scheme.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {scheme.tags.map(tag => (
              <span key={tag} className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${TAG_STYLES[tag]}`}>
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg py-2 transition-all group"
          style={{ background: '#1a5dfe', color: '#fff' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fdcf00'; e.currentTarget.style.color = '#1a5dfe'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#1a5dfe'; e.currentTarget.style.color = '#fff'; }}
        >
          View Details
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}