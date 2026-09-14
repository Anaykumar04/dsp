import React from 'react';

const BLUE_DARK = '#1a5dfe';
const YELLOW = '#fdcf00';
const YELLOW_LIGHT = '#fff9cc';
const YELLOW_BORDER = '#fdcf00';
const YELLOW_DARK = '#7a5e00';

const CheckCircleIcon = ({ color = YELLOW }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M7 12.5l3.5 3.5 6-7" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M9 15l-3 6h12l-3-6" />
    <path d="M9 15h6" />
  </svg>
);

const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

const SectionTitle = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 18 }}>
    {icon}
    {title}
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
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    {n}
  </div>
);

const scopeItems = [
  '2 Digital Signature Certificates',
  '2 Director Identification Numbers',
  '1 Name Approval Application',
  'Stamp duty on INR 1 Lakh Authorized Capital',
  'Company Incorporation using SPICe+',
  'Copy of e-MOA & e-AOA',
  'e-PAN & e-TAN',
  'ESIC Registration through SPICe Plus',
  'PF Registration through SPICe Plus',
];

const benefits = [
  { text: 'Separate Legal Entity', yellow: false },
  { text: 'Limited Liability', yellow: true },
  { text: 'Recognition and better credibility', yellow: false },
  { text: 'Uninterrupted Existence', yellow: true },
  { text: 'Fund Raising', yellow: false },
  { text: 'Free & Easy transferability of shares', yellow: true },
  { text: 'Owning Property', yellow: false },
];

const incorporationSteps = [
  'Obtain DSC (Digital Signature Certificate)',
  'Reserve Your Company Name',
  'Submission of MOA & AOA',
  "Get Company's Incorporation Certificate",
  "Get Company's PAN & TAN",
];

const pricing = [
  { label: 'Standard Registration:', amount: '₹10,000/- + 18% GST', note: '(Up to 2 directors) For all states except Kerala, Madhya Pradesh, Punjab', yellow: false },
  { label: 'Kerala Registration:', amount: '₹12,000/- + 18% GST', note: '(Up to 2 directors)', yellow: true },
  { label: 'Madhya Pradesh Registration:', amount: '₹16,000/- + 18% GST', note: '(Up to 2 directors)', yellow: false },
  { label: 'Punjab Registration:', amount: '₹18,000/- + 18% GST', note: '(Up to 2 directors)', yellow: true },
  { label: 'Additional Director:', amount: '₹2,500/- + GST', note: 'Per additional director', yellow: false },
];


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

export default function PvtLtdPage() {
  return (
    <><style>{responsiveCSS}</style><div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8f9fc', color: '#222', minHeight: '100vh' }}>
      <div className="page-inner" style={{ display: 'flex', gap: 28, maxWidth: 1400, margin: '0 auto', alignItems: 'flex-start' }}>

        {/* LEFT MAIN CONTENT */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: BLUE_DARK, marginBottom: 12 }}>
            Private Limited Company Registration
          </h1>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>
            Private Limited Company registration is a preferred way to start a business in India. It offers benefits like limited liability protection to founders, separate legal existence, better credibility, and ease in raising external funds. It is registered with the Ministry of Corporate Affairs (MCA) under the Companies Act, 2013.
          </p>

          {/* Minimum Requirements */}
          <Card>
            <SectionTitle icon={<DocumentIcon />} title="Minimum Requirements" />
            {[
              { bold: '2 Directors', rest: ' – 1 Person should be an Indian National and Indian Resident' },
              { bold: '2 Shareholders', rest: ' – The Directors can be shareholders' },
              { bold: 'Registered Office in India', rest: '' },
            ].map((item) => (
              <div key={item.bold} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16, fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                <CheckCircleIcon />
                <span><strong>{item.bold}</strong>{item.rest}</span>
              </div>
            ))}
            <p style={{ fontSize: 14, color: '#555', fontWeight: 600, marginTop: 16 }}>
              Registering the Company with MCA takes around 20 to 25 working days.
            </p>
          </Card>

          {/* Benefits */}
          <Card>
            <SectionTitle icon={<PersonIcon />} title="Benefits of Private Limited Company" />
            <div style={{ display: 'grid', gridTemplateColumns: 'var(--two-col, 1fr 1fr)', gap: '0 24px' }}>
              {benefits.map((b) => (
                <div key={b.text} style={{
                  borderLeft: `3px solid ${b.yellow ? YELLOW : BLUE_DARK}`,
                  padding: '10px 0 10px 14px',
                  marginBottom: 14,
                  fontSize: 14,
                  color: '#333',
                  fontWeight: 500,
                }}>
                  {b.text}
                </div>
              ))}
            </div>
          </Card>

          {/* Company Registration Process */}
          <Card>
            <SectionTitle icon={<GridIcon />} title="Company Registration Process" />

            <p style={{ fontSize: 15, fontWeight: 700, color: BLUE_DARK, marginBottom: 12 }}>
              How to start/form/make a Private Limited Company?
            </p>
            <ol style={{ listStyle: 'none', padding: 0, marginBottom: 20 }}>
              {['Selection of a suitable name', 'Application to concerned ROC', 'MOA & AOA', 'Filing of the Forms & Documents'].map((item, i) => (
                <li key={item} style={{ fontSize: 14, color: '#444', padding: '5px 0 5px 4px', lineHeight: 1.6 }}>
                  {i + 1}. {item}
                </li>
              ))}
            </ol>

            <p style={{ fontSize: 15, fontWeight: 700, color: BLUE_DARK, marginBottom: 12 }}>
              How to Incorporate a Private Limited Company
            </p>
            <div>
              {incorporationSteps.map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: i < incorporationSteps.length - 1 ? '1px solid #e8effe' : 'none' }}>
                  <StepBadge n={i + 1} yellow={i % 2 !== 0} />
                  <span style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* RIGHT SIDEBAR */}
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
                'GST registration is not included in our scope of work, that cost will be extra (₹5,000 + GST).',
                'If Director DIN KYC has not been done, the KYC penalty will be extra: ₹5,000 (Government fees) + ₹1,500 (Our Consultancy fees) + 18% GST.',
                'If more than 2 directors, ₹2,500 + GST will be extra per additional Director.',
                'For Punjab, Kerala and Madhya Pradesh Companies registration, minimum charges shall be extra than the normal charges.',
              ].map((note) => (
                <p key={note} style={{ fontSize: 13, color: '#555', lineHeight: 1.65, marginBottom: 8 }}>• {note}</p>
              ))}
            </div>
          </div>

          {/* Commercials */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>Commercials</div>
            {pricing.map((p) => (
              <div key={p.label}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: p.yellow ? YELLOW_LIGHT : '#e8effe',
                  borderRadius: 8, padding: '12px 16px', marginBottom: 4,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>{p.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: p.yellow ? YELLOW_DARK : BLUE_DARK }}>{p.amount}</div>
                </div>
                <p style={{ fontSize: 12, color: '#888', marginBottom: 12, marginTop: 2, paddingLeft: 2 }}>{p.note}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
    </>
  );
}