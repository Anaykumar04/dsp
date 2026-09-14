/**
 * ═══════════════════════════════════════════════════════════════
 *  SUCCESS TOOLKIT — ADMIN CONFIG
 *  Edit this file to update branding, login, and app settings.
 *  No code changes needed — just update values here.
 * ═══════════════════════════════════════════════════════════════
 */

export const ADMIN_CONFIG = {

  // ── BRANDING ────────────────────────────────────────────────
  branding: {
    appName: 'Success Toolkit',
    companyName: 'Success Toolkit',
    tagline: '',
    logoPath: '/logo.png',
    version: 'v1.0',
    totalSchemes: 105,
  },

  // ── LOGIN PAGE ───────────────────────────────────────────────
  login: {
    welcomeTitle: 'Welcome Back',
    welcomeSubtitle: 'Sign in to your Success Toolkit',
    showForgotPassword: true,
    footerText: '© 2025 Success Toolkit. All rights reserved.',

    // ── ADD / EDIT USERS HERE ────────────────────────────────
    // roles: 'admin' | 'user'
    // admin → can see Admin Panel (manage schemes, stats, users)
    // user  → read-only access to schemes & pages
    credentials: [
      { email: 'admin@successtoolkit.com', password: 'admin123', role: 'admin', name: 'Admin' },
      { email: 'user@successtoolkit.com', password: 'user123', role: 'user', name: 'User' },
    ],
  },

  // ── THEME COLORS ─────────────────────────────────────────────
  theme: {
    primary: '#1a5dfe',       // Deep navy blue
    primaryDark: '#1a5dfe',
    primaryLight: '#1a5dfe',
    accent: '#fdcf00',        // Golden yellow
    accentDark: '#fdcf00',
    accentLight: '#fdcf00',
  },

  // ── DASHBOARD STATS ─────────────────────────────────────────
  // Edit these to update the dashboard overview cards instantly
  dashboardStats: [
    { label: 'Total Schemes', value: 105, color: 'bg-blue-600', icon: '🗂️' },
    { label: 'Grant', value: 17, color: 'bg-green-600', icon: '🎁' },
    { label: 'Equity', value: 12, color: 'bg-purple-600', icon: '📈' },
    { label: 'Loan Only', value: 6, color: 'bg-orange-500', icon: '🏦' },
    { label: 'Loan Subsidy', value: 12, color: 'bg-amber-500', icon: '💰' },
    { label: 'Debt + Equity', value: 5, color: 'bg-sky-600', icon: '⚖️' },
    { label: 'Certifications', value: 3, color: 'bg-red-500', icon: '🏅' },
    { label: 'Grant+Debt+Eq', value: 1, color: 'bg-teal-600', icon: '✨' },
  ],

  // ── NAVBAR BUTTONS ──────────────────────────────────────────
  navbar: {
    showFundingOpportunities: true,
    showEligibilityChecker: true,
    fundingButtonLabel: 'Funding Opportunities',
    eligibilityButtonLabel: 'Eligibility Checker',
  },

  // ── SIDEBAR FOOTER ──────────────────────────────────────────
  sidebarFooter: {
    statusLabel: 'Success Toolkit',
    statusColor: 'bg-red-500',   // 'bg-green-500' for active, 'bg-red-500' for beta
    totalLabel: 'Total: 105',
  },
};
