// Mock data for the entire application (replaces API calls for static deployment)
// In production, these would be fetched from the backend.

export const MOCK_STUDENT = {
    id: "student_001",
    name: "Srihari Beesetti",
    username: "srihari1806",
    avatar: null,
    college: "KIIT University, Bhubaneswar",
    branch: "CSE",
    graduationYear: 2027,
    cgpa: 8.4,
    bio: "Final year CSE student building scalable systems. Open to SDE and backend roles.",
    skills: ["JavaScript", "TypeScript", "Node.js", "React", "PostgreSQL", "Redis", "Docker", "Python", "DSA"],
    codingProfiles: {
        leetcode: "srihari1806",
        github: "Srihari1806",
        codeforces: null,
        hackerrank: "srihari1806",
    },
    readinessScore: 78,
    streak: 14,
    badges: ["Top 10%", "100 Days", "Open Source"],
    location: "Bhubaneswar, Odisha",
};

export const MOCK_CODING_STATS = {
    leetcode: {
        username: "srihari1806",
        totalSolved: 130,
        totalProblems: 3000,
        easy: { solved: 72, total: 346 },
        medium: { solved: 44, total: 476 },
        hard: { solved: 14, total: 254 },
        contestRating: 1642,
        globalRank: 84320,
        activeDays: 66,
        maxStreak: 36,
    },
    github: {
        username: "Srihari1806",
        publicRepos: 18,
        totalStars: 42,
        totalCommits: 782,
        topLanguages: [
            { name: "TypeScript", percent: 38 },
            { name: "JavaScript", percent: 28 },
            { name: "Python", percent: 18 },
            { name: "Go", percent: 8 },
            { name: "Other", percent: 8 },
        ],
    },
};

export const MOCK_HEATMAP: { date: string; count: number }[] = (() => {
    const cells: { date: string; count: number }[] = [];
    const now = new Date("2026-03-10");
    for (let i = 364; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const month = d.getMonth();
        // Simulate heavy activity in Jan-Mar 2026
        const base = month >= 0 && i <= 70 ? 3 : month === 11 || month === 10 ? 1 : 0;
        const rand = Math.random();
        const count = rand > 0.6 ? Math.floor(Math.random() * 6) + base : 0;
        cells.push({ date: dateStr, count: Math.min(count, 5) });
    }
    return cells;
})();

export const MOCK_JOBS = [
    {
        id: "job_001",
        company: "Razorpay",
        companyLogo: "R",
        companyColor: "#2D6EF5",
        role: "Backend Engineer Intern",
        location: "Bangalore",
        type: "Internship",
        remote: true,
        salary: "₹1.2L/month",
        minCgpa: 7.5,
        skills: ["Node.js", "PostgreSQL", "Redis", "System Design"],
        openings: 12,
        applicants: 4200,
        shortlistRatio: 0.003,
        interviewRounds: 3,
        matchScore: 88,
        missingSkills: ["System Design"],
        postedDays: 2,
        deadline: "2026-04-01",
    },
    {
        id: "job_002",
        company: "Google",
        companyLogo: "G",
        companyColor: "#34A853",
        role: "Software Engineer L3",
        location: "Hyderabad",
        type: "Full Time",
        remote: false,
        salary: "₹40-55 LPA",
        minCgpa: 8.0,
        skills: ["Data Structures", "Algorithms", "System Design", "Python"],
        openings: 35,
        applicants: 18500,
        shortlistRatio: 0.002,
        interviewRounds: 5,
        matchScore: 62,
        missingSkills: ["System Design", "Competitive Programming"],
        postedDays: 5,
        deadline: "2026-03-30",
    },
    {
        id: "job_003",
        company: "Zepto",
        companyLogo: "Z",
        companyColor: "#8B5CF6",
        role: "Full Stack Engineer",
        location: "Mumbai",
        type: "Full Time",
        remote: false,
        salary: "₹18-25 LPA",
        minCgpa: 7.0,
        skills: ["React", "Node.js", "TypeScript", "MongoDB"],
        openings: 20,
        applicants: 3100,
        shortlistRatio: 0.006,
        interviewRounds: 3,
        matchScore: 91,
        missingSkills: ["MongoDB"],
        postedDays: 1,
        deadline: "2026-04-15",
    },
    {
        id: "job_004",
        company: "Atlassian",
        companyLogo: "A",
        companyColor: "#0052CC",
        role: "SDE Intern",
        location: "Remote",
        type: "Internship",
        remote: true,
        salary: "₹80K/month",
        minCgpa: 8.0,
        skills: ["Java", "Microservices", "AWS", "REST APIs"],
        openings: 8,
        applicants: 6700,
        shortlistRatio: 0.001,
        interviewRounds: 4,
        matchScore: 44,
        missingSkills: ["Java", "AWS", "Microservices"],
        postedDays: 7,
        deadline: "2026-03-25",
    },
    {
        id: "job_005",
        company: "CRED",
        companyLogo: "C",
        companyColor: "#1A1A2E",
        role: "Frontend Engineer",
        location: "Bangalore",
        type: "Full Time",
        remote: false,
        salary: "₹22-32 LPA",
        minCgpa: 7.5,
        skills: ["React", "TypeScript", "Performance Optimization", "Testing"],
        openings: 5,
        applicants: 2800,
        shortlistRatio: 0.002,
        interviewRounds: 4,
        matchScore: 85,
        missingSkills: ["Performance Optimization", "Testing"],
        postedDays: 3,
        deadline: "2026-04-10",
    },
];

export const MOCK_COLLEGES = [
    {
        id: "col_001",
        name: "KIIT University",
        location: "Bhubaneswar, Odisha",
        fees: "12 LPA (4 yr)",
        avgPackage: 8.4,
        topPackage: 64,
        placedPercent: 82,
        dnaScore: { placementReality: 78, internshipExposure: 85, roi: 72 },
        branches: ["CSE", "ECE", "EEE", "Civil", "Mechanical"],
        studentCount: 12000,
        tier: "Tier 2",
    },
    {
        id: "col_002",
        name: "IIT Bombay",
        location: "Mumbai, Maharashtra",
        fees: "8 LPA (4 yr)",
        avgPackage: 28.5,
        topPackage: 2.5,
        placedPercent: 97,
        dnaScore: { placementReality: 96, internshipExposure: 98, roi: 94 },
        branches: ["CSE", "EE", "ME", "ChemE", "Aerospace"],
        studentCount: 8500,
        tier: "IIT",
    },
    {
        id: "col_003",
        name: "NIT Trichy",
        location: "Tiruchirappalli, Tamil Nadu",
        fees: "5 LPA (4 yr)",
        avgPackage: 14.2,
        topPackage: 1.2,
        placedPercent: 91,
        dnaScore: { placementReality: 88, internshipExposure: 82, roi: 91 },
        branches: ["CSE", "ECE", "Civil", "Mech", "ICE"],
        studentCount: 6000,
        tier: "NIT",
    },
];

export const MOCK_ROADMAP_WEEKS = [
    {
        week: 1,
        title: "Data Structures Foundation",
        done: true,
        tasks: [
            { text: "Arrays, Strings, Hashing", done: true },
            { text: "Two Pointers & Sliding Window", done: true },
            { text: "LeetCode: 15 Easy problems", done: true },
        ],
    },
    {
        week: 2,
        title: "Recursion & Trees",
        done: true,
        tasks: [
            { text: "Binary Trees (traversal, LCA)", done: true },
            { text: "BST operations", done: true },
            { text: "LeetCode: 10 Medium problems", done: false },
        ],
    },
    {
        week: 3,
        title: "Graphs & Dynamic Programming",
        done: false,
        tasks: [
            { text: "BFS / DFS, Dijkstra", done: true },
            { text: "1D and 2D DP patterns", done: false },
            { text: "LeetCode: 10 Medium + 3 Hard", done: false },
        ],
    },
    {
        week: 4,
        title: "System Design Basics",
        done: false,
        tasks: [
            { text: "CAP theorem, SQL vs NoSQL", done: false },
            { text: "Design: URL Shortener", done: false },
            { text: "Load balancing concepts", done: false },
        ],
    },
    {
        week: 5,
        title: "Node.js Backend Project",
        done: false,
        tasks: [
            { text: "REST APIs with Express", done: false },
            { text: "Postgres + Prisma integration", done: false },
            { text: "Redis caching layer", done: false },
        ],
    },
    {
        week: 6,
        title: "Mock Interviews & Final Prep",
        done: false,
        tasks: [
            { text: "3 × Full mock interviews", done: false },
            { text: "Behavioural question preparation", done: false },
            { text: "Portfolio project – deploy HireMap", done: false },
        ],
    },
];

export const MOCK_FEED_POSTS = [
    {
        id: "p1",
        college: "KIIT University",
        type: "REALITY_CHECK",
        author: "Anonymous Senior",
        timeAgo: "2 hours ago",
        content: "Reality check on KIIT placements 2025: The '45 LPA' package shown in brochures is mostly equity vesting over 4 years. Base salary is around ₹14–18 LPA. That said, Microsoft, Amazon and Razorpay do come every year. If your DSA is solid (LC 200+ problems) you have a genuine shot.",
        helpful: 247,
        comments: 34,
        verified: false,
    },
    {
        id: "p2",
        college: "IIT Bombay",
        type: "PLACEMENT_UPDATE",
        author: "T&P Dept",
        timeAgo: "1 day ago",
        content: "Placement Season 2025-26 Update: 138 companies have registered so far. Google, Microsoft, Uber and Tower Research have already completed Day 1 drives. Average package stands at ₹28.5 LPA with median at ₹22 LPA.",
        helpful: 892,
        comments: 71,
        verified: true,
    },
    {
        id: "p3",
        college: "NIT Trichy",
        type: "STUDENT_EXP",
        author: "Priya Rajan",
        timeAgo: "3 days ago",
        content: "Got placed at Swiggy as a backend intern – CGPA 7.8, 130 LC problems, 2 solid projects. The process was: online test (DSA), then 2 technical rounds. They focused a lot on system design basics even for interns. Prepare OS + DBMS concepts.",
        helpful: 415,
        comments: 56,
        verified: false,
    },
];

export const MOCK_COMMUNITY_SERVERS = [
    { id: "s1", name: "Razorpay", initial: "R", color: "#2D6EF5", members: 1240, channels: ["hiring", "announcements", "ama", "off-topic"] },
    { id: "s2", name: "Zepto", initial: "Z", color: "#8B5CF6", members: 680, channels: ["internships", "hiring", "tech-talks"] },
    { id: "s3", name: "CRED", initial: "C", color: "#10b981", members: 890, channels: ["hiring", "design", "engineering"] },
    { id: "s4", name: "HireMap", initial: "H", color: "#6366f1", members: 4200, channels: ["general", "placements", "dsa-help", "projects", "off-topic"] },
];

export const MOCK_MESSAGES = [
    { id: "m1", author: "Arjun Kumar", role: "HR @ Razorpay", time: "10:32 AM", content: "We're actively hiring backend engineers. If you have solid Node.js + distributed systems experience, drop your HireMap profile link below!", avatar: "A" },
    { id: "m2", author: "Neha S.", role: "Student", time: "10:35 AM", content: "Hi! I have 1.5 years of Node.js experience and built a payment gateway project. Here's my profile: hiremap.io/neha-s", avatar: "N" },
    { id: "m3", author: "CTO @ Razorpay", role: "CTO", time: "10:41 AM", content: "Great – we've been looking for candidates familiar with high-throughput event systems. Feel free to ask any engineering questions here directly.", avatar: "C" },
    { id: "m4", author: "Rohan M.", role: "Student", time: "10:50 AM", content: "What tech stack does Razorpay backend use? I see Go and Java mentioned on blogs.", avatar: "R" },
    { id: "m5", author: "CTO @ Razorpay", role: "CTO", time: "10:52 AM", content: "Primarily Go for core payment services, Java for legacy systems, Node.js for APIs, Kafka for async messaging. Kubernetes on AWS infra.", avatar: "C" },
];

export const MOCK_ATS_RESULT = {
    atsScore: 84,
    missingKeywords: ["System Design", "Docker", "Kubernetes", "CI/CD"],
    strengths: [
        "Strong backend project portfolio",
        "Active GitHub (782 commits this year)",
        "DSA foundation (130 LC problems)",
        "Relevant tech stack for SDE roles",
    ],
    sections: {
        education: 95,
        skills: 88,
        projects: 82,
        experience: 64,
        formatting: 91,
    },
};

export const MOCK_PROGRESS_STATS = {
    skillsMastered: 9,
    jobsUnlocked: 14,
    roadmapsCompleted: 1,
    roadmapsInProgress: 2,
    weeklyStreak: 14,
    totalBadges: 3,
    subjectProgress: [
        { name: "Data Structures", percent: 68 },
        { name: "Algorithms", percent: 52 },
        { name: "System Design", percent: 23 },
        { name: "Operating Systems", percent: 41 },
        { name: "DBMS", percent: 60 },
        { name: "Networking", percent: 30 },
    ],
};
