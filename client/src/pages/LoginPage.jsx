import React, { useState } from 'react';
import { ADMIN_CONFIG } from '../config/adminConfig';
import { authAPI, token } from '../api/client';

const { login: LOGIN, branding: BRAND, theme: THEME } = ADMIN_CONFIG;

export default function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await authAPI.login(email.trim().toLowerCase(), password);
      token.set(result.token);
      onLogin(result.user);
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.accent})` }} />

        <div className="px-8 pt-8 pb-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-40 h-16 overflow-hidden flex items-center justify-center">
              <img src={BRAND.logoPath} alt={BRAND.companyName}
                style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18)', display: 'block' }} />
            </div>
            <p className="text-xs text-center mt-1 font-medium tracking-wide" style={{ color: THEME.primary }}>
              {BRAND.tagline}
            </p>
            <div className="w-16 h-0.5 mt-4 mb-4 rounded-full" style={{ background: THEME.accent }} />
            <h1 className="text-2xl font-bold" style={{ color: THEME.primary }}>{LOGIN.welcomeTitle}</h1>
            <p className="text-sm text-gray-500 mt-1 text-center">{LOGIN.welcomeSubtitle}</p>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#f6f8fb] text-sm focus:outline-none"
                onFocus={e => e.target.style.borderColor = THEME.accent}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-[#f6f8fb] text-sm focus:outline-none"
                onFocus={e => e.target.style.borderColor = THEME.accent}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass
                  ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>



          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 text-xs font-medium px-3 py-2.5 rounded-lg border border-red-100 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button type="button" onClick={handleSubmit} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
            style={{ background: loading ? '#9ca3af' : `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryLight})` }}>
            {loading
              ? <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Signing in...</>
              : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>Sign In</>
            }
          </button>


          {/* Feature pills */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Product Analytics — blue */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{ borderColor: THEME.primary, background: '#eef2ff' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-500 text-center">Product<br/>Analytics</span>
            </div>
            {/* Success Metrics — yellow/accent */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{ borderColor: THEME.accent, background: '#fffbea' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={THEME.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-500 text-center">Success<br/>Metrics</span>
            </div>
            {/* Product Details — blue */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{ borderColor: THEME.primary, background: '#eef2ff' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-500 text-center">Product<br/>Details</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-5">{LOGIN.footerText}</p>
    </div>
  );
}