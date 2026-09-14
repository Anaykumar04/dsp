import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, Building2, Calendar, Tag, DollarSign, Users, ExternalLink, X } from 'lucide-react';
import { SCHEMES as STATIC_SCHEMES, SECTORS, COMPANY_TYPES } from '../data/schemes';
import SchemeDetail from '../components/SchemeDetail';

const BLUE_DARK     = '#1a5dfe';
const BLUE_XL       = '#e8effe';
const BLUE_BORDER   = '#a8c0fd';
const YELLOW_BG     = '#fff9cc';
const YELLOW_BORDER = '#fdcf00';
const YELLOW_TEXT   = '#7a5e00';

/* ── Dropdown with checkboxes ── */
function FilterDropdown({ label, options, selected, onChange, single }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = single
    ? selected !== options[0]
    : selected.length > 0;

  const toggle = (opt) => {
    if (single) {
      onChange(opt);
      setOpen(false);
    } else {
      onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg bg-white cursor-pointer transition-all"
        style={{
          borderColor: isActive ? BLUE_DARK : '#d1d5db',
          color: isActive ? BLUE_DARK : '#374151',
          fontWeight: isActive ? 600 : 400,
        }}
      >
        <Filter size={11} style={{ color: isActive ? BLUE_DARK : '#6b7280' }} />
        <span>{label}{!single && selected.length > 0 ? ` (${selected.length})` : ''}</span>
        <ChevronDown size={11} style={{ color: '#9ca3af', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg z-50 min-w-[220px]"
          style={{ border: '1px solid #e5e7eb' }}>
          <p className="px-4 pt-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {single ? `Select ${label.toLowerCase()}` : `Select ${label.toLowerCase()}s`}
          </p>
          <div className="max-h-64 overflow-y-auto pb-2">
            {options.map(opt => {
              const checked = single ? selected === opt : selected.includes(opt);
              return (
                <label key={opt} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(opt)}
                    className="w-4 h-4 rounded border-gray-300 accent-[#1a5dfe] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 select-none">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Scheme Panel ── */
function SchemePanel({ scheme }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden mb-4" style={{ border: `1px solid ${BLUE_BORDER}` }}>
      <div className="px-6 py-4 flex flex-wrap items-center gap-3" style={{ background: BLUE_DARK }}>
        <h2 className="text-base font-bold text-white flex-1">{scheme.name}</h2>
        <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: '#16a34a', color: '#fff' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          {scheme.status || 'Active'}
        </span>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide"
          style={{ background: YELLOW_BG, color: YELLOW_TEXT, border: `1px solid ${YELLOW_BORDER}` }}>
          {scheme.category}
        </span>
      </div>

      <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-3 gap-5" style={{ background: BLUE_XL, borderBottom: `1px solid ${BLUE_BORDER}` }}>
        <div className="flex gap-2.5">
          <Building2 size={15} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: BLUE_DARK }}>Organization</p>
            <p className="text-xs font-medium text-gray-800">{scheme.organization}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Calendar size={15} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: BLUE_DARK }}>Last Date</p>
            <p className="text-xs font-medium text-gray-800">{scheme.lastDate}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Tag size={15} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: BLUE_DARK }}>Type</p>
            <p className="text-xs font-medium text-gray-800">{scheme.type}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <DollarSign size={15} style={{ color: YELLOW_TEXT, marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: YELLOW_TEXT }}>Min Charge</p>
            <p className="text-xs font-bold" style={{ color: YELLOW_TEXT }}>{scheme.minCharge}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Users size={15} style={{ color: BLUE_DARK, marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: BLUE_DARK }}>Applicable For</p>
            <p className="text-xs font-medium text-gray-800 uppercase">{scheme.applicableFor}</p>
          </div>
        </div>
        <div className="flex items-center">
          {scheme.portalLink && scheme.portalLink !== '#' ? (
            <a href={scheme.portalLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
              style={{ background: '#fff', color: BLUE_DARK, border: `1px solid ${BLUE_BORDER}` }}
              onMouseEnter={e => { e.currentTarget.style.background = BLUE_DARK; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = BLUE_DARK; }}
            >
              <ExternalLink size={12} /> Portal Link
            </a>
          ) : (
            <span className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#9ca3af', border: '1px solid #e5e7eb' }}>
              Portal Link
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e8effe] px-6 py-5">
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
  );
}

export default function SchemesPage({ activeCategory, onViewScheme, selectedScheme, onBack, schemes: liveSchemes }) {
  const SCHEMES = liveSchemes || STATIC_SCHEMES;
  const [search, setSearch]           = useState('');
  const [sectors, setSectors]         = useState([]);       // multi
  const [companyTypes, setCompanyTypes] = useState([]);     // multi
  const [status, setStatus]           = useState('All');    // single

  // Sector options — strip the "All Sectors" default if present
  const sectorOptions = SECTORS.filter(s => s !== 'All Sectors');
  const companyOptions = COMPANY_TYPES.filter(c => c !== 'All Types');
  const statusOptions  = ['All', 'Active', 'Inactive'];

  const filtered = useMemo(() => {
    return SCHEMES.filter(s => {
      if (activeCategory !== 'ALL') {
        const catKey = activeCategory.replace(/-/g, ' ');
        const schemeCat = s.category.replace(/-/g, ' ');
        if (schemeCat !== catKey && s.category !== activeCategory) return false;
      }
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.organization.toLowerCase().includes(search.toLowerCase()) &&
        !s.category.toLowerCase().includes(search.toLowerCase())) return false;
      if (sectors.length > 0 && !sectors.some(sec => s.focusSectors.some(fs => fs.toLowerCase().includes(sec.toLowerCase())))) return false;
      if (companyTypes.length > 0 && !companyTypes.some(ct => s.companyTypes.includes(ct))) return false;
      if (status !== 'All' && s.status !== status) return false;
      return true;
    });
  }, [activeCategory, search, sectors, companyTypes, status, SCHEMES]);

  // Active filter tags
  const activeTags = [
    ...sectors.map(s => ({ label: `Sector: ${s}`,       remove: () => setSectors(prev => prev.filter(x => x !== s)) })),
    ...companyTypes.map(c => ({ label: `Type: ${c}`,    remove: () => setCompanyTypes(prev => prev.filter(x => x !== c)) })),
    ...(status !== 'All' ? [{ label: `Status: ${status}`, remove: () => setStatus('All') }] : []),
  ];

  if (selectedScheme) return <SchemeDetail scheme={selectedScheme} onBack={onBack} />;

  return (
    <div className="page-transition">

      {/* Search + Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search grants by name, organization..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#1a5dfe] focus:ring-2 focus:ring-[#e8effe] text-gray-700 placeholder-gray-400"
          />
        </div>

        <FilterDropdown
          label="Sectors"
          options={sectorOptions}
          selected={sectors}
          onChange={setSectors}
          single={false}
        />
        <FilterDropdown
          label="Company Type"
          options={companyOptions}
          selected={companyTypes}
          onChange={setCompanyTypes}
          single={false}
        />
        <FilterDropdown
          label={`Status: ${status}`}
          options={statusOptions}
          selected={status}
          onChange={setStatus}
          single={true}
        />
      </div>

      {/* Active filter tags */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-gray-400 font-medium">Active filters:</span>
          {activeTags.map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0' }}>
              {tag.label}
              <button onClick={tag.remove} className="flex items-center justify-center hover:opacity-70 transition-opacity">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm font-medium">No schemes match your filters</p>
          <p className="text-xs mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        filtered.map(s => <SchemePanel key={s.id} scheme={s} />)
      )}
    </div>
  );
}