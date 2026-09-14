import React from 'react';

// ── Color tokens ────────────────────────────────────────────────
const C = {
  dark:    '#1a5dfe',
  yellow:  '#fdcf00',
  yBg:     '#fff9cc',
  yBorder: '#fdcf00',
  yText:   '#7a5e00',
  blueBg:  '#eff6ff',
  blueBdr: '#bfdbfe',
  red:     '#fdcf00',
  redBg:   '#fff9cc',
  redBdr:  '#fdcf00',
};

// ── SVG Icons (matching screenshots exactly) ────────────────────
const GlobeIcon = ({ size = 22, color = C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const TargetIcon = ({ size = 22, color = C.yellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const ShareIcon = ({ size = 22, color = C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const ChatIcon = ({ size = 22, color = C.yellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const BookmarkIcon = ({ size = 16, color = C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);
const BarChartIcon = ({ size = 16, color = C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const DownloadIcon = ({ size = 14, color = C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const ExternalLinkIcon = ({ size = 14, color = C.yellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const CheckCircleIcon = ({ size = 18, color = C.yellow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

// ── Reusable check row (red circle check like screenshots) ───────
const CheckRow = ({ text, bold, after }) => (
  <div className="flex items-start gap-2.5">
    <CheckCircleIcon size={17} color={C.yellow} />
    <p className="text-sm text-gray-700 leading-snug">
      {bold ? <><strong>{bold}</strong>{after}</> : text}
    </p>
  </div>
);

// ── Service card ─────────────────────────────────────────────────
const ServiceCard = ({ icon, title, desc, points, accent }) => {
  const bg     = accent ? C.yBg    : '#f8faff';
  const border = accent ? C.yBorder : C.blueBdr;
  const titClr = accent ? '#7a5e00' : C.dark;
  return (
    <div className="rounded-xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-shrink-0">{icon}</div>
        <h3 className="text-sm font-bold leading-snug" style={{ color: titClr }}>{title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-3 leading-relaxed">{desc}</p>
      <div className="flex flex-col gap-2">
        {points.map(pt => <CheckRow key={pt} text={pt} />)}
      </div>
    </div>
  );
};

// ── Process step number badge ────────────────────────────────────
const StepBadge = ({ n }) => {
  const colors = ['#1a5dfe', C.yellow, '#1a5dfe', C.yellow, '#1a5dfe'];
  return (
    <div style={{
      minWidth: 44, height: 44, borderRadius: '50%',
      background: colors[(n - 1) % colors.length],
      color: colors[(n - 1) % colors.length] === C.yellow ? C.dark : '#fff',
      fontWeight: 800, fontSize: 18,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>{n}</div>
  );
};

// ── Portfolio link row ───────────────────────────────────────────
const PortfolioLink = ({ label, href = '#', red }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-colors hover:bg-gray-50"
    style={{ border: `1px solid ${red ? C.yBorder : C.blueBdr}` }}>
    {red
      ? <ExternalLinkIcon size={15} color={C.yellow} />
      : <DownloadIcon size={15} color={C.dark} />}
    <span className="text-sm font-semibold" style={{ color: red ? '#7a5e00' : C.dark }}>{label}</span>
  </a>
);

// ════════════════════════════════════════════════════════════════
export default function DigitalMarketingPage() {
  return (
    <div className="page-transition">

      {/* Title */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.dark }}>Digital Marketing Services</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
          Boost your online presence and grow your business with our comprehensive digital marketing solutions.
          At Enego Group, we design customized strategies to help you reach your target audience, increase brand awareness, and drive conversions.
        </p>
      </div>

      {/* Two-column layout: main + sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── LEFT / MAIN ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* Services section header */}
          <div className="rounded-xl p-5 bg-white" style={{ border: `1px solid ${C.blueBdr}` }}>
            <div className="flex items-center gap-2 mb-4">
              <GlobeIcon size={20} color={C.dark} />
              <h3 className="text-base font-bold" style={{ color: C.dark }}>Our Digital Marketing Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ServiceCard
                icon={<GlobeIcon size={22} color={C.dark} />}
                title="Search Engine Optimization (SEO)"
                desc="Improve your website's visibility in search engine results and drive organic traffic"
                points={['On-page & Off-page optimization', 'Keyword research & targeting', 'Performance tracking & reporting']}
                accent={false}
              />
              <ServiceCard
                icon={<TargetIcon size={22} color={C.yellow} />}
                title="Pay-Per-Click (PPC) Advertising"
                desc="Drive targeted traffic and leads with strategic paid advertising campaigns"
                points={['Google Ads & Bing Ads management', 'Ad copywriting & creative design', 'Conversion tracking & optimization']}
                accent={true}
              />
              <ServiceCard
                icon={<ShareIcon size={22} color={C.dark} />}
                title="Social Media Marketing"
                desc="Build brand awareness and engage with your audience across social platforms"
                points={['Platform strategy & content creation', 'Community management & engagement', 'Social media advertising']}
                accent={false}
              />
              <ServiceCard
                icon={<ChatIcon size={22} color={C.yellow} />}
                title="WhatsApp Marketing"
                desc="Connect directly with your customers via WhatsApp Business solutions"
                points={['WhatsApp Business API setup', 'Campaign management & automation', 'WhatsApp Green Tick verification']}
                accent={true}
              />
            </div>
          </div>

          {/* WhatsApp Green Tick */}
          <div className="rounded-xl p-5 bg-white" style={{ border: `1px solid ${C.blueBdr}` }}>
            <div className="flex items-center gap-2 mb-4">
              <BookmarkIcon size={18} color={C.dark} />
              <h3 className="text-base font-bold" style={{ color: C.dark }}>WhatsApp Green Tick Verification</h3>
            </div>
            <div className="flex gap-5 items-start">
              {/* Green circle icon */}
              <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#dcfce7', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChatIcon size={44} color="#16a34a" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Establish trust and credibility with the official WhatsApp Green Tick verification. This badge confirms your business's
                  authenticity to customers, enhancing your professional image and boosting customer confidence.
                </p>
                <div className="flex flex-col gap-2">
                  <CheckRow text="Complete verification process management" />
                  <CheckRow text="Documentation & application assistance" />
                  <CheckRow text="WhatsApp Business API integration" />
                </div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="rounded-xl p-5 bg-white" style={{ border: `1px solid ${C.blueBdr}` }}>
            <div className="flex items-center gap-2 mb-5">
              <BarChartIcon size={18} color={C.dark} />
              <h3 className="text-base font-bold" style={{ color: C.dark }}>Our Digital Marketing Process</h3>
            </div>
            <div className="flex flex-col gap-5">
              {[
                { n: 1, title: 'Discovery & Analysis',      desc: 'We assess your current digital presence, analyze competitors, and identify opportunities for growth.' },
                { n: 2, title: 'Strategy Development',      desc: 'We create a customized digital marketing plan aligned with your business goals and target audience.' },
                { n: 3, title: 'Implementation',            desc: 'Our team executes the strategies across selected channels, creating compelling content and campaigns.' },
                { n: 4, title: 'Monitoring & Optimization', desc: 'We continuously track performance, make data-driven adjustments, and optimize for better results.' },
                { n: 5, title: 'Reporting & Analysis',      desc: 'Regular comprehensive reports show campaign performance, ROI, and insights for future planning.' },
              ].map(step => (
                <div key={step.n} className="flex items-start gap-4">
                  <StepBadge n={step.n} />
                  <div className="pt-1">
                    <p className="text-sm font-bold text-gray-800 mb-0.5">{step.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>{/* end main */}

        {/* ── RIGHT SIDEBAR ── */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 flex flex-col gap-4">

          {/* Our Portfolio */}
          <div className="rounded-xl p-5 bg-white" style={{ border: `1px solid ${C.blueBdr}` }}>
            <h3 className="text-base font-bold mb-1" style={{ color: C.dark }}>Our Portfolio</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Explore our work and see how we've helped businesses transform their digital presence and achieve measurable results.
            </p>
            <div className="flex flex-col gap-2">
              <PortfolioLink label="Digital Marketing Portfolio" />
              <PortfolioLink label="WhatsApp Marketing Portfolio" red />
              <PortfolioLink label="WhatsApp Green Tick Portfolio" />
              <PortfolioLink label="Behance Portfolio" red />
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="rounded-xl p-5 bg-white" style={{ border: `1px solid ${C.blueBdr}` }}>
            <h3 className="text-base font-bold mb-4" style={{ color: C.dark }}>Why Choose Us?</h3>
            <div className="flex flex-col gap-3">
              <CheckRow bold="Experienced Team: " after="Digital marketing experts with proven track record" />
              <CheckRow bold="Customized Strategies: " after="Tailored solutions for your specific business needs" />
              <CheckRow bold="Transparent Reporting: " after="Clear metrics and regular performance updates" />
              <CheckRow bold="Result-Driven: " after="Focus on ROI and measurable business growth" />
              <CheckRow bold="Comprehensive Services: " after="All digital marketing solutions under one roof" />
            </div>
          </div>

          {/* Refer a Lead */}
          <div className="rounded-xl p-5 bg-white" style={{ border: `1px solid ${C.blueBdr}` }}>
            <h3 className="text-base font-bold mb-2" style={{ color: C.dark }}>Refer a Lead</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Have a potential client who could benefit from our digital marketing services? Fill out our lead referral form.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-sm font-bold text-white mb-2 transition-opacity hover:opacity-90"
              style={{ background: C.dark }}>
              <ExternalLinkIcon size={14} color="#fff" />
              Submit Lead Referral
            </a>
            <button className="w-full py-2 text-sm font-semibold text-center transition-colors hover:bg-gray-50 rounded-lg"
              style={{ color: C.dark }}>
              Check lead status
            </button>
          </div>

        </div>{/* end sidebar */}
      </div>{/* end two-col */}
    </div>
  );
}