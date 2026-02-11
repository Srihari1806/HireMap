# 📍 HireMap — Campus Placement Intelligence Hub

> AI-powered placement portal for campus recruitment. Track 180+ companies, check resume ATS scores, get interview prep guides, and map your career path.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?logo=framer)

---

## ✨ Features

### 🏠 Dashboard
- Bento grid with live stats: Total Companies, Avg Package, Highest CTC
- Package distribution chart and top hiring locations
- Searchable company cards with filters

### 🏢 Companies (Advanced)
- **184 companies** with full placement data
- 📅 **Month-wise date filter** — filter by notification month (Jul 2025, Aug 2025, etc.)
- 🏷️ **13 role category filters** — SDE, Full Stack, Data Science, DevOps, QA, etc.
- 📊 **CTC / CGPA / Location** filters
- 🔄 **Date sorting** — newest or oldest first
- 🗺️ **Roadmap.sh integration** — preparation paths for each role
- 📝 **Interview Prep Blog** per company — rounds, LeetCode patterns, Striver's Sheet focus, tips & resources

### 👤 Profile
- Personal info, social media connections (GitHub, LinkedIn, LeetCode, HackerRank, CodeForces, GfG, Twitter, Portfolio)
- Skills management with categories & proficiency levels
- Certificate tracking

### ✨ AI Match
- Paste resume → get ATS match score
- Strengths & gaps analysis
- Power project recommendations

### 📄 Resume ATS Checker
- Resume vs Job Description keyword matching
- ATS score calculation
- Optimization tips with sample JDs

### ⚡ TNP Admin
- Auto-parse placement text into structured data
- Manual entry form
- Entry management

### 📊 Analytics
- Package / CGPA / Role / Location distribution charts
- Top 10 packages leaderboard
- Animated bar charts

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Design | Glassmorphism, Deep Space dark mode |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Dashboard
│   ├── layout.tsx        # Root layout with sidebar
│   ├── companies/        # Companies with filters & prep guides
│   ├── profile/          # User profile
│   ├── match/            # AI Match
│   ├── resume/           # ATS Checker
│   ├── admin/            # TNP Admin
│   └── analytics/        # Analytics dashboard
├── components/
│   └── Sidebar.tsx       # Navigation sidebar
└── lib/
    ├── data.ts           # 184 company records
    ├── types.ts          # TypeScript interfaces
    ├── utils.ts          # Filter, sort, stats utilities
    └── prep-data.ts      # Interview prep & roadmap data
```

---

## 📄 License

MIT © 2026

---

Built with 📍 by [Srihari](https://github.com/Srihari1806)
