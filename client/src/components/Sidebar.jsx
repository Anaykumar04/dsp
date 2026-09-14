import React from 'react';
import { CATEGORIES } from '../data/schemes';
import { ADMIN_CONFIG } from '../config/adminConfig';
import { X } from 'lucide-react';
import {
  LayoutDashboard, Gift, TrendingUp, Layers, BarChart2,
  CreditCard, Tag, Award, Briefcase, Star, Rocket, Calculator, ShieldCheck, Building2, Megaphone, BookOpen,
} from 'lucide-react';

const { branding: BRAND, sidebarFooter: FOOTER } = ADMIN_CONFIG;

const ICONS = {
  ALL: LayoutDashboard, GRANT: Gift, 'GRANT-DEBT-EQUITY': Layers,
  'DEBT EQUITY': TrendingUp, EQUITY: BarChart2, 'LOAN ONLY': CreditCard,
  'LOAN SUBSIDY': Tag, CERTGEM: Award, LOAN: Briefcase, BENEFITS: Star,
  STARTUP: Rocket, TAX: Calculator,
  LLP: Building2, PVTLTD: Building2, DIGITAL_MARKETING: Megaphone, DEDUCTION_REF: BookOpen,
};

export default function Sidebar({ activeCategory, onCategoryChange, activePage, onPageChange, isAdmin, onOpenAdmin, isOpen, onClose }) {
  const schemeCategories = CATEGORIES.filter(c => !['STARTUP', 'TAX', 'BENEFITS', 'LOAN', 'DASHBOARD', 'LLP', 'PVTLTD', 'SEED_FUND', 'DIGITAL_MARKETING', 'DEDUCTION_REF'].includes(c.key));
  const otherItems = CATEGORIES.filter(c => ['LOAN', 'BENEFITS', 'STARTUP', 'TAX', 'LLP', 'SEED_FUND', 'PVTLTD', 'DIGITAL_MARKETING', 'DEDUCTION_REF'].includes(c.key));

  const handleOtherClick = (cat) => {
    if (cat.key === 'DASHBOARD') {
      onCategoryChange('DASHBOARD');
    } else {
      onPageChange(cat.key);
    }
    if (onClose) onClose();
  };

  const handleCategoryClick = (key) => {
    onCategoryChange(key);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto lg:min-w-[256px]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* ── Logo Section ── */}
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="flex flex-col items-center relative">
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="absolute right-0 top-0 p-1 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              <X size={18} />
            </button>

            {/* Logo */}
            <div
              className="w-full flex items-center justify-center"
              style={{ height: '52px', overflow: 'hidden' }}
            >
              <img
                src={BRAND.logoPath}
                alt={BRAND.companyName}
                style={{
                  height: '120px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  marginTop: '-6px',
                }}
              />
            </div>

            {/* Tagline */}
            <p className="text-[10px] text-gray-500 text-center mt-1.5 leading-tight font-medium">
              {BRAND.tagline}
            </p>
          </div>
        </div>

        {/* Products Label */}
        <div className="px-5 pt-4 pb-1">
          <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Products</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 pb-4 overflow-y-auto">
          {schemeCategories.map((cat) => {
            const Icon = ICONS[cat.key] || LayoutDashboard;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg mb-0.5 text-left transition-all group
                  ${isActive ? 'sidebar-item-active text-[#1a5dfe]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={isActive ? 'text-[#1a5dfe]' : 'text-gray-400 group-hover:text-gray-600'} />
                  <span className="text-[13px] font-medium">{cat.label}</span>
                </div>
                {cat.count > 0 && (
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                    ${isActive ? 'bg-[#1a5dfe] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="my-2 border-t border-gray-100" />

          {otherItems.map((cat) => {
            const Icon = ICONS[cat.key] || LayoutDashboard;
            const isActive = cat.key === 'DASHBOARD' ? activeCategory === 'DASHBOARD' : activePage === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleOtherClick(cat)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg mb-0.5 text-left transition-all group
                  ${isActive ? 'sidebar-item-active text-[#1a5dfe]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={isActive ? 'text-[#1a5dfe]' : 'text-gray-400 group-hover:text-gray-600'} />
                  <span className="text-[13px] font-medium">{cat.label}</span>
                </div>
                {cat.count > 0 && (
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                    ${isActive ? 'bg-[#1a5dfe] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Panel Button */}
        {isAdmin && (
          <div className="px-2 pb-2">
            <button
              onClick={() => { onOpenAdmin(); if (onClose) onClose(); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all group
                ${activePage === 'ADMIN' ? 'sidebar-item-active text-[#1a5dfe]' : 'text-[#1a5dfe] hover:bg-[#e8effe] hover:text-[#0040cc]'}`}
            >
              <ShieldCheck size={16} className={activePage === 'ADMIN' ? 'text-[#1a5dfe]' : 'text-[#1a5dfe] group-hover:text-[#1a5dfe]'} />
              <span className="text-[13px] font-semibold">Admin Panel</span>
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${FOOTER.statusColor}`}></span>
          <span className="text-[11px] text-gray-500 font-medium">{FOOTER.statusLabel} {BRAND.version}</span>
          <span className="ml-auto text-[11px] font-bold text-gray-700">{FOOTER.totalLabel}</span>
        </div>
      </aside>
    </>
  );
}
