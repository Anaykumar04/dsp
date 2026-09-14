import React from 'react';

const BLUE_DARK = '#1a5dfe';
const YELLOW = '#fdcf00';
const YELLOW_LIGHT = '#fff9cc';
const YELLOW_BORDER = '#fdcf00';
const YELLOW_DARK = '#7a5e00';

/* ── Icons ── */
const CheckCircleIcon = ({ color = YELLOW }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M7 12.5l3.5 3.5 6-7" />
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CheckCircleTitleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M7 12.5l3.5 3.5 6-7" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={YELLOW_DARK} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ── Sub-components ── */
const SectionTitle = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>
    {icon}{title}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: '28px 28px 24px', marginBottom: 20, ...style }}>
    {children}
  </div>
);

const StepBadge = ({ n, yellow }) => (
  <div style={{
    width: 30, height: 30, borderRadius: '50%',
    background: yellow ? YELLOW : BLUE_DARK,
    color: yellow ? BLUE_DARK : '#fff',
    fontWeight: 800, fontSize: 13,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>{n}</div>
);

/* ── Data ── */
const boardMembers = [
  'Joint Secretary, Department for Promotion of Industry and Internal Trade, Convener',
  'Representative of Department of Biotechnology, Member',
  'Representative of Department of Science & Technology, Member',
];

const taxBenefits = [
  'Full deduction on profits and gains from business',
  'Applicable for 3 consecutive assessment years',
  'Must be a DPIIT recognized startup',
  'Eligible to choose any 3 years out of first 10 years',
];

const appSteps = [
  { title: 'Submit Required Documents', desc: 'Provide all necessary documents mentioned' },
  { title: 'Verification Process',      desc: 'Our team verifies and prepares your application' },
  { title: 'Submission to Board',       desc: 'Application submitted to the Inter-Ministerial Board' },
  { title: 'Board Review',              desc: 'Board evaluates and makes decision' },
];

const requiredDocs = [
  "MOA (for Pvt Ltd) or LLP Deed (for LLP) In Pdf File (sign n stamp of director on all pages)",
  "From date of incorporation to last financial year - Balance Sheet and P/L (sign n stamp on all pages of director) - CA certified",
  "Trading and Profit & Loss Account of Last 3 Years (The Profit and Loss Statement must be CA Certified)",
  "ITR (from date of incorporation to last Financial year) (ITR Form Acknowledgement)",
  "Start-up YouTube Video link (we'll guide and help you.)",
  "We need to prepare the Pitch deck from the details provided by your end, (we'll do the needful.)",
];

/* ── Page ── */

const responsiveCSS = `
  .page-inner { flex-direction: column !important; padding: 20px 16px !important; }
  .page-sidebar { width: 100% !important; }
  .two-col-grid { grid-template-columns: 1fr !important; }
  @media (min-width: 900px) {
    .page-inner { flex-direction: row !important; padding: 32px 36px !important; }
    .page-wrapper { padding: 32px 36px !important; }
    .page-sidebar { width: 340px !important; }
    .two-col-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

export default function TaxPage() {
  return (
    <><style>{responsiveCSS}</style><div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8f9fc', color: '#222', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 16px' }}>

        {/* Header */}
        <h1 style={{ fontSize: 26, fontWeight: 800, color: BLUE_DARK, marginBottom: 12 }}>
          Income Tax Exemption for Startups (Section 80-IAC)
        </h1>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 28 }}>
          The Inter-Ministerial Board setup by Department of Industrial Policy and Promotion validates Start-ups for granting tax related benefits, allowing eligible startups to get full deduction on profits and gains from business.
        </p>

        {/* Two-column layout */}
        <div className="page-inner" style={{ display: 'flex', gap: 28, alignItems: 'flex-start', marginBottom: 20 }}>

          {/* LEFT COLUMN */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

            {/* Inter-Ministerial Board Structure */}
            <Card>
              <SectionTitle icon={<UsersIcon />} title="Inter-Ministerial Board Structure" />
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 16 }}>
                The Inter-Ministerial Board setup by Department of Industrial Policy and Promotion validates Start-ups for granting tax related benefits. The Board comprises of the following members:
              </p>
              {boardMembers.map((m) => (
                <div key={m} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                  <CheckCircleIcon />
                  {m}
                </div>
              ))}
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <SectionTitle icon={<CheckCircleTitleIcon />} title="Eligibility Criteria" />
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 16 }}>
                A DIPP recognized Start-up shall be eligible to apply to the Inter-Ministerial Board for full deduction on the profits and gains from business. Provided the following conditions are fulfilled:
              </p>
              {/* Left-border condition block */}
              <div style={{ borderLeft: `3px solid ${BLUE_DARK}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7 }}>
                  A private limited company or a LLP (limited liability partnership)
                </p>
              </div>
              {/* Warning note */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                background: YELLOW_LIGHT, border: `1px solid ${YELLOW_BORDER}`,
                borderRadius: 10, padding: '14px 16px',
              }}>
                <WarningIcon />
                <p style={{ fontSize: 13, color: YELLOW_DARK, lineHeight: 1.65 }}>
                  <strong>Note:</strong> We will do the process only on behalf of you but not giving guarantee for approval from Government
                </p>
              </div>
            </Card>

            {/* Required Documents */}
            <Card style={{ marginBottom: 0 }}>
              <SectionTitle icon={<DocumentIcon />} title="Required Documents" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {requiredDocs.map((doc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <StepBadge n={i + 1} yellow={i % 2 !== 0} />
                    <p style={{ fontSize: 14, color: '#444', lineHeight: 1.65, paddingTop: 4 }}>{doc}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="page-sidebar" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Tax Benefits Summary */}
            <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>Tax Benefits Summary</div>
              {taxBenefits.map((b) => (
                <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, fontSize: 14, color: '#444', lineHeight: 1.55 }}>
                  <CheckCircleIcon />
                  {b}
                </div>
              ))}
            </div>

            {/* Application Process */}
            <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>Application Process</div>
              {appSteps.map((step, i) => (
                <div key={step.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < appSteps.length - 1 ? 18 : 0 }}>
                  <StepBadge n={i + 1} yellow={i % 2 !== 0} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#222', marginBottom: 3 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
    </>
  );
}