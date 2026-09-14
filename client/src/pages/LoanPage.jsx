import React, { useState } from 'react';

const SCHEMES = [
  { id: 'SISFS', fullForm: 'Startup India Seed Fund Scheme', maxLimit: 'Up to 20 lacs', interestRate: 'RBI Repo Rate', moratorium: 'Up to 12 Months', tenure: 'Approx 7 to 8 years', eligibility: 'Start up', pricing: '₹15k + GST', duration: '60 days', importantNote: '—', docsFromUs: 'Pitch deck, Financial projections', requiredDocs: 'Certificate of Incorporation, Company PAN, Director details, Contact information, Email ID' },
  { id: 'PMMY', fullForm: 'Prime Minister Mudra Yojana', maxLimit: 'Up to 10 Lakhs', interestRate: 'Approx 7%–11%', moratorium: 'No', tenure: 'Depends on loan type', eligibility: 'Anyone with MSME Certificate', pricing: '₹5k + GST', duration: '30 days', importantNote: 'MSME Certificate', docsFromUs: 'NA', requiredDocs: 'Aadhar Card, Pan Card, Client Name, Contact information, Email ID' },
  { id: 'CGTMSE', fullForm: 'Credit Guarantee Trust for Micro and Small Enterprises', maxLimit: 'Up to 5 CR Loan', interestRate: 'Approx 7%–11%', moratorium: 'No', tenure: 'Depends on loan type', eligibility: 'Any Company', pricing: '₹15k + GST', duration: '30 Days', importantNote: '—', docsFromUs: 'NA', requiredDocs: 'Aadhar Card, Pan Card, GST certificate, Client Name, Contact information, Email ID' },
  { id: 'PMEGP', fullForm: 'Prime Minister Employment Generation Programme', maxLimit: 'Service – Up to 20 Lakhs', interestRate: 'Approx 7%–11%', moratorium: 'Up to 1 year', tenure: 'Approx 5 to 7 years', eligibility: 'Anyone with Capital Subsidy', pricing: '₹15k + GST', duration: '45 days', importantNote: 'Capital Subsidy', docsFromUs: 'DPR (Detailed Project Report)', requiredDocs: 'Aadhar Card, Pan Card, Client Name, Contact number, Email ID' },
  { id: 'NAIFF', fullForm: 'National Agri Infra Financing Facility', maxLimit: 'Up to 2 CR Loan', interestRate: 'Approx 9% and above', moratorium: 'Up to 2 years', tenure: 'Approx 7 years', eligibility: 'FPOs', pricing: '₹20k + GST', duration: '60 days', importantNote: 'Only New FPOs', docsFromUs: 'DPR (Detailed Project Report)', requiredDocs: 'Aadhar, PAN, Director PAN, Partnership deed, CoI, MOA-AOA, Company PAN, GST, 1-yr bank statement, 1-yr ITR, Business proof' },
  { id: 'AHIDF', fullForm: 'Animal Husbandry Infrastructure Development Fund', maxLimit: '90% of the Project', interestRate: 'Approx 9% and above', moratorium: 'Up to 2 years', tenure: 'Approx 8 years', eligibility: 'FPOs', pricing: '—', duration: '—', importantNote: '—', docsFromUs: 'NA', requiredDocs: '—' },
  { id: 'PMFME', fullForm: 'PM Formalization of Micro Food Processing Enterprises', maxLimit: 'Credit-linked capital subsidy', interestRate: 'Depend on bank and NBFCs', moratorium: 'Depend on bank and NBFCs', tenure: 'Depend on bank and NBFCs', eligibility: 'Individuals / SHGs / FPOs', pricing: '—', duration: '—', importantNote: '—', docsFromUs: '—', requiredDocs: '—' },
  { id: 'NBFC', fullForm: 'Non-Banking Financial Companies', maxLimit: 'Up to 1 Crore', interestRate: 'Approx 8 to 15%', moratorium: 'No', tenure: 'Depends on loan type', eligibility: 'Business more than 2 years', pricing: 'No fees', duration: '10 days', importantNote: '—', docsFromUs: '—', requiredDocs: '—' },
];

const COLUMNS = [
  { key: 'id', label: 'Scheme' },
  { key: 'fullForm', label: 'Full Form' },
  { key: 'maxLimit', label: 'Max Limit' },
  { key: 'interestRate', label: 'Interest Rate' },
  { key: 'moratorium', label: 'Moratorium' },
  { key: 'tenure', label: 'Tenure' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'pricing', label: 'Our Fee' },
  { key: 'duration', label: 'Duration' },
  { key: 'importantNote', label: 'Important Note' },
  { key: 'docsFromUs', label: 'Docs from Us' },
  { key: 'requiredDocs', label: 'Required Docs' },
];

const ROWS = [
  { key: 'fullForm', label: 'Full Form' },
  { key: 'maxLimit', label: 'Max Limit' },
  { key: 'interestRate', label: 'Interest Rate' },
  { key: 'moratorium', label: 'Moratorium Period' },
  { key: 'tenure', label: 'Tenure' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'pricing', label: 'Our Fee' },
  { key: 'duration', label: 'Duration' },
  { key: 'importantNote', label: 'Important Note' },
  { key: 'docsFromUs', label: 'Docs from our side' },
  { key: 'requiredDocs', label: 'Required Documents' },
];

const NAVY = '#1a5dfe';

export default function LoanPage() {
  const [search, setSearch] = useState('');
  const [activeScheme, setActiveScheme] = useState(null);

  const filtered = SCHEMES.filter((s) =>
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.fullForm.toLowerCase().includes(search.toLowerCase()) ||
    s.eligibility.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    let csv = 'Field,' + filtered.map((s) => s.id).join(',') + '\n';
    ROWS.forEach((r) => {
      csv += [r.label, ...filtered.map((s) => `"${(s[r.key] || '—').replace(/\n/g, '; ')}"`)]
        .join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'loan_schemes.csv';
    a.click();
  };

  const scheme = activeScheme ? SCHEMES.find((s) => s.id === activeScheme) : null;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#f8fafc', padding: '16px', minHeight: '100vh', overflowX: 'hidden' }}>

      <h1 style={{ fontSize: '24px', fontWeight: 800, color: NAVY, marginBottom: '20px' }}>
        Loan Schemes Comparison
      </h1>

      {/* Search + Export */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 14px', background: '#fff', flex: '1 1 200px' }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2} style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search schemes..."
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
          Export
        </button>
      </div>

      {/* Detail card for selected scheme */}
      {scheme && (
        <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <div style={{ background: NAVY, padding: '12px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.1em', color: '#fdcf00' }}>{scheme.id}</span>
              <p style={{ fontSize: '12px', color: '#a8c0fd', marginTop: '2px' }}>{scheme.fullForm}</p>
            </div>
            <button onClick={() => setActiveScheme(null)} style={{ background: 'none', border: 'none', color: '#a8c0fd', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff' }}>
            {ROWS.map((r, i) => (
              <div key={r.key} style={{
                gridColumn: (r.key === 'requiredDocs' || r.key === 'docsFromUs') ? 'span 2' : undefined,
                background: i % 2 === 0 ? '#fff9cc' : '#fff',
                padding: '10px 16px',
                borderBottom: '1px solid #e5e7eb',
              }}>
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fdcf00', marginBottom: '4px' }}>{r.label}</p>
                <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.6 }}>{scheme[r.key] || '—'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table — always scrollable */}
      <div style={{ borderRadius: '10px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead>
            <tr style={{ background: NAVY }}>
              {COLUMNS.map((col, i) => (
                <th key={col.key} style={{
                  padding: '13px 16px',
                  textAlign: i === 0 ? 'center' : 'left',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr
                key={s.id}
                style={{ background: i % 2 === 0 ? '#fff9cc' : '#fff', cursor: 'pointer' }}
                onClick={() => setActiveScheme(activeScheme === s.id ? null : s.id)}
              >
                {COLUMNS.map((col, ci) => (
                  <td key={col.key} style={{
                    padding: '13px 16px',
                    fontSize: '13px',
                    color: col.key === 'id' ? NAVY : '#374151',
                    fontWeight: col.key === 'id' ? 700 : 400,
                    textAlign: ci === 0 ? 'center' : 'left',
                    verticalAlign: 'top',
                    lineHeight: 1.6,
                    borderBottom: '1px solid #f1f5f9',
                    borderLeft: ci === 0 ? 'none' : '1px solid #f1f5f9',
                  }}>
                    {s[col.key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '14px', color: '#9ca3af' }}>
          No schemes match your search.
        </div>
      )}
    </div>
  );
}