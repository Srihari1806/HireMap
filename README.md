# HireMap – AI Talent Intelligence Platform

> **The only career platform students need.** AI resume builder, ATS checker, cover letter generator, career map, smart roadmaps and real-time job matching — all in one place.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-orange?style=for-the-badge&logo=github)](https://srihari1806.github.io/HireMap/)
[![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

---

## 🚀 What is HireMap?

HireMap is a full-stack AI career intelligence platform built for Indian engineering students. It replaces 6+ fragmented career tools with one seamless experience:

| Feature | Description |
|---|---|
| 🤖 **AI Resume Builder** | GPT-4 powered. 40+ ATS-friendly templates. Export to PDF |
| 📝 **AI Cover Letter** | Job-specific cover letters in 10 seconds |
| ✅ **ATS Resume Checker** | Score your resume, get instant keyword fixes |
| 🗺️ **Career Map** | Explore paths (SDE, ML, PM, DevOps), see match %, skill gap & roadmap |
| ⚡ **Smart Job Matching** | See your exact skill match % before applying |
| 📚 **Resume Examples** | Browse 1500+ resumes that got people hired at top companies |
| 🧭 **Smart Roadmaps** | Week-by-week prep plans tailored to your skill gap |
| 🏛️ **College DNA** | Unfiltered placement truth, ROI scores, and internship data |
| 👥 **Community** | Connect with peers, share tips, find collaborators |
| 🔐 **Auth** | Email/Password + Google + GitHub sign-in (localStorage-backed) |

---

## 🖥️ Live Demo

**🔗 [srihari1806.github.io/HireMap](https://srihari1806.github.io/HireMap/)**

> **Quick login:** Click **"Sign in with Google"** to instantly load the creator's full profile — Srihari Beesetti (KIIT CSE '27), with all coding stats, skills, and projects pre-loaded.

---

## ✨ Design System

| Token | Value |
|---|---|
| Primary | Coral `#ff6b4a` |
| Accent | Electric teal `#00e5c3` |
| Warn | Vivid amber `#ffb84d` |
| Background | Deep space `#080b12` |
| Heading font | Syne (Google Fonts) |
| Body font | DM Sans (Google Fonts) |

---

## 🏗️ Tech Stack

### Frontend
- **React 19** + **TypeScript 5** — Component framework
- **Vite 7** — Build tool & dev server
- **React Router v6** (HashRouter) — Client-side routing
- **Framer Motion** — All animations & page transitions
- **Tailwind CSS** + Custom CSS variables — Design system
- **Lucide React** — Icons
- **Zustand** + `localStorage` — State & persistence

### Backend _(in development)_
- **Node.js** + **Express** — REST API
- **PostgreSQL** + **Redis** — Database & caching
- **Sequelize** — ORM

---

## 📁 Project Structure

```
HireMap/
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── auth.tsx          # Auth context (email + OAuth)
│   │   │   ├── profileStore.ts   # Per-user localStorage profile store
│   │   │   ├── toast.tsx         # Toast notification system
│   │   │   ├── mockData.ts       # Static demo data
│   │   │   └── jobData.ts        # KIIT T&P placement data (2025-26)
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Landing page
│   │   │   ├── Auth.tsx          # Login / Signup
│   │   │   ├── Onboarding.tsx    # 5-step new user profile setup
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── Resume.tsx        # Resume Studio (Builder, Templates, ATS, Cover Letter)
│   │   │   ├── CareerMap.tsx     # Career path explorer + skill gap
│   │   │   ├── JobHub.tsx        # Job listings with KIIT T&P data
│   │   │   ├── CollegeHub.tsx    # College DNA explorer
│   │   │   ├── Profile.tsx       # Editable user profile
│   │   │   ├── Progress.tsx      # Learning progress tracker
│   │   │   └── Community.tsx     # Peer community
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx  # Sidebar + header shell
│   │   ├── App.tsx               # Routing + ProtectedRoute
│   │   ├── main.tsx              # Providers (Auth, Toast)
│   │   └── index.css             # Global design system & CSS variables
│   └── package.json
└── backend/
    ├── routes/                   # Express routes (jobs, colleges, auth)
    ├── models/                   # Sequelize models
    └── index.js
```

---

## 🔐 Authentication

Authentication is handled client-side via `localStorage` for this demo. In production this would connect to a real OAuth provider.

| Method | Behaviour |
|---|---|
| Email / Password | Stored hashed (btoa) per-user in localStorage |
| **Google** | Signs in as **sriharibeesetti@gmail.com** (creator's full profile) |
| GitHub | Creates a guest session |
| Sign Up | Stores new user → redirects to 5-step **Onboarding** |

---

## 👤 User Profiles

Each user's profile is stored independently in `localStorage` keyed by their user ID:

- **New users** → complete 5-step onboarding → profile saved → dashboard shows their own data
- **Google login** → instantly loads creator (Srihari's) full profile with all stats
- **Unonboarded users** → see Srihari's profile as an "Example Profile" demo with a "Build Mine →" CTA
- **Profile page** → fully editable (name, college, bio, skills, projects, career intent)

---

## 🚀 Running Locally

```bash
# Clone
git clone https://github.com/Srihari1806/HireMap.git
cd HireMap/frontend

# Install
npm install

# Dev server
npm run dev
# → http://localhost:5173/HireMap/
```

> No backend or API keys needed. The app runs fully offline using localStorage.

---

## 📦 Deployment

The frontend is deployed to **GitHub Pages** via GitHub Actions on every push to `main`.

```bash
# Build
npm run build

# Deploy (automatic via .github/workflows)
git push origin main
```

---

## 🗺️ Roadmap

- [ ] Real Google / GitHub OAuth (Firebase Auth)
- [ ] GPT-4 API integration for resume generation & cover letters
- [ ] PostgreSQL backend for persistent user data
- [ ] GitHub API integration for live commit stats
- [ ] LeetCode API for live problem-solving stats
- [ ] PDF export for resumes
- [ ] Mobile-responsive layout polish
- [ ] Company recruiter portal

---

## 👨‍💻 Creator

**Srihari Beesetti** — B.Tech CSE, KIIT University (Class of 2027)

- 🐙 GitHub: [@Srihari1806](https://github.com/Srihari1806)
- 💻 LeetCode: [srihari1806](https://leetcode.com/u/srihari1806)
- 📧 Email: sriharibeesetti@gmail.com

---

## 📄 License

MIT — feel free to fork, build on top, and share.
