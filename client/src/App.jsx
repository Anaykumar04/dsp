import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SchemesPage from './pages/SchemesPage.jsx';
import StartupPage from './pages/StartupPage.jsx';
import TaxPage from './pages/TaxPage.jsx';
import BenefitsPage from './pages/BenefitsPage.jsx';
import LoanPage from './pages/LoanPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import SeedFundPage from './pages/SeedFundPage.jsx';
import PvtLtdPage from './pages/PvtltdPage.jsx';
import LlpPage from './pages/LlpPage.jsx';
import DigitalMarketingPage from './pages/DigitalMarketingPage.jsx';
import DeductionReferencePage from './pages/DeductionReferencePage.jsx';
import { SCHEMES as INITIAL_SCHEMES } from './data/schemes.js';
import { ADMIN_CONFIG } from './config/adminConfig.js';
import { authAPI, schemesAPI, usersAPI, token } from './api/client';

function getPageInfo(activeCategory, activePage, liveScheme) {
  if (liveScheme)                   return { title: liveScheme.name,       subtitle: 'Success Toolkit' };
  if (activePage === 'ALL_SCHEMES') return { title: 'All Schemes',         subtitle: 'Success Toolkit' };
  if (activePage === 'ADMIN')       return { title: 'Admin Panel',         subtitle: 'Manage schemes & users' };
  if (activePage === 'STARTUP')     return { title: 'Start Up',            subtitle: 'Success Toolkit' };
  if (activePage === 'TAX')         return { title: 'Tax & Compliance',    subtitle: 'Success Toolkit' };
  if (activePage === 'LOAN')        return { title: 'Loan Schemes',        subtitle: 'Success Toolkit' };
  if (activePage === 'BENEFITS')    return { title: 'Benefits',            subtitle: 'Success Toolkit' };
  if (activePage === 'LLP')         return { title: 'LLP Registration',    subtitle: 'Success Toolkit' };
  if (activePage === 'PVTLTD')      return { title: 'Pvt Ltd Registration', subtitle: 'Success Toolkit' };
  if (activePage === 'DIGITAL_MARKETING') return { title: 'Digital Marketing', subtitle: 'Success Toolkit' };
  if (activePage === 'DEDUCTION_REF')     return { title: 'Amount Deduction Reference', subtitle: 'Success Toolkit' };
  if (activePage === 'SEED_FUND') return { title: 'Seed Fund', subtitle: 'Success Toolkit' };
  const catLabels = {
    ALL: 'Dashboard', GRANT: 'Grant', 'GRANT-DEBT-EQUITY': 'Grant Debt Equity',
    'DEBT EQUITY': 'Debt Equity', EQUITY: 'Equity', 'LOAN ONLY': 'Loan Only',
    'LOAN SUBSIDY': 'Loan Subsidy', CERTGEM: 'CertGem', DASHBOARD: 'Dashboard Schemes',
  };
  return { title: catLabels[activeCategory] || 'Dashboard', subtitle: 'Success Toolkit' };
}

export default function App() {
  const [user, setUser]                         = useState(null);
  const [activeCategory, setActiveCategory]     = useState('ALL');
  const [activePage, setActivePage]             = useState(null);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);
  const [sidebarOpen, setSidebarOpen]           = useState(false);

  const [schemes, setSchemes] = useState(INITIAL_SCHEMES);
  const [users, setUsers]     = useState([]);

  // Load schemes from DB on login
  useEffect(() => {
    if (!user) return;
    schemesAPI.list({ limit: 200 })
      .then(r => { if (r.data?.length) setSchemes(r.data); })
      .catch(() => {});
  }, [user]);

  // Load users from DB when admin logs in
  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    usersAPI.list()
      .then(r => { if (r.data) setUsers(r.data); })
      .catch(() => {});
  }, [user]);

  if (!user) return <LoginPage onLogin={setUser} />;

  const liveScheme = selectedSchemeId != null
    ? schemes.find(s => (s._id || s.id)?.toString() === selectedSchemeId?.toString()) || null
    : null;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat === 'ALL_SCHEMES' ? 'ALL' : cat);
    setActivePage(cat === 'ALL_SCHEMES' ? 'ALL_SCHEMES' : null);
    setSelectedSchemeId(null);
  };
  const handlePageChange = (page)   => { setActivePage(page); setSelectedSchemeId(null); };
  const handleViewScheme = (scheme) => { setSelectedSchemeId(scheme._id || scheme.id); setActivePage(null); };
  const handleBack       = ()       => setSelectedSchemeId(null);
  const handleLogout     = ()       => {
    authAPI.logout().catch(() => {});
    token.clear();
    setUser(null);
    setUsers([]);
  };
  const handleOpenAdmin  = ()       => { setActivePage('ADMIN'); setSelectedSchemeId(null); };

  const pageInfo = getPageInfo(activeCategory, activePage, liveScheme);

  const renderContent = () => {
    if (activePage === 'ADMIN')    return <AdminPanel currentUser={user} schemes={schemes} setSchemes={setSchemes} users={users} setUsers={setUsers} />;
    if (activePage === 'STARTUP')  return <StartupPage />;
    if (activePage === 'TAX')      return <TaxPage />;
    if (activePage === 'LOAN')     return <LoanPage onViewScheme={handleViewScheme} />;
    if (activePage === 'BENEFITS') return <BenefitsPage />;
    if (activePage === 'LLP')      return <LlpPage />;
    if (activePage === 'PVTLTD')   return <PvtLtdPage />;
    if (activePage === 'SEED_FUND') return <SeedFundPage />;
    if (activePage === 'DIGITAL_MARKETING') return <DigitalMarketingPage />;
    if (activePage === 'DEDUCTION_REF')     return <DeductionReferencePage />;
    if (activePage === 'ALL_SCHEMES') return (
      <SchemesPage
        activeCategory="ALL"
        onViewScheme={handleViewScheme}
        selectedScheme={liveScheme}
        onBack={handleBack}
        schemes={schemes}
      />
    );
    if (liveScheme) return (
      <SchemesPage
        activeCategory={activeCategory}
        onViewScheme={handleViewScheme}
        selectedScheme={liveScheme}
        onBack={handleBack}
        schemes={schemes}
      />
    );
    if (activeCategory === 'ALL') return (
      <SchemesPage
        activeCategory="ALL"
        onViewScheme={handleViewScheme}
        selectedScheme={null}
        onBack={handleBack}
        schemes={schemes}
      />
    );
    return (
      <SchemesPage
        activeCategory={activeCategory}
        onViewScheme={handleViewScheme}
        selectedScheme={null}
        onBack={handleBack}
        schemes={schemes}
      />
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        activePage={activePage}
        onPageChange={handlePageChange}
        isAdmin={user?.role === 'admin'}
        onOpenAdmin={handleOpenAdmin}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          pageTitle={pageInfo.title}
          pageSubtitle={pageInfo.subtitle}
          user={user}
          onLogout={handleLogout}
          onOpenAdmin={handleOpenAdmin}
          schemes={schemes}
          onViewScheme={handleViewScheme}
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}