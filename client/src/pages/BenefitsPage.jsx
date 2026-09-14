import React, { useState } from 'react';

const BENEFITS = [
  { id: 1,  desc: 'If your company is not older than 2 years then you can get a loan of up to ₹50 lakh on the lower rate of interest, as a debt finance - SISFS', category: 'SISFS' },
  { id: 2,  desc: 'If your company is not older than 2 years, you can receive a grant of up to ₹20 lakh for prototype development - SISFS.', category: 'SISFS' },
  { id: 3,  desc: 'If your company was established after March 2016, you won\'t have to pay any income tax for any 3 consecutive years out of the first 10 years under section 80 IAC - STARTUP INDIA.', category: 'STARTUP INDIA' },
  { id: 4,  desc: 'For the first 5 years, there will be no inspections related to 9 labor laws under the SHRAM SUVIDHA SCHEME - STARTUP INDIA.', category: 'SHRAM SUVIDHA SCHEME' },
  { id: 5,  desc: 'You will receive up to 80% subsidy on every trademark and patent filing for 10 years - STARTUP INDIA.', category: 'STARTUP INDIA' },
  { id: 6,  desc: 'You will receive a credit benefit of up to 8 lakhs for Digital Infrastructure (AWS, CRM, Zoho Accounting) - STARTUP INDIA.', category: 'STARTUP INDIA' },
  { id: 7,  desc: 'For the first 10 years, you won\'t have to pay EMD (Earnest Money Deposit) for Government tenders - STARTUP INDIA.', category: 'STARTUP INDIA' },
  { id: 8,  desc: 'In the first 10 years, lack of experience and turnover won\'t hinder you from bidding for Government tenders - STARTUP INDIA.', category: 'STARTUP INDIA' },
  { id: 9,  desc: 'You will get first priority in Government tenders for the first 10 years - STARTUP INDIA', category: 'STARTUP INDIA' },
  { id: 10, desc: 'You can supply your products or services to over 60,000 Indian Government departments - GeM.', category: 'GeM' },
  { id: 11, desc: 'Many MSME and Startup grants are available from different Government departments and Incubation centers, and you can also receive funding from them.', category: 'MSME' },
  { id: 12, desc: 'You can get a loan of up to ₹5 crores for your business without collateral along with subsidy benefits - MSME Loan.', category: 'MSME' },
  { id: 13, desc: 'If you are unable to get a business loan, you can avail a loan from NBFCs up to ₹1 crore without security.', category: 'Other' },
  { id: 14, desc: 'You can receive grants for business expansion up to ₹1.6 crores under Global Impact Grant.', category: 'Other' },
  { id: 15, desc: 'You can obtain finance based on purchase orders for supplying to your clients - Purchase Order Finance.', category: 'Other' },
  { id: 16, desc: 'If you supply to large companies, you can avail a bill discount of 90 days - TREDS.', category: 'Other' },
  { id: 17, desc: 'For larger financing needs, you can obtain venture capital ranging from ₹1.5 crores to ₹15 crores based on debt and equity - Venture Capital.', category: 'Other' },
  { id: 18, desc: 'If you have an agriculture-based startup idea, you can receive a grant of up to ₹25 lakhs under RKVY-RAFTAAR.', category: 'Other' },
  { id: 19, desc: 'If you want to start an agriculture business, you can get a loan of up to ₹2 crores at a 6%* effective interest rate without mortgage - NAIFF.', category: 'NAIFF' },
  { id: 20, desc: 'If you have a technology-based business, you can get a loan of up to ₹1 crores based on debt or equity - SSS.', category: 'Other' },
  { id: 21, desc: 'If you want to start a new service sector business, you can avail a loan of up to ₹20 lakhs with up to 35% capital subsidy - PMEGP.', category: 'PMEGP' },
  { id: 22, desc: 'If you want to start a new manufacturing business, you can avail a loan of up to ₹50 lakhs with up to 35% capital subsidy - PMEGP.', category: 'PMEGP' },
  { id: 23, desc: 'If you want to introduce new technology in your manufacturing business, you can receive a grant of ₹40 lakhs - MSME INNOVATION DESIGN.', category: 'MSME' },
  { id: 24, desc: 'You can receive a subsidy on the cost of certification up to 80% for obtaining ZED for your manufacturing unit.', category: 'Other' },
  { id: 25, desc: 'Avail up to a 45% discount on railway freight charges for product supply after obtaining ZED certification.', category: 'Other' },
  { id: 26, desc: 'Women-owned MSMEs are eligible for a 100% subsidy, applicable only to government fees.', category: 'MSME' },
  { id: 27, desc: 'Financial assistance is available for testing, management systems, or product certification, covering up to 75% of the total certification cost, with a maximum subsidy limit of Rs. 50,000.', category: 'Other' },
  { id: 28, desc: 'Receive up to 5.25 lakhs for stall and airfare when participating in international expos.', category: 'Other' },
  { id: 29, desc: 'For the first 5 years, there will be no inspections related to 3 environmental laws under STARTUP INDIA - SHRAM SUVIDHA SCHEME.', category: 'SHRAM SUVIDHA SCHEME' },
  { id: 30, desc: 'Just as we have increased our sales by 1000%, we can do the same for your company through Sales Support Services.', category: 'Other' },
  { id: 31, desc: 'If you want to sell your products and services through e-commerce, we can handle your listing and advertising.', category: 'Other' },
  { id: 32, desc: 'We have India\'s best digital marketing team, and we can handle digital marketing and promotion for your business as well.', category: 'Other' },
  { id: 33, desc: 'We can also get your business\'s WhatsApp account verified with a Green tick.', category: 'Other' },
  { id: 34, desc: 'We will create the most effective website to enhance your business.', category: 'Other' },
  { id: 35, desc: 'We will also design your LOGO, brochure, catalogue, and packaging.', category: 'Other' },
  { id: 36, desc: 'You can also obtain a D-U-N-S Number for your business for international identity purposes - D-U-N-S.', category: 'Other' },
  { id: 37, desc: 'After obtaining a D-U-N-S Number, you can register your business with international associations and embassies worldwide.', category: 'Other' },
  { id: 38, desc: 'If you want to export, we can guide you through the process of obtaining a Letter Of Credit.', category: 'Other' },
  { id: 39, desc: 'For textile business ventures, you can access a grant of up to ₹50 lakhs.', category: 'Other' },
  { id: 40, desc: 'If you belong to the SC, ST, or OBC categories, you can secure a loan of up to ₹15 crores at low interest rates.', category: 'Other' },
  { id: 41, desc: 'Under the GST Sahay Yojana, invoice-based financing is available up to ₹5 crores against a minimum turnover of ₹3 crores and up to ₹20 lakhs against a minimum turnover of ₹1 crore.', category: 'Other' },
  { id: 42, desc: 'In the dairy sector, you can get a loan covering 90% of the project cost at an effective interest rate of 6%*.', category: 'Other' },
  { id: 43, desc: 'A subsidy of up to 60% for solar rooftop installations is available for residential use.', category: 'Other' },
  { id: 44, desc: 'Under the GST Sahay Yojana, invoice-based financing is available up to ₹5 crores against a minimum turnover of ₹3 crores and up to ₹20 lakhs against a minimum turnover of ₹1 crore.', category: 'Other' },
];

const ALL_CATEGORIES = ['All', 'SISFS', 'STARTUP INDIA', 'SHRAM SUVIDHA SCHEME', 'GeM', 'MSME', 'NAIFF', 'PMEGP', 'Other'];


const responsiveCSS = `
  .ben-root { padding: 20px 16px !important; }
  .ben-toolbar { flex-wrap: wrap !important; }
  .ben-search { flex: 1 1 200px !important; width: auto !important; }
  @media (min-width: 640px) {
    .ben-root { padding: 32px 40px !important; }
    .ben-toolbar { flex-wrap: nowrap !important; }
    .ben-search { width: 280px !important; flex: none !important; }
  }
`;

export default function BenefitsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = BENEFITS.filter((b) => {
    const matchSearch =
      b.desc.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleExport = () => {
    let csv = 'Sr. No,Benefit Description,Category\n';
    filtered.forEach((b) => {
      csv += `${b.id},"${b.desc.replace(/"/g, '""')}",${b.category}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'benefits_schemes.csv';
    a.click();
  };

  return (
    <><style>{responsiveCSS}</style><div className="ben-root" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#f8fafc', minHeight: '100vh' }}>

      {/* Title */}
      <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1a5dfe', marginBottom: '24px' }}>
        Benefits &amp; Schemes
      </h2>

      {/* Search + Export */}
      <div className="ben-toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 14px', background: '#fff', width: '280px', flex: '1 1 200px' }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2} style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search benefits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#374151', width: '100%', background: 'transparent' }}
          />
        </div>
        <button
          onClick={handleExport}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 16px', background: '#fff', fontSize: '13px', color: '#374151', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export as Excel
        </button>
      </div>

      {/* Category filter pills — hidden but functional */}
      <div style={{ display: 'none' }}>
        {ALL_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#1a5dfe' }}>
            <tr>
              <th style={{ padding: '13px 20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'center', color: '#fff', width: '80px' }}>
                Sr. No
              </th>
              <th style={{ padding: '13px 20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'left', color: '#fff' }}>
                Benefit Description
              </th>
              <th style={{ padding: '13px 20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', textAlign: 'left', color: '#fff', width: '180px' }}>
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#1a5dfe', fontWeight: 600, textAlign: 'center', verticalAlign: 'top', width: '80px', borderBottom: '1px solid #f1f5f9' }}>
                  {b.id}
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#374151', lineHeight: 1.6, verticalAlign: 'top', borderBottom: '1px solid #f1f5f9' }}>
                  {b.desc}
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#374151', verticalAlign: 'top', width: '180px', borderBottom: '1px solid #f1f5f9' }}>
                  {b.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '13px', color: '#9ca3af' }}>
            No benefits match your search.
          </div>
        )}
      </div>
    </div>
    </>
  );
}