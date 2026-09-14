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

const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M9 15l-3 6h12l-3-6" />
    <path d="M9 15h6" />
  </svg>
);

const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
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

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ── Sub-components ── */
const SectionTitle = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 18 }}>
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
const benefits = [
  { text: 'Separate Legal Entity',            yellow: false },
  { text: 'Limited Liability of Partners',    yellow: true  },
  { text: 'Recognition and better credibility', yellow: false },
  { text: 'Operational Flexibility',          yellow: true  },
  { text: 'Lower Compliance Requirement',     yellow: false },
];

const steps = [
  'Obtain DSC (Digital Signature Certificate)',
  'Reserve Your LLP Company Name',
  'Filing form For LLP',
  'Filing of LLP Agreement',
  'Incorporation Certificate',
];

const idealFor = [
  'Chartered Accountants',
  'Company Secretaries',
  'Management Consulting',
  'Recruiting Firms',
  'Professional Services',
  'Small & Medium Businesses',
];

const scopeItems = [
  '1 Digital Signature Certificate (If Both have DIN No. then 2 DSC)',
  '2 Director Identification Numbers',
  '1 Name Approval Application',
  'LLP Incorporation Certificate',
  'LLP Agreement',
  'Form 3',
  'PAN',
  'TAN',
];

/* ── Page ── */

const responsiveCSS = `
  .page-inner { flex-direction: column !important; padding: 20px 16px !important; }
  .page-sidebar { width: 100% !important; }
  .two-col-grid { grid-template-columns: 1fr !important; }
  @media (min-width: 900px) {
    .page-inner { flex-direction: row !important; padding: 32px 36px !important; }
    .page-sidebar { width: 340px !important; }
    .two-col-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

export default function LlpPage() {
  return (
    <><style>{responsiveCSS}</style><div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8f9fc', color: '#222', minHeight: '100vh' }}>
      <div className="page-inner" style={{ display: 'flex', gap: 28, maxWidth: 1400, margin: '0 auto', alignItems: 'flex-start' }}>

        {/* ── LEFT MAIN ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: BLUE_DARK, marginBottom: 12 }}>
            Limited Liability Partnership Registration (LLP)
          </h1>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 10 }}>
            LLP Registration in India has become an alternative form of business that provides the advantages of a Company and the flexibility of a Partnership firm into a single organization. This unique hybrid is suitable for setting up small, and medium-sized businesses. LLP is governed under the Limited Liability Partnership Act, 2008.
          </p>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>
            LLP Registration is a popular business formation among services and professional firms like Chartered Accountants, Company Secretaries, Management Consulting Businesses, Recruiting Firms, and other services-based businesses.
          </p>

          {/* Minimum Requirements */}
          <Card>
            <SectionTitle icon={<DocumentIcon />} title="Minimum Requirements" />
            {[
              { bold: '2 Designated Partners', rest: ' – 1 Person should be an Indian National and Indian Resident' },
              { bold: 'Registered Office in India', rest: '' },
            ].map((item) => (
              <div key={item.bold} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16, fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                <CheckCircleIcon />
                <span><strong>{item.bold}</strong>{item.rest}</span>
              </div>
            ))}
            <p style={{ fontSize: 14, color: '#555', fontWeight: 600, marginTop: 8 }}>
              Registering the Company with MCA takes around 25 to 30 working days.
            </p>
          </Card>

          {/* Benefits */}
          <Card>
            <SectionTitle icon={<PersonIcon />} title="Benefits of Limited Liability Partnership" />
            <div style={{ display: 'grid', gridTemplateColumns: 'var(--two-col, 1fr 1fr)', gap: '0 24px' }}>
              {benefits.map((b) => (
                <div key={b.text} style={{
                  borderLeft: `3px solid ${b.yellow ? YELLOW : BLUE_DARK}`,
                  padding: '10px 0 10px 14px',
                  marginBottom: 14,
                  fontSize: 14, color: '#333', fontWeight: 500,
                }}>
                  {b.text}
                </div>
              ))}
            </div>
          </Card>

          {/* LLP Registration Process */}
          <Card>
            <SectionTitle icon={<GridIcon />} title="LLP Registration Process" />
            <p style={{ fontSize: 15, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>
              How to Incorporate Limited Liability Partnership
            </p>
            {steps.map((step, i) => (
              <div key={step} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '10px 0',
                borderBottom: i < steps.length - 1 ? '1px solid #e8effe' : 'none',
              }}>
                <StepBadge n={i + 1} yellow={i % 2 !== 0} />
                <span style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </Card>

          {/* Ideal For These Businesses */}
          <Card>
            <SectionTitle icon={<UsersIcon />} title="Ideal For These Businesses" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {idealFor.map((item, i) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px', borderRadius: 8,
                  background: i % 2 === 0 ? '#e8effe' : YELLOW_LIGHT,
                  border: `1px solid ${i % 2 === 0 ? '#e0e7ef' : YELLOW_BORDER}`,
                }}>
                  <CheckCircleIcon color={i % 2 === 0 ? BLUE_DARK : YELLOW} />
                  <span style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="page-sidebar" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Scope of Work */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>Scope of Work</div>
            {scopeItems.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, fontSize: 14, color: '#444', lineHeight: 1.5 }}>
                <CheckCircleIcon />
                {item}
              </div>
            ))}
          </div>

          {/* Please Note */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ background: '#e8effe', border: '1px solid #e0e7ef', borderRadius: 10, padding: '18px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: BLUE_DARK, marginBottom: 10 }}>Please Note:</div>
              {[
                'GST registration is not included in our scope of work, that cost will be extra on the above Incorporation booking amount.',
                'If Director DIN (Director Identification Number) KYC has not been done then the KYC penalty will be extra on the above Incorporation booking amount.',
              ].map((note) => (
                <p key={note} style={{ fontSize: 13, color: '#555', lineHeight: 1.65, marginBottom: 8 }}>• {note}</p>
              ))}
            </div>
          </div>

          {/* Documents Required */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 10 }}>Documents Required</div>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, marginBottom: 16 }}>
              Kindly refer to the attached checklist for the required documents and details.
            </p>
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '12px 16px',
              background: '#e8effe', border: '1px solid #e0e7ef', borderRadius: 8,
              fontSize: 14, fontWeight: 700, color: BLUE_DARK, cursor: 'pointer',
            }}>
              <DownloadIcon />
              Download Document Checklist
            </button>
          </div>

          {/* Commercials */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>Commercials</div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: YELLOW_LIGHT, border: `1px solid ${YELLOW_BORDER}`,
              borderRadius: 8, padding: '12px 16px', marginBottom: 8,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>LLP Registration:</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: YELLOW_DARK }}>₹12,000/- + 18% GST</div>
            </div>
            <p style={{ fontSize: 12, color: '#888', paddingLeft: 2 }}>(Up to 2 directors)</p>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}