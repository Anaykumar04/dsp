import React from 'react';

const BLUE_DARK = '#1a5dfe';
const YELLOW = '#fdcf00';
const YELLOW_LIGHT = '#fff9cc';
const YELLOW_BORDER = '#fdcf00';
const YELLOW_DARK = '#7a5e00';

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const CheckCircleIcon = ({ color = BLUE_DARK }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M7 12.5l3.5 3.5 6-7"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE_DARK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="13" rx="2"/>
    <path d="M2 10h20"/>
  </svg>
);

const SectionTitle = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>
    {icon}
    {title}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: '28px 28px 24px', marginBottom: 20, ...style }}>
    {children}
  </div>
);

const EligibilityItem = ({ children, yellow }) => (
  <div style={{ borderLeft: `3px solid ${yellow ? YELLOW : BLUE_DARK}`, padding: '10px 0 10px 16px', marginBottom: 18, fontSize: 14, color: '#444', lineHeight: 1.7 }}>
    {children}
  </div>
);

const ServiceItem = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, fontSize: 14, color: '#444', lineHeight: 1.5 }}>
    <div style={{ flexShrink: 0, marginTop: 1 }}>
      <CheckCircleIcon color={YELLOW} />
    </div>
    {text}
  </div>
);

const StepBadge = ({ n, yellow }) => (
  <div style={{
    width: 28, height: 28, borderRadius: '50%',
    background: yellow ? YELLOW : BLUE_DARK,
    color: yellow ? BLUE_DARK : '#fff',
    fontWeight: 800, fontSize: 13,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, marginTop: 2
  }}>
    {n}
  </div>
);


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

export default function SeedFundPage() {
  const services = [
    'Assistance in document formulation',
    'Filling the application',
    'Re-submission as permitted under the Scheme',
    'Guidance/Assistance in negotiation with incubators',
    'Guidance/Assistance in monitoring and reporting',
    'Selection of incubation centres on client behalf',
    'Preparation of Pitch Deck and Financial models',
    'Data Room Services for SISFS application',
  ];

  const timelineSteps = [
    { n: 1, title: 'Agreement from legal team', desc: 'Agreement will be shared within 48 working hours post proper booking parked in CRM', yellow: false },
    { n: 2, title: 'Documentation', desc: 'Seed funding team will connect within 1 Week after Agreement is received', yellow: true },
    { n: 3, title: 'Pitch Deck & Financial Preparation', desc: 'Team will send documents within 1–2 Weeks after form submission', yellow: false },
    { n: 4, title: 'Application Submission', desc: 'Application will be submitted within 1 week after approval', yellow: true },
  ];

  return (
    <><style>{responsiveCSS}</style><div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8f9fc', color: '#222', minHeight: '100vh' }}>
      <div className="page-inner" style={{ display: 'flex', gap: 28, maxWidth: 1400, margin: '0 auto', alignItems: 'flex-start' }}>

        {/* LEFT MAIN CONTENT */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: BLUE_DARK, marginBottom: 12 }}>
            Startup India Seed Fund Scheme (SISFS)
          </h1>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>
            DPIIT has created Startup India Seed Fund Scheme (SISFS) with an outlay of INR 945 Crore to provide financial assistance to startups for Proof of Concept, prototype development, product trials, market entry, and commercialization. It will support an estimated 3,600 entrepreneurs through 300 incubators in the next 4 years.
          </p>

          {/* Objectives */}
          <Card>
            <SectionTitle icon={<TargetIcon />} title="Objectives of SISFS" />
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>
              Many innovative business ideas fail to take off due to the absence of critical capital required at an early stage for proof of concept, prototype development, product trials, market entry and commercialization. Seed Fund offered to such promising cases can have a multiplier effect in validation of business ideas of many startups, leading to employment generation.
            </p>
          </Card>

          {/* Eligibility Criteria */}
          <Card>
            <SectionTitle icon={<CheckCircleIcon />} title="Eligibility Criteria" />
            <EligibilityItem>
              A startup, recognized by DPIIT, incorporated not more than 2 years ago at the time of application. The startup must have a business idea to develop a product or a service with a market fit, viable commercialization, and scope of scaling.
            </EligibilityItem>
            <EligibilityItem yellow>
              The startup should be using technology in its core product or service, or business model, or distribution model, or methodology to solve the problem being targeted. Preference would be given to startups creating innovative solutions in sectors such as social impact, waste management, water management, financial inclusion, education, agriculture, food processing, biotechnology, healthcare, energy, mobility, defence, space, railways, oil and gas, textiles, etc.
            </EligibilityItem>
            <EligibilityItem>
              The Startup should not have received more than Rs 10 lakh of monetary support under any other Central or State Government scheme. This does not include prize money from competitions and grand challenges, subsidized working space, founder monthly allowance, access to labs, or access to prototyping facilities.
            </EligibilityItem>
            <EligibilityItem yellow>
              A startup applicant can avail seed support in the form of grant or debt/convertible debentures each once as per the guidelines of the scheme.
            </EligibilityItem>
          </Card>

          {/* Seed Fund Disbursement Options */}
          <Card>
            <SectionTitle icon={<CardIcon />} title="Seed Fund Disbursement Options" />

            <div style={{ border: '1px solid #e0e7ef', borderRadius: 10, padding: 20, background: '#f8f9fc' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: BLUE_DARK, marginBottom: 8 }}>Option 1: Grant for Validation</div>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>
                Up to Rs. 20 Lakhs as grant for validation of Proof of Concept, or prototype development, or product trials. The grant shall be disbursed in milestone-based installments. These milestones can be related to development of prototype, product testing, building a product ready for market launch, etc.
              </p>
            </div>

            <div style={{ textAlign: 'center', color: '#aaa', fontSize: 13, fontWeight: 600, padding: '16px 0', letterSpacing: 1 }}>OR</div>

            <div style={{ border: `1px solid ${YELLOW_BORDER}`, borderRadius: 10, padding: 20, background: YELLOW_LIGHT }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: YELLOW_DARK, marginBottom: 8 }}>Option 2: Investment for Market Entry</div>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>
                Up to Rs. 50 Lakhs of investment for market entry, commercialization, or scaling up through convertible debentures or debt or debt-linked instruments.
              </p>
            </div>

            <p style={{ fontSize: 14, fontWeight: 700, color: '#222', lineHeight: 1.7, marginTop: 20 }}>
              A startup applicant can avail seed support in the form of debt/convertible debentures each once as per the guidelines of the scheme.
            </p>
          </Card>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="page-sidebar" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Scope of Services */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>Scope of Our Services</div>
            {services.map((s) => <ServiceItem key={s} text={s} />)}
          </div>

          {/* Timeline */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>
              <ClockIcon />
              Timeline
            </div>
            {timelineSteps.map((step) => (
              <div key={step.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 18 }}>
                <StepBadge n={step.n} yellow={step.yellow} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#222', marginBottom: 3 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
            ))}
            <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic', lineHeight: 1.6, marginTop: 8 }}>
              Above mentioned timeline may vary due to unavoidable circumstances.<br />
              Final decision to granting the Fund will be done by incubators only.
            </p>
          </div>

          {/* Commercials */}
          <div style={{ background: '#fff', border: '1px solid #e0e7ef', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: BLUE_DARK, marginBottom: 16 }}>Commercials</div>
            <div style={{ background: '#f0f3f8', borderRadius: 10, padding: '18px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#222', marginBottom: 6 }}>Service Fee:</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: BLUE_DARK, marginBottom: 12 }}>₹40,000/- + 18% GST</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#444', lineHeight: 1.5, marginBottom: 8 }}>
                <span style={{ color: YELLOW, fontWeight: 700, flexShrink: 0 }}>›</span>
                50% advance with documents (Non-refundable)
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                <span style={{ color: YELLOW, fontWeight: 700, flexShrink: 0 }}>›</span>
                50% at the time of the EAC committee approval
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}