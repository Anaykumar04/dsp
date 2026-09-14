import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, LogOut, ShieldCheck, User, Menu } from 'lucide-react';
import { ADMIN_CONFIG } from '../config/adminConfig';
import EligibilityChecker    from './EligibilityChecker';
import FundingOpportunities  from './FundingOpportunities';
import NotificationsPanel    from './NotificationsPanel';

const { navbar: NAV, theme: THEME } = ADMIN_CONFIG;

export default function Navbar({ pageTitle, pageSubtitle, user, onLogout, onOpenAdmin, schemes, onViewScheme, onMenuToggle }) {
  const isAdmin  = user?.role === 'admin';
  const initials = user?.name ? user.name[0].toUpperCase() : 'U';

  const [dropOpen,        setDropOpen]        = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);
  const [showFunding,     setShowFunding]     = useState(false);

  const dropRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 h-14">

        {/* Left: hamburger (mobile) + page title */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Hamburger button — only visible on mobile */}
          <button
            onClick={onMenuToggle}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors lg:hidden flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold leading-tight truncate" style={{ color: '#1a5dfe' }}>{pageTitle}</h1>
            <p className="text-xs text-gray-400 hidden sm:block">{pageSubtitle}</p>
          </div>
        </div>

        {/* Right: action buttons + avatar */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">

          {/* Funding Opportunities button — hidden on very small screens */}
          {NAV.showFundingOpportunities && (
            <button
              onClick={() => setShowFunding(true)}
              className="hidden sm:flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#fdcf00' }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
              </svg>
              <span className="hidden md:inline">{NAV.fundingButtonLabel}</span>
              <span className="md:hidden">Funds</span>
            </button>
          )}

          {/* Funding button icon-only for xs */}
          {NAV.showFundingOpportunities && (
            <button
              onClick={() => setShowFunding(true)}
              className="sm:hidden p-1.5 rounded-md transition-all hover:opacity-90"
              style={{ background: '#fdcf00' }}
              aria-label="Funding Opportunities"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
              </svg>
            </button>
          )}

          {NAV.showEligibilityChecker && (
            <button
              onClick={() => setShowEligibility(true)}
              className="hidden sm:flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-all hover:opacity-90 active:scale-95 relative"
              style={{ background: THEME.primary }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z"/>
              </svg>
              <span className="hidden md:inline">{NAV.eligibilityButtonLabel}</span>
              <span className="md:hidden">Check</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          )}

          {/* Eligibility icon-only for xs */}
          {NAV.showEligibilityChecker && (
            <button
              onClick={() => setShowEligibility(true)}
              className="sm:hidden p-1.5 rounded-md transition-all hover:opacity-90 relative"
              style={{ background: THEME.primary }}
              aria-label="Eligibility Checker"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          )}

          {/* Help */}
          <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <HelpCircle size={16} />
          </button>

          {/* Bell / Notifications */}
          <NotificationsPanel />

          {/* Avatar + dropdown */}
          <div className="relative" ref={dropRef}>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer select-none transition-opacity hover:opacity-85"
              style={{ background: isAdmin ? THEME.primary : '#fdcf00' }}
              onClick={() => setDropOpen(d => !d)}>
              {initials}
            </div>

            {dropOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                <div className="px-3 py-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    {isAdmin
                      ? <ShieldCheck size={14} className="text-[#1a5dfe] flex-shrink-0" />
                      : <User size={14} className="text-amber-600 flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{user?.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={isAdmin
                      ? { background: '#e8effe', color: THEME.primary }
                      : { background: '#fff9cc', color: '#7a5e00' }}>
                    {isAdmin ? '🛡 Admin' : '👤 User'}
                  </span>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => { onOpenAdmin(); setDropOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#1a5dfe] hover:bg-[#e8effe] transition-colors font-medium">
                    <ShieldCheck size={14} />
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={() => { onLogout(); setDropOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      {showEligibility && (
        <EligibilityChecker
          schemes={schemes || []}
          onClose={() => setShowEligibility(false)}
          onViewScheme={(s) => { onViewScheme?.(s); setShowEligibility(false); }}
        />
      )}

      {showFunding && (
        <FundingOpportunities
          schemes={schemes || []}
          onClose={() => setShowFunding(false)}
          onViewScheme={(s) => { onViewScheme?.(s); setShowFunding(false); }}
        />
      )}
    </>
  );
}