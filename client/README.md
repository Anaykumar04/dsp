# Enigoal Success Toolkit

A modern, production-ready React + Vite application for discovering and applying to government schemes, grants, loans, equity funding, and startup support programs.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit: http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
enigoal/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   ├── Sidebar.jsx      # Left sidebar with categories
│   │   ├── SchemeCard.jsx   # Scheme listing card
│   │   └── SchemeDetail.jsx # Full scheme detail view
│   ├── data/
│   │   └── schemes.js       # All 31 schemes data (expandable to 105)
│   ├── pages/
│   │   ├── Dashboard.jsx    # Overview dashboard
│   │   ├── SchemesPage.jsx  # Scheme listing + detail
│   │   ├── StartupPage.jsx  # Startup registration services
│   │   ├── TaxPage.jsx      # Tax & compliance services
│   │   ├── BenefitsPage.jsx # Additional benefits
│   │   └── LoanPage.jsx     # Loan schemes
│   ├── App.jsx              # Root component + routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Design
- **Theme**: White/light UI with navy blue accents
- **Font**: Inter
- **Scheme banner**: Dark navy gradient (matches reference UI)
- **Sidebar**: White with active state indicator (blue left border)

## 📦 Tech Stack
- React 18
- Vite 5
- Tailwind CSS 3
- Lucide React (icons)

## ➕ Adding More Schemes
Add scheme objects to `src/data/schemes.js` following the existing schema.
