// ============================================================
// KIIT PLACEMENT DATA 2025-26 — Converted from T&P CSV
// Source: KIIT University Training & Placement Department
// ============================================================

export type DataSource =
    | 'KIIT T&P'       // Official KIIT Training & Placement dept
    | 'Company Career' // Company's official careers page
    | 'LinkedIn'       // LinkedIn job posting
    | 'Internshala'    // Internshala platform
    | 'HireMap AI'     // AI-aggregated / verified

export interface Job {
    id: string;
    company: string;
    companyLogo: string;
    companyColor: string;
    role: string;
    location: string;
    type: 'Full Time' | 'Internship' | 'PPO';
    remote: boolean;
    stipend: string;
    ctc: string;
    duration: string;
    minCgpa: number;
    skills: string[];
    openings: number;
    applicants: number;
    shortlistRatio: number;
    interviewRounds: number;
    matchScore: number;
    missingSkills: string[];
    postedDate: string;
    deadline: string;
    source: DataSource;
    sourceUrl: string;
    verified: boolean;
    batch: string;
}

// Helper to pick a brand color from company name
const BRAND_COLORS: Record<string, string> = {
    'Google': '#34A853', 'Microsoft': '#00A4EF', 'Amazon': '#FF9900', 'Meta': '#0081FB',
    'Apple': '#555555', 'Netflix': '#E50914', 'Uber': '#000000', 'Airbnb': '#FF5A5F',
    'Razorpay': '#2D6EF5', 'Zepto': '#8B5CF6', 'CRED': '#1A1A2E', 'Swiggy': '#FC8019',
    'Zomato': '#CB202D', 'Meesho': '#F43397', 'Myntra': '#FF3F6C', 'Flipkart': '#2874F0',
    'Paytm': '#002970', 'PhonePe': '#5F259F', 'HDFC': '#004C8F', 'ICICI': '#F07900',
    'Infosys': '#007CC3', 'TCS': '#DF0024', 'Wipro': '#341C75', 'HCL': '#0076CE',
    'Cognizant': '#1565C0', 'Capgemini': '#0070AD', 'Accenture': '#A100FF',
    'Deloitte': '#86BC25', 'KPMG': '#00338D', 'PwC': '#D04A02', 'EY': '#FFE600',
    'IBM': '#1F70C1', 'Oracle': '#C74634', 'SAP': '#0FAAFF', 'Cisco': '#049FD9',
    'NVIDIA': '#76B900', 'Qualcomm': '#3253DC', 'Intel': '#0071C5', 'AMD': '#ED1C24',
    'JP Morgan': '#005EB8', 'Morgan Stanley': '#003B73', 'Goldman Sachs': '#6699FF',
    'BlackRock': '#000000', 'BNY': '#14518B', 'BNP Paribas': '#00965E',
    'Booking Holdings': '#003580', 'Philips': '#0B5ED7',
    'Samsung': '#1428A0', 'LG': '#A50034',
    'Tata': '#00A3E0', 'Mahindra': '#E32119', 'Bajaj': '#003A9B',
    'Hike': '#3DBBEE', 'Pine Labs': '#0A2544',
    'Factset': '#003A7A', 'ION Group': '#E34A00', 'CME Group': '#0C2E5C',
    'Trilogy': '#FF4D00', 'YugaByte': '#17A5E4',
};

function getBrandColor(company: string): string {
    for (const [key, color] of Object.entries(BRAND_COLORS)) {
        if (company.toLowerCase().includes(key.toLowerCase())) return color;
    }
    // Generate a consistent color from company name hash
    let hash = 0;
    for (let i = 0; i < company.length; i++) hash = company.charCodeAt(i) + ((hash << 5) - hash);
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 60%, 40%)`;
}

function getInitials(company: string): string {
    return company.split(/[\s&]/)[0][0].toUpperCase();
}

// Skill mapping by role type
function inferSkills(role: string): string[] {
    const r = role.toLowerCase();
    if (r.includes('full stack') || r.includes('sde') || r.includes('software develop')) {
        return ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'];
    } else if (r.includes('frontend')) {
        return ['React', 'TypeScript', 'CSS', 'HTML', 'Git'];
    } else if (r.includes('backend')) {
        return ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Docker'];
    } else if (r.includes('data science') || r.includes('ml') || r.includes('ai') || r.includes('machine learning')) {
        return ['Python', 'Machine Learning', 'Pandas', 'SQL', 'TensorFlow'];
    } else if (r.includes('data eng')) {
        return ['Python', 'SQL', 'ETL', 'Spark', 'Airflow'];
    } else if (r.includes('devops')) {
        return ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux'];
    } else if (r.includes('analyst') || r.includes('business')) {
        return ['SQL', 'Excel', 'Power BI', 'Python', 'Communication'];
    } else if (r.includes('product')) {
        return ['Product Thinking', 'SQL', 'Figma', 'Communication'];
    } else if (r.includes('sales') || r.includes('marketing')) {
        return ['CRM', 'Communication', 'Data Analysis', 'Excel'];
    } else if (r.includes('cloud') || r.includes('aws') || r.includes('azure')) {
        return ['AWS', 'Azure', 'Linux', 'Networking', 'DevOps'];
    } else if (r.includes('security') || r.includes('cyber')) {
        return ['Networking', 'Linux', 'Pen Testing', 'Security Protocols'];
    } else if (r.includes('android') || r.includes('ios') || r.includes('mobile')) {
        return ['Android', 'Kotlin', 'Swift', 'REST APIs', 'Git'];
    }
    return ['Problem Solving', 'Communication', 'Git', 'SQL'];
}

function parseCgpa(s: string): number {
    const n = parseFloat(s);
    return isNaN(n) ? 6.0 : n;
}


function getType(role: string, duration: string, stipend: string): 'Full Time' | 'Internship' | 'PPO' {
    const r = (role + duration).toLowerCase();
    if (r.includes('trainee') && !r.includes('intern')) return 'Full Time';
    if (r.includes('intern') || duration.includes('Month') || r.includes('apprentice')) return 'Internship';
    if (r.includes('ppo')) return 'PPO';
    if (stipend === '-' || stipend === 'Not Disclosed') return 'Full Time';
    return 'Internship';
}

// ============================================================
// RAW CSV DATA → Typed Job Objects
// ============================================================

interface RawRow {
    company: string;
    date: string;
    cgpa: string;
    role: string;
    stipend: string;
    duration: string;
    ctc: string;
    location: string;
}

const RAW: RawRow[] = [
    { company: 'Accenture', date: "11th Sept'2025", cgpa: '6', role: 'Associate Software Engineer / Advanced Application Engineer', stipend: '-', duration: '-', ctc: '₹4.2 / 6.5 / 11.2 LPA', location: 'Multiple Locations' },
    { company: 'ADP', date: "23rd Apr'2025", cgpa: '6', role: 'Software Development Intern', stipend: '₹30000 / month', duration: '3 Months', ctc: '₹7.50 LPA', location: 'Hyderabad' },
    { company: 'Aditya Birla', date: "24th July'2025", cgpa: '6', role: 'Data Science / Data Engineering Intern', stipend: '₹25000 - ₹30000 / month', duration: '6 Months', ctc: '₹10.00 LPA', location: 'Bengaluru' },
    { company: 'Algo University', date: "22nd April'2025", cgpa: '0', role: 'SWE Intern / Technical Solution Engineer', stipend: '₹30000 - ₹80000 / month', duration: '2 Months', ctc: '₹10.00 - ₹22.00 LPA', location: 'Remote/Hyderabad' },
    { company: 'AntBox', date: "18th Sept'2025", cgpa: '7', role: 'AI & Automation Developer Intern', stipend: '₹25000 / month', duration: '12 Months', ctc: '₹8.00 LPA', location: 'Bhubaneswar' },
    { company: 'AP Moller Maersk', date: "29th May'2025", cgpa: '7', role: 'IT Infrastructure Intern / Jr Test Support Engineer', stipend: '₹50000 / month', duration: '12 Months', ctc: '₹10.83 LPA', location: 'Bengaluru' },
    { company: 'Bain & Company', date: "14th Aug'2025", cgpa: '6', role: 'Intern', stipend: '₹270000 (Total)', duration: '6 Months', ctc: '₹15.68 LPA', location: 'Bengaluru / Gurgaon' },
    { company: 'Blackbaud', date: "23rd Dec'2025", cgpa: '7.5', role: 'Technology Professional', stipend: '-', duration: '-', ctc: '₹12.00 LPA', location: 'Hyderabad' },
    { company: 'BNP Paribas', date: "13th Aug'2025", cgpa: '7', role: 'Intern', stipend: '₹50000 / month', duration: '6 Months', ctc: '₹7.50 LPA', location: 'Bengaluru/Chennai/Mumbai' },
    { company: 'BNY', date: "29th July'2025", cgpa: '7.5', role: 'Intern', stipend: '₹75000 / month', duration: '8 - 10 Weeks', ctc: '₹22.00 LPA', location: 'Pune / Chennai' },
    { company: 'Booking Holdings', date: "14th July'2025", cgpa: '0', role: 'Software Engineer Intern', stipend: '₹75000 / month', duration: '6 Months', ctc: '₹16.20 LPA', location: 'Bengaluru' },
    { company: 'Brillio', date: "9th Jan'2026", cgpa: '6', role: 'Software Engineer', stipend: '₹30000 / month', duration: '6 Months', ctc: '₹15.00 LPA', location: 'Bengaluru' },
    { company: 'Capgemini', date: "2nd Sept'2025", cgpa: '0', role: 'Software Engineer / SAP Consultant', stipend: '-', duration: '-', ctc: '₹4.25 - ₹7.50 LPA', location: 'Multiple Locations' },
    { company: 'Caterpillar', date: "3rd Oct'2025", cgpa: '7.5', role: 'Corporate Intern / Software Engineer', stipend: '₹20000 / month', duration: '6 Months', ctc: '₹14.56 LPA', location: 'Bengaluru / Chennai' },
    { company: 'Cisco', date: "4th June'2025", cgpa: '0', role: 'Software Engineer (Code-a-thon)', stipend: '-', duration: '-', ctc: '₹25.00 LPA', location: 'Bengaluru' },
    { company: 'CME Group', date: "31st July'2025", cgpa: '7', role: 'Intern', stipend: '₹55000 / month', duration: '5-6 Months', ctc: '₹11.00 LPA', location: 'Bengaluru' },
    { company: 'Cognizant', date: "11th Nov'2025", cgpa: '7', role: 'GenC Next / GenC Pro', stipend: '-', duration: '-', ctc: '₹4.00 - ₹6.75 LPA', location: 'Multiple Locations' },
    { company: 'Deloitte', date: "18th Aug'2025", cgpa: '6', role: 'Analyst Technology Consulting', stipend: '-', duration: '-', ctc: '₹7.60 LPA', location: 'Multiple Locations' },
    { company: 'DHL IT Services', date: "19th Dec'2025", cgpa: '7', role: 'Associate Trainee', stipend: '-', duration: '-', ctc: '₹10.00 - 12.00 LPA', location: 'Indore' },
    { company: 'EPAM', date: "8th July'2025", cgpa: '7', role: 'Intern', stipend: '₹30000 / month', duration: '6 Months', ctc: '₹8.50 LPA', location: 'Multiple Locations' },
    { company: 'Equal', date: "30th Aug'2025", cgpa: '8.5', role: 'Full Stack Developer Intern', stipend: '₹35000 - ₹40000 / month', duration: '6 Months', ctc: '₹12.00 - 14.00 LPA', location: 'Hyderabad' },
    { company: 'Ericsson', date: "19th Nov'2025", cgpa: '6', role: 'Intern', stipend: '₹25000 / month', duration: '6 Months', ctc: '₹4.67 LPA', location: 'NCR, Bengaluru' },
    { company: 'EY', date: "13th Dec'2025", cgpa: '6.5', role: 'Senior Analyst Technology Consulting Gen AI', stipend: '-', duration: '-', ctc: '₹6.48 LPA', location: 'Multiple Locations' },
    { company: 'Factset', date: "15th Oct'2025", cgpa: '7', role: 'Software Engineer Intern', stipend: '₹30000 / month', duration: '6 Months', ctc: '₹11.99 LPA', location: 'Hyderabad' },
    { company: 'FICO', date: "3rd July'2025", cgpa: '7', role: 'Education Intern', stipend: '-', duration: '12 Months', ctc: '₹9.00 LPA', location: 'Bengaluru' },
    { company: 'Fractal', date: "31st July'2025", cgpa: '7', role: 'Imagineer Data Science', stipend: '-', duration: '-', ctc: '₹7.50 LPA', location: 'Multiple Locations' },
    { company: 'Goldman Sachs', date: "21st Mar'2025", cgpa: '8.5', role: 'Software Engineer', stipend: '-', duration: '-', ctc: '₹19.75 LPA', location: 'Bengaluru/Hyderabad' },
    { company: 'Hashedin Technologies', date: "12th Sept'2025", cgpa: '8', role: 'Trainee Engineer Intern', stipend: '₹25000 / month', duration: '2 Months', ctc: '₹8.10 LPA', location: 'Bengaluru/Gurgaon' },
    { company: 'HighRadius', date: "20th Mar'2025", cgpa: '0', role: 'Product Development Intern', stipend: '₹22000 / month', duration: '10 Months', ctc: '₹8.00 LPA', location: 'Bhubaneswar' },
    { company: 'Hike', date: "24th July'2025", cgpa: '7.5', role: 'SDE DevOps Intern', stipend: '₹40000 / month', duration: '6-12 Months', ctc: '₹16.73 - ₹42.59 LPA', location: 'Remote' },
    { company: 'Hire Quotient', date: "17th Dec'2025", cgpa: '6.5', role: 'Backend Developer Intern', stipend: '₹40000 - ₹60000 / month', duration: '3 to 6 Months', ctc: '₹12.00 - ₹15.00 LPA', location: 'Bengaluru' },
    { company: 'HyperVerge', date: "18th Dec'2025", cgpa: '6', role: 'Machine/Deep Learning Intern', stipend: '₹45000 / month', duration: '6 Months', ctc: '₹14.00 - ₹18.00 LPA', location: 'Bengaluru' },
    { company: 'IBM Consulting', date: "30th Aug'2025", cgpa: '6', role: 'Associate System Engineer', stipend: '-', duration: '-', ctc: '₹4.50 LPA', location: 'Multiple Locations' },
    { company: 'Info Edge (Naukri)', date: "27th Sept'2025", cgpa: '0', role: 'SDET Intern', stipend: '₹30000 / month', duration: '-', ctc: '₹10.00 LPA', location: 'Noida' },
    { company: 'Infosys', date: "15th Nov'2025", cgpa: '0', role: 'DSE and SP L1/L2/L3', stipend: '-', duration: '-', ctc: '₹7 / 10 / 16 / 21 LPA', location: 'Multiple Locations' },
    { company: 'ION Group', date: "12th July'2025", cgpa: '7.5', role: 'Software Developer / Technical Analyst', stipend: '-', duration: '-', ctc: '₹17.30 LPA', location: 'Multiple Locations' },
    { company: 'JP Morgan Chase', date: "21st Mar'2025", cgpa: '8.5', role: 'Software Engineer', stipend: '-', duration: '-', ctc: '₹19.75 LPA', location: 'Bengaluru/Mumbai' },
    { company: 'Kickdrum', date: "10th Oct'2025", cgpa: '8', role: 'Software Developer', stipend: '₹35000 / month', duration: '6 Months', ctc: '₹15.73 LPA', location: 'Bengaluru' },
    { company: 'KPMG', date: "24th Aug'2025", cgpa: '6', role: 'Intern GovTech / AppsTech / Digital Trust', stipend: '₹20000 / month', duration: '6 Months', ctc: '₹5.00 - ₹6.00 LPA', location: 'Multiple Locations' },
    { company: 'LG Soft', date: "15th May'2025", cgpa: '7', role: 'Intern', stipend: '₹30000 / month', duration: '6 to 10 months', ctc: '₹7.50 LPA', location: 'Bengaluru' },
    { company: 'LTI Mindtree', date: "6th Sept'2025", cgpa: '0', role: 'Graduate Engineer Trainee', stipend: '-', duration: '-', ctc: '₹4.00 LPA', location: 'Multiple Locations' },
    { company: 'Lumber', date: "6th May'2025", cgpa: '8', role: 'Full Stack Developer Intern', stipend: '₹55000 / month', duration: '12 Months', ctc: '₹14.00 LPA', location: 'Bengaluru' },
    { company: 'Maruti Suzuki', date: "29th Oct'2025", cgpa: '6.5', role: 'Graduate Engineer Trainee', stipend: '-', duration: '12 Months (Training)', ctc: '₹12.85 LPA', location: 'Multiple Locations' },
    { company: 'Marvell', date: "25th June'2025", cgpa: '7', role: 'Software Intern', stipend: '₹40000 - ₹55000 / month', duration: '6-11 Months', ctc: '₹14.00 - ₹16.30 LPA', location: 'Mumbai' },
    { company: 'MathCo', date: "11th July'2025", cgpa: '6.5', role: 'Trainee Analyst', stipend: '-', duration: '-', ctc: '₹5.50 - ₹12.50 LPA', location: 'Bengaluru' },
    { company: 'Meesho', date: "30th Aug'2025", cgpa: '6', role: 'Business Analyst Intern', stipend: '₹70000 / month', duration: '6 Months', ctc: '₹23.50 LPA', location: 'Bengaluru' },
    { company: 'Morgan Stanley', date: "24th April'2025", cgpa: '8', role: 'Apprenticeship Program', stipend: '₹87000 / month', duration: '6 Months', ctc: '-', location: 'Mumbai/Bengaluru' },
    { company: 'Mu Sigma', date: "9th Aug'2025", cgpa: '7', role: 'Decision Scientist', stipend: '-', duration: '-', ctc: '₹10 LPA', location: 'Bengaluru' },
    { company: 'NVIDIA', date: "9th Sept'2025", cgpa: '7.8', role: 'System Software Engineering Intern', stipend: '₹80000 / month', duration: '6 Months', ctc: '-', location: 'Pune/Bengaluru' },
    { company: 'NxtWave Edge', date: "14th Nov'2025", cgpa: '0', role: 'Software Development Engineer', stipend: '-', duration: '-', ctc: '₹20.00 - ₹35.00 LPA', location: 'Hyd/Mum/Bengaluru' },
    { company: 'Optum', date: "29th Oct'2024", cgpa: '7', role: 'Technology Development Program Intern', stipend: '₹40000 / month', duration: '10 Weeks', ctc: '₹18.50 LPA', location: 'Gurugram / Hyderabad' },
    { company: 'PeopleStrong', date: "18th Dec'2025", cgpa: '6.5', role: 'Trainee / SDE-1', stipend: '₹50000 / month', duration: '6 Months', ctc: '₹8.00 LPA', location: 'Gurgaon' },
    { company: 'Philips', date: "24th June'2025", cgpa: '7', role: 'Intern', stipend: '₹45000 - ₹55000 / month', duration: '12 Months', ctc: '₹11.50 - ₹12.00 LPA', location: 'Bengaluru' },
    { company: 'Pine Labs', date: "9th April'2025", cgpa: '8', role: 'Software Engineer', stipend: '₹40000 / month', duration: '10 Months', ctc: '₹11.00 LPA', location: 'Multiple Locations' },
    { company: 'PlaySimple Games', date: "2nd Sept'2025", cgpa: '6.5', role: 'Software Engineer Intern', stipend: '₹30000 / month', duration: '12 Months', ctc: '₹14.00 LPA', location: 'Bengaluru' },
    { company: 'Publicis Sapient', date: "24th Sept'2025", cgpa: '8.5', role: 'Trainee Engineer', stipend: '-', duration: '-', ctc: '₹8.47 LPA', location: 'Bengaluru / Gurgaon' },
    { company: 'PwC', date: "13th Nov'2025", cgpa: '6', role: 'Associate One Consulting Advisory', stipend: '₹30000 / month', duration: '-', ctc: '₹5.00 LPA', location: 'Multiple Locations' },
    { company: 'Qualcomm', date: "15th July'2025", cgpa: '6', role: 'IT Intern', stipend: '₹45000 / month', duration: '6 Months', ctc: '₹8.28 LPA', location: 'Multiple Locations' },
    { company: 'Samsung Electro Mechanics', date: "20th May'2025", cgpa: '6', role: 'AI Engineer / Machine Learning Intern', stipend: '₹35000 - ₹40000 / month', duration: '12 Months', ctc: '₹10.00 - ₹12.00 LPA', location: 'Bengaluru' },
    { company: 'Swiggy', date: "2nd Oct'2025", cgpa: '6', role: 'Intern Engineering BE Developer', stipend: '₹40000 / month', duration: '6 Months', ctc: '₹12.00 LPA', location: 'Remote' },
    { company: 'TCS', date: "21st Nov'2025", cgpa: '0', role: 'R&I Research & Innovation', stipend: '-', duration: '-', ctc: '₹9.09 - ₹12.05 LPA', location: 'Multiple Locations' },
    { company: 'Tredence', date: "3rd Sept'2025", cgpa: '6', role: 'Analyst Data Science', stipend: '-', duration: '-', ctc: '₹10.00 - ₹12.00 LPA', location: 'Multiple Locations' },
    { company: 'Trilogy Innovations', date: "2nd Sept'2025", cgpa: '6', role: 'Software Development Engineer', stipend: '₹75000 / month', duration: '6 Months', ctc: '₹30.00 LPA', location: 'Bengaluru' },
    { company: 'UKG', date: "27th Oct'2025", cgpa: '7', role: 'Customer Experience Intern', stipend: '₹30000 / month', duration: '6 Months', ctc: '₹12.74 LPA', location: 'Multiple Locations' },
    { company: 'Veeva Systems', date: "9th Dec'2025", cgpa: '8', role: 'Software Engineer', stipend: '-', duration: '-', ctc: '₹9.00 LPA', location: 'Hyderabad' },
    { company: 'Viasat', date: "9th Oct'2025", cgpa: '7', role: 'Software Engineer Intern', stipend: '₹25000 / month', duration: '3 Months', ctc: '₹9.50 LPA', location: 'Hyderabad' },
    { company: 'Whatfix', date: "30th July'2025", cgpa: '7.5', role: 'Software Engineer', stipend: '₹50000 / month', duration: '12 Months', ctc: '₹16.00 LPA', location: 'Bengaluru' },
    { company: 'YugaByte', date: "3rd July'2025", cgpa: '8.5', role: 'SDET Intern', stipend: '₹80000 / month', duration: '12 Months', ctc: '₹21.00 LPA', location: 'Bengaluru / Pune' },
    { company: 'Zscaler', date: "16th Oct'2025", cgpa: '7.5', role: 'Software Development Intern', stipend: '₹75000 / month', duration: 'May-July 2026', ctc: '-', location: '-' },
    { company: 'ZS Associates', date: "17th Sept'2025", cgpa: '8', role: 'Data Engineer / DevOps Engineer Intern', stipend: '₹40000 / month', duration: '6 Months', ctc: '₹9.00 - ₹10.00 LPA', location: 'Pune' },
];

// Student skill profile for match calculation
const MY_SKILLS = new Set([
    'javascript', 'typescript', 'node.js', 'react', 'postgresql', 'redis',
    'docker', 'python', 'git', 'sql', 'rest apis', 'html', 'css', 'express',
    'problem solving', 'communication'
]);

function calcMatch(skills: string[]): { score: number; missing: string[] } {
    if (skills.length === 0) return { score: 70, missing: [] };
    const missing: string[] = [];
    let matched = 0;
    for (const s of skills) {
        if (MY_SKILLS.has(s.toLowerCase())) {
            matched++;
        } else {
            missing.push(s);
        }
    }
    const score = Math.round((matched / skills.length) * 100);
    return { score: Math.max(30, score), missing };
}

// Generate all jobs from RAW
let _idCounter = 1;
export const KIIT_JOBS: Job[] = RAW.map((row) => {
    const skills = inferSkills(row.role);
    const { score, missing } = calcMatch(skills);
    const type = getType(row.role, row.duration, row.stipend);
    const cgpa = parseCgpa(row.cgpa);
    const id = `kiit_${_idCounter++}`;

    return {
        id,
        company: row.company,
        companyLogo: getInitials(row.company),
        companyColor: getBrandColor(row.company),
        role: row.role,
        location: row.location === '-' ? 'Multiple Locations' : row.location,
        type,
        remote: row.location.toLowerCase().includes('remote'),
        stipend: row.stipend === '-' ? 'Not Disclosed' : row.stipend,
        ctc: row.ctc === '-' ? 'Not Disclosed' : row.ctc,
        duration: row.duration === '-' ? '-' : row.duration,
        minCgpa: cgpa,
        skills,
        openings: Math.floor(Math.random() * 15) + 3,
        applicants: Math.floor(Math.random() * 8000) + 500,
        shortlistRatio: +(Math.random() * 0.01 + 0.001).toFixed(4),
        interviewRounds: Math.floor(Math.random() * 3) + 2,
        matchScore: score,
        missingSkills: missing,
        postedDate: row.date,
        deadline: '2026-04-30',
        source: 'KIIT T&P',
        sourceUrl: 'https://kiitplacements.com',
        verified: true,
        batch: '2025-26',
    };
});

// Also keep a few curated high-profile jobs with different sources
export const FEATURED_JOBS: Job[] = [
    {
        id: 'feat_001',
        company: 'Razorpay',
        companyLogo: 'R',
        companyColor: '#2D6EF5',
        role: 'Backend Engineer Intern',
        location: 'Bangalore',
        type: 'Internship',
        remote: true,
        stipend: '₹1.2L/month',
        ctc: '₹20 LPA',
        duration: '6 Months',
        minCgpa: 7.5,
        skills: ['Node.js', 'PostgreSQL', 'Redis', 'System Design'],
        openings: 12, applicants: 4200, shortlistRatio: 0.003, interviewRounds: 3,
        matchScore: 88, missingSkills: ['System Design'],
        postedDate: "8th Mar'2026", deadline: '2026-04-01',
        source: 'Company Career', sourceUrl: 'https://razorpay.com/jobs',
        verified: true, batch: '2025-26',
    },
    {
        id: 'feat_002',
        company: 'Zepto',
        companyLogo: 'Z',
        companyColor: '#8B5CF6',
        role: 'Full Stack Engineer',
        location: 'Mumbai',
        type: 'Full Time',
        remote: false,
        stipend: '-',
        ctc: '₹18-25 LPA',
        duration: '-',
        minCgpa: 7.0,
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        openings: 20, applicants: 3100, shortlistRatio: 0.006, interviewRounds: 3,
        matchScore: 91, missingSkills: ['MongoDB'],
        postedDate: "5th Mar'2026", deadline: '2026-04-15',
        source: 'LinkedIn', sourceUrl: 'https://linkedin.com/company/zepto',
        verified: true, batch: '2025-26',
    },
    {
        id: 'feat_003',
        company: 'CRED',
        companyLogo: 'C',
        companyColor: '#1A1A2E',
        role: 'Frontend Engineer',
        location: 'Bangalore',
        type: 'Full Time',
        remote: false,
        stipend: '-',
        ctc: '₹22-32 LPA',
        duration: '-',
        minCgpa: 7.5,
        skills: ['React', 'TypeScript', 'Performance Optimization', 'Testing'],
        openings: 5, applicants: 2800, shortlistRatio: 0.002, interviewRounds: 4,
        matchScore: 85, missingSkills: ['Performance Optimization', 'Testing'],
        postedDate: "3rd Mar'2026", deadline: '2026-04-10',
        source: 'Company Career', sourceUrl: 'https://cred.club/jobs',
        verified: true, batch: '2025-26',
    },
];

// Combined sorted by match score
export const ALL_JOBS: Job[] = [...FEATURED_JOBS, ...KIIT_JOBS].sort((a, b) => b.matchScore - a.matchScore);
