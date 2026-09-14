import React from 'react';

const BLUE_DARK = '#1a5dfe';
const YELLOW = '#fdcf00';
const YELLOW_LIGHT = '#fff9cc';
const YELLOW_BORDER = '#fdcf00';
const YELLOW_DARK = '#7a5e00';

/* ── Icons ── */
const CheckCircleIcon = ({ color = YELLOW }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M7 12.5l3.5 3.5 6-7" />
  </svg>
);

const CheckCircleTitleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M7 12.5l3.5 3.5 6-7" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ── Data ── */
const benefits = [
  {
    n: 1, yellow: false,
    title: 'Funding Support',
    desc: 'Start Up India Seed Funding, Govt. Grant Benefits, Crowd Funding, Angel Funding, Venture Capital, Govt. Funds, Business Incubators & Accelerators Funding.',
  },
  {
    n: 2, yellow: true,
    title: 'Tax Exemption under 80IAC',
    desc: 'Eligible start-ups can be exempted from paying income tax for 3 consecutive financial years out of their first ten years since incorporation.',
  },
  {
    n: 3, yellow: false,
    title: 'Easier Public Procurement Norms',
    desc: 'Exemption from Prior Experience/Turnover: The Government exempts Start-ups in the manufacturing sector from the criteria of "prior experience/turnover" without compromising on quality standards or technical parameters.\n\nEMD Exemption: DPIIT recognized start-ups have been exempted from submitting Earnest Money Deposit (EMD) or bid security while filling government tenders.',
  },
  {
    n: 4, yellow: true,
    title: 'Self-Certification in Labour & Environmental Laws',
    desc: "Start-ups shall be allowed to self-certify compliance for 9 Labour Laws and 3 Environmental Laws through a simple online procedure. No inspections will be conducted for a period of 5 years for labour laws.",
  },
  {
    n: 5, yellow: false,
    title: 'Startup Patent Application & IPR Application',
    desc: 'Fast-tracking of Startup Patent Applications and 80% rebate in filing patents. The government bears the entire fees of the facilitators for any number of patents, trademarks or designs that a Startup may file.',
  },
  {
    n: 6, yellow: true,
    title: 'Partnered Services',
    desc: 'Startup India has partnered with various corporate and organizations to provide free services for your startup and help you accelerate your growth.',
    partners: [
      { label: 'Cloud Services:', value: 'Amazon Web services, Digital Ocean, Caller Desk' },
      { label: 'Management Software:', value: 'ZOHO, Freshworks, Stackby' },
      { label: 'Legal Support:', value: 'Vakilsearch, Lawyered, Lexstart' },
      { label: 'Financial Services:', value: 'RBI, Gimbooks, Intuit' },
    ],
  },
];

const eligibility = [
  { label: 'Company Age', detail: 'Period of existence and operations should not be exceeding 10 years from the Date of Incorporation' },
  { label: 'Company Type', detail: 'Incorporated as a Private Limited Company, a Registered Partnership Firm or a Limited Liability Partnership' },
  { label: 'Annual Turnover', detail: 'Should have an annual turnover not exceeding Rs. 100 crore for any of the financial years since its Incorporation' },
  { label: 'Original Entity', detail: 'Entity should not have been formed by splitting up or reconstructing an already existing business' },
];

const ourServices = [
  'START-UP INDIA CERTIFICATE',
  'INCOME TAX EXEMPTION',
  'SEED FUNDING APPLICATION',
  'ISO CERTIFICATE',
  'UDYAM CERTIFICATE',
  'GeM REGISTRATION',
  'TReDS REGISTRATION',
  'NSIC CERTIFICATION',
  'ZED CERTIFICATION',
  'MSME & STARTUP LOANS',
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

export default function StartupIndiaPage() {
  return (
    <><style>{responsiveCSS}</style><div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8f9fc', color: '#222', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 16px' }}>

        {/* Header */}
        <h1 style={{ fontSize: 26, fontWeight: 800, color: BLUE_DARK, marginBottom: 12 }}>
          Startup India Benefits &amp; Schemes
        </h1>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 28 }}>
          Startup India is a flagship initiative of the Government of India, intended to build a strong ecosystem that is conducive for the growth of startup businesses, to drive sustainable economic growth and generate large scale employment opportunities.
        </p>

        {/* Two-column layout */}
        <div className="page-inner" style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* LEFT — Key Benefits */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: '28px 28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 20 }}>
                <CheckCircleTitleIcon />
                Key Benefits
              </div>

              {benefits.map((b) => (
                <div key={b.n} style={{
                  borderLeft: `3px solid ${b.yellow ? YELLOW : BLUE_DARK}`,
                  paddingLeft: 16,
                  marginBottom: 24,
                }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 8 }}>
                    {b.n}. {b.title}
                  </p>
                  {b.desc.split('\n\n').map((para, i) => (
                    <p key={i} style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: i < b.desc.split('\n\n').length - 1 ? 10 : 0 }}>
                      {para}
                    </p>
                  ))}
                  {b.partners && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginTop: 12 }}>
                      {b.partners.map((p) => (
                        <p key={p.label} style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                          <strong>{p.label}</strong> {p.value}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="page-sidebar" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Eligibility Criteria */}
            <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>
                Eligibility Criteria
              </div>
              {eligibility.map((e) => (
                <div key={e.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16, fontSize: 14, color: '#444', lineHeight: 1.65 }}>
                  <CheckCircleIcon />
                  <span><strong style={{ color: '#222' }}>{e.label}: </strong>{e.detail}</span>
                </div>
              ))}
            </div>

            {/* Our Services */}
            <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>
                Our Services
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ourServices.map((s, i) => (
                  <span key={s} style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '5px 12px', borderRadius: 999,
                    border: `1px solid ${i % 2 !== 0 ? YELLOW_BORDER : '#e0e7ef'}`,
                    background: i % 2 !== 0 ? YELLOW_LIGHT : '#f0f3f8',
                    color: i % 2 !== 0 ? YELLOW_DARK : BLUE_DARK,
                    cursor: 'pointer',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Service Fee */}
            <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
              <div style={{ background: '#f0f3f8', border: '1px solid #e0e7ef', borderRadius: 10, padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <InfoIcon />
                  <span style={{ fontSize: 15, fontWeight: 700, color: BLUE_DARK }}>Service Fee</span>
                </div>
                <p style={{ fontSize: 14, color: '#333', lineHeight: 1.65, marginBottom: 8 }}>
                  For this service we will charge you <strong>₹15,000 + 18% GST</strong>
                </p>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>
                  If in case, we are unable to deliver you the certificate of recognition, we will refund you the amount paid.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    </>
  );
}