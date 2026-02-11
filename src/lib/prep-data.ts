export const roleRoadmaps: Record<string, { roadmapUrl: string; title: string; icon: string }> = {
    "frontend": { roadmapUrl: "https://roadmap.sh/frontend", title: "Frontend Developer", icon: "🎨" },
    "backend": { roadmapUrl: "https://roadmap.sh/backend", title: "Backend Developer", icon: "⚙️" },
    "fullstack": { roadmapUrl: "https://roadmap.sh/full-stack", title: "Full Stack Developer", icon: "🔗" },
    "devops": { roadmapUrl: "https://roadmap.sh/devops", title: "DevOps Engineer", icon: "🚀" },
    "android": { roadmapUrl: "https://roadmap.sh/android", title: "Android Developer", icon: "📱" },
    "ai-ml": { roadmapUrl: "https://roadmap.sh/ai-data-scientist", title: "AI / ML Engineer", icon: "🤖" },
    "data-science": { roadmapUrl: "https://roadmap.sh/ai-data-scientist", title: "Data Scientist", icon: "📊" },
    "cyber-security": { roadmapUrl: "https://roadmap.sh/cyber-security", title: "Cyber Security", icon: "🔒" },
    "qa": { roadmapUrl: "https://roadmap.sh/qa", title: "QA Engineer", icon: "✅" },
    "system-design": { roadmapUrl: "https://roadmap.sh/system-design", title: "System Design", icon: "🏗️" },
    "software-engineer": { roadmapUrl: "https://roadmap.sh/computer-science", title: "Software Engineer", icon: "💻" },
    "python": { roadmapUrl: "https://roadmap.sh/python", title: "Python Developer", icon: "🐍" },
    "java": { roadmapUrl: "https://roadmap.sh/java", title: "Java Developer", icon: "☕" },
    "react": { roadmapUrl: "https://roadmap.sh/react", title: "React Developer", icon: "⚛️" },
    "sql": { roadmapUrl: "https://roadmap.sh/sql", title: "SQL & Databases", icon: "🗄️" },
    "dsa": { roadmapUrl: "https://roadmap.sh/datastructures-and-algorithms", title: "DSA Preparation", icon: "🧮" },
};

export function getRoadmapForRole(role: string): { roadmapUrl: string; title: string; icon: string }[] {
    const r = role.toLowerCase();
    const matches: { roadmapUrl: string; title: string; icon: string }[] = [];
    matches.push(roleRoadmaps["dsa"]);
    if (r.includes("full stack") || r.includes("fullstack")) matches.push(roleRoadmaps["fullstack"]);
    else if (r.includes("frontend") || r.includes("front end") || r.includes("react") || r.includes("angular")) matches.push(roleRoadmaps["frontend"]);
    else if (r.includes("backend") || r.includes("back end") || r.includes("node") || r.includes("java") || r.includes("spring")) matches.push(roleRoadmaps["backend"]);
    if (r.includes("ai") || r.includes("ml") || r.includes("machine learning") || r.includes("deep learning")) matches.push(roleRoadmaps["ai-ml"]);
    if (r.includes("data scien") || r.includes("data analy") || r.includes("data engin")) matches.push(roleRoadmaps["data-science"]);
    if (r.includes("devops") || r.includes("infrastructure") || r.includes("cloud")) matches.push(roleRoadmaps["devops"]);
    if (r.includes("android") || r.includes("mobile") || r.includes("ios")) matches.push(roleRoadmaps["android"]);
    if (r.includes("cyber") || r.includes("security")) matches.push(roleRoadmaps["cyber-security"]);
    if (r.includes("qa") || r.includes("test") || r.includes("sdet") || r.includes("quality")) matches.push(roleRoadmaps["qa"]);
    if (r.includes("python")) matches.push(roleRoadmaps["python"]);
    if (r.includes("software") || r.includes("sde") || r.includes("swe") || r.includes("engineer") || r.includes("developer") || r.includes("coder")) {
        if (!matches.some(m => m.title.includes("Full Stack") || m.title.includes("Frontend") || m.title.includes("Backend"))) {
            matches.push(roleRoadmaps["software-engineer"]);
        }
    }
    matches.push(roleRoadmaps["system-design"]);
    return [...new Map(matches.map(m => [m.title, m])).values()];
}

export interface CompanyPrep {
    rounds: string[];
    topics: string[];
    leetcodePatterns: string[];
    striverSheetFocus: string[];
    tips: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    resources: { label: string; url: string }[];
}

const techCompanyPrep: CompanyPrep = {
    rounds: ["Online Assessment (DSA + MCQs)", "Technical Interview 1 (DSA)", "Technical Interview 2 (System Design / CS Fundamentals)", "HR / Managerial Round"],
    topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "System Design Basics", "OOPS Concepts", "DBMS", "OS", "CN"],
    leetcodePatterns: ["Two Pointers", "Sliding Window", "Binary Search", "BFS/DFS", "Dynamic Programming", "Greedy", "Stack/Queue"],
    striverSheetFocus: ["SDE Sheet - All 191 Problems", "Arrays (Easy + Medium)", "LinkedList", "Binary Trees & BST", "Graphs (BFS, DFS, Dijkstra)", "DP (1D, 2D, Subsequences)"],
    tips: ["Focus on Medium difficulty LeetCode problems", "Practice explaining your approach out loud", "Know time/space complexity of your solutions", "Build 2-3 strong projects with good README"],
    difficulty: "Hard",
    resources: [
        { label: "Striver's SDE Sheet", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" },
        { label: "Striver's A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
        { label: "LeetCode Top Interview 150", url: "https://leetcode.com/studyplan/top-interview-150/" },
        { label: "NeetCode 150", url: "https://neetcode.io/practice" },
    ],
};

const serviceCompanyPrep: CompanyPrep = {
    rounds: ["Online Assessment (Aptitude + Coding)", "Technical Interview (DSA + CS Fundamentals)", "HR Round"],
    topics: ["Arrays & Strings", "Basic Data Structures", "SQL Queries", "OOPS", "DBMS Normalization", "OS Basics", "Aptitude & Logical Reasoning"],
    leetcodePatterns: ["Arrays", "Strings", "Sorting", "Searching", "Basic DP", "Hashing"],
    striverSheetFocus: ["SDE Sheet - Arrays Section", "Strings (Easy)", "Basic Sorting Algorithms", "Binary Search (Easy)", "Basic SQL Practice"],
    tips: ["Focus on Easy-Medium LeetCode problems", "Practice aptitude questions daily", "Know SQL joins and queries well", "Prepare 'Tell me about yourself' thoroughly"],
    difficulty: "Easy",
    resources: [
        { label: "Striver's A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
        { label: "LeetCode Easy Collection", url: "https://leetcode.com/explore/interview/card/top-interview-questions-easy/" },
        { label: "GFG Must Do Questions", url: "https://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/" },
        { label: "IndiaBix Aptitude", url: "https://www.indiabix.com/" },
    ],
};

const productCompanyPrep: CompanyPrep = {
    rounds: ["Online Assessment (2-3 DSA Questions)", "Technical Interview 1 (DSA + Problem Solving)", "Technical Interview 2 (LLD/HLD)", "Hiring Manager / Culture Fit"],
    topics: ["Advanced DSA", "System Design (LLD + HLD)", "CS Fundamentals", "Project Deep Dive", "Behavioral Questions (STAR Method)"],
    leetcodePatterns: ["Two Pointers", "Sliding Window", "Binary Search Variants", "Graph Algorithms", "DP on Trees", "Trie", "Segment Tree", "Monotonic Stack"],
    striverSheetFocus: ["Complete SDE Sheet (191 Problems)", "DP Series (All 56 Problems)", "Graph Series (Complete)", "Binary Search (All Variants)", "Recursion & Backtracking"],
    tips: ["Solve 300+ LeetCode problems (focus on Medium-Hard)", "Learn System Design from scratch", "Practice mock interviews weekly", "Contribute to open source for strong profile"],
    difficulty: "Hard",
    resources: [
        { label: "Striver's SDE Sheet", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" },
        { label: "LeetCode Hard Problems", url: "https://leetcode.com/problemset/?difficulty=HARD" },
        { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
        { label: "NeetCode Roadmap", url: "https://neetcode.io/roadmap" },
    ],
};

const consultingCompanyPrep: CompanyPrep = {
    rounds: ["Online Assessment (Aptitude + Case Study)", "Group Discussion / Case Study", "Technical / Domain Interview", "HR / Partner Round"],
    topics: ["Business Case Studies", "Data Interpretation", "SQL & Excel", "Basic Coding", "Consulting Frameworks", "Market Sizing"],
    leetcodePatterns: ["Arrays (Easy)", "Strings (Easy)", "SQL Problems", "Basic Math"],
    striverSheetFocus: ["Arrays Easy Section", "String Manipulation", "Basic Problem Solving"],
    tips: ["Focus on case study frameworks (MECE, Porter's)", "Practice data interpretation daily", "Prepare industry knowledge", "Work on communication skills"],
    difficulty: "Medium",
    resources: [
        { label: "Case Interview Prep", url: "https://www.preplounge.com/en/case-interview-basics" },
        { label: "LeetCode SQL Study Plan", url: "https://leetcode.com/studyplan/top-sql-50/" },
        { label: "Victor Cheng - Case Interviews", url: "https://www.caseinterview.com/" },
    ],
};

const dataRolePrep: CompanyPrep = {
    rounds: ["Online Assessment (Python/SQL + Stats)", "Technical Interview (ML Concepts + Coding)", "Case Study / Take Home Assignment", "HR Round"],
    topics: ["Python & Pandas", "SQL Advanced", "Statistics & Probability", "ML Algorithms", "Feature Engineering", "A/B Testing", "Data Visualization"],
    leetcodePatterns: ["Arrays", "Hashing", "SQL Problems", "Math & Statistics"],
    striverSheetFocus: ["Arrays & Hashing Section", "Mathematics Section", "SQL Practice (HackerRank)"],
    tips: ["Build end-to-end ML projects with deployment", "Know sklearn, pandas, numpy inside out", "Practice SQL window functions", "Prepare a data science portfolio"],
    difficulty: "Medium",
    resources: [
        { label: "Striver's A2Z Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
        { label: "LeetCode Database Problems", url: "https://leetcode.com/problemset/database/" },
        { label: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
        { label: "StatQuest YouTube", url: "https://www.youtube.com/@statquest" },
    ],
};

export function getCompanyPrep(companyName: string, role: string): CompanyPrep {
    const name = companyName.toLowerCase();
    const r = role.toLowerCase();
    // Top product companies
    const topProduct = ["google", "microsoft", "amazon", "meta", "apple", "netflix", "uber", "nvidia",
        "cisco", "jp morgan", "morgan stanley", "booking", "meesho", "swiggy", "hike",
        "trilogy", "bny", "optum", "whatfix", "kickdrum", "yugabyte", "zscaler",
        "human resocia", "marvell", "ion group", "caterpillar", "algo university"];
    const consulting = ["deloitte", "kpmg", "ey", "pwc", "bain", "accenture", "cognizant", "capgemini",
        "mu sigma", "fractal", "tredence"];
    const dataRoles = ["data scien", "data analy", "data engin", "ml", "machine learning", "ai",
        "decision scientist", "deep learning"];

    if (dataRoles.some(d => r.includes(d))) return dataRolePrep;
    if (consulting.some(c => name.includes(c))) return consultingCompanyPrep;
    if (topProduct.some(c => name.includes(c))) return productCompanyPrep;

    const midTier = ["brillio", "epam", "philips", "chubb", "factset", "bnp paribas",
        "cme group", "dbs", "pine labs", "qualcomm", "samsung", "maersk",
        "rockwell", "highradius", "naehas", "playsimp", "maruti", "providence"];
    if (midTier.some(c => name.includes(c))) return { ...techCompanyPrep, difficulty: "Medium" };

    if (r.includes("trainee") || r.includes("get") || r.includes("associate")) return serviceCompanyPrep;

    return techCompanyPrep;
}

export const roleCategories = [
    { label: "All Roles", value: "" },
    { label: "SDE / Software Engineer", value: "software" },
    { label: "Full Stack Developer", value: "full stack" },
    { label: "Data Science / AI / ML", value: "data,ai,ml,machine" },
    { label: "Frontend / UI Developer", value: "frontend,front end,ui,react" },
    { label: "Backend Developer", value: "backend,back end,java,python,node" },
    { label: "DevOps / Cloud / Infra", value: "devops,cloud,infrastructure,sre" },
    { label: "QA / Testing / SDET", value: "qa,test,sdet,quality" },
    { label: "Business Analyst", value: "business analyst,business development,sales" },
    { label: "Marketing / Growth", value: "marketing,growth,content" },
    { label: "Trainee / GET", value: "trainee,get,graduate engineer" },
    { label: "Intern", value: "intern" },
    { label: "Consulting / Analyst", value: "consult,analyst" },
];
