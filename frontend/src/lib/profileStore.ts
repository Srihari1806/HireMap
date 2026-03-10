// Per-user profile data store backed by localStorage.
// Srihari's data (MOCK_STUDENT) is the demo/example profile shown to new users.

export interface Project {
    id: string;
    name: string;
    desc: string;
    skills: string[];
    link: string;
    stars: number;
}

export interface UserProfile {
    // Basic Info
    name: string;
    username: string;
    college: string;
    branch: string;
    cgpa: string;
    graduationYear: string;
    location: string;
    bio: string;
    // Coding Profiles
    github: string;
    leetcode: string;
    codeforces: string;
    hackerrank: string;
    // Skills
    skills: string[];
    // Career Intent
    targetRole: string;
    preferredLocation: string;
    jobFocus: string;
    weeklyHours: string;
    openToRelocate: boolean;
    // Projects
    projects: Project[];
    // Stats (auto-synced simulation)
    readinessScore: number;
    streak: number;
    badges: string[];
    leetcodeSolved: number;
    contestRating: number;
    githubCommits: number;
    publicRepos: number;
    // Meta
    onboardingComplete: boolean;
    createdAt: string;
}



export const DEFAULT_PROFILE: UserProfile = {
    name: '',
    username: '',
    college: '',
    branch: '',
    cgpa: '',
    graduationYear: '',
    location: '',
    bio: '',
    github: '',
    leetcode: '',
    codeforces: '',
    hackerrank: '',
    skills: [],
    targetRole: '',
    preferredLocation: '',
    jobFocus: 'Full Time',
    weeklyHours: '10',
    openToRelocate: true,
    projects: [],
    readinessScore: 40,
    streak: 0,
    badges: [],
    leetcodeSolved: 0,
    contestRating: 0,
    githubCommits: 0,
    publicRepos: 0,
    onboardingComplete: false,
    createdAt: new Date().toISOString(),
};

// Srihari's data — pinned as the example/demo profile
export const DEMO_PROFILE: UserProfile = {
    name: 'Srihari Beesetti',
    username: 'srihari1806',
    college: 'KIIT University, Bhubaneswar',
    branch: 'CSE',
    cgpa: '8.4',
    graduationYear: '2027',
    location: 'Bhubaneswar, Odisha',
    bio: 'Final year CSE student building scalable systems. Open to SDE and backend roles.',
    github: 'Srihari1806',
    leetcode: 'srihari1806',
    codeforces: '',
    hackerrank: 'srihari1806',
    skills: ['JavaScript', 'TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Python', 'DSA'],
    targetRole: 'Backend / Full-stack SDE',
    preferredLocation: 'Bangalore, Remote',
    jobFocus: 'Full Time + Internship',
    weeklyHours: '20',
    openToRelocate: true,
    projects: [
        { id: 'p1', name: 'HireMap', desc: 'Talent Intelligence Platform – React, Node, PostgreSQL, Redis', skills: ['React', 'Node.js', 'PostgreSQL', 'Redis'], stars: 42, link: 'https://github.com/Srihari1806/HireMap' },
        { id: 'p2', name: 'DSA Tracker', desc: 'Personal Dashboard for tracking DSA progress visually', skills: ['React', 'TypeScript'], stars: 18, link: '#' },
        { id: 'p3', name: 'MiniDB', desc: 'Toy SQL database engine written in Python', skills: ['Python'], stars: 9, link: '#' },
    ],
    readinessScore: 78,
    streak: 14,
    badges: ['Top 10%', '100 Days', 'Open Source'],
    leetcodeSolved: 130,
    contestRating: 1642,
    githubCommits: 782,
    publicRepos: 18,
    onboardingComplete: true,
    createdAt: '2026-01-01T00:00:00Z',
};

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function getProfile(userId: string): Promise<UserProfile> {
    try {
        const docRef = doc(db, 'profiles', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { ...DEFAULT_PROFILE, ...(docSnap.data() as Partial<UserProfile>) };
        }
    } catch (e) {
        console.error("Firebase getProfile error:", e);
    }
    return { ...DEFAULT_PROFILE };
}

export async function saveProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    try {
        const docRef = doc(db, 'profiles', userId);
        const docSnap = await getDoc(docRef);
        const existing = docSnap.exists() ? docSnap.data() : { ...DEFAULT_PROFILE };
        const updated = { ...existing, ...profile };
        await setDoc(docRef, updated);
        return updated as UserProfile;
    } catch (e) {
        console.error("Firebase saveProfile error:", e);
        return { ...DEFAULT_PROFILE, ...profile } as UserProfile;
    }
}

export async function hasProfile(userId: string): Promise<boolean> {
    try {
        const docRef = doc(db, 'profiles', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() && !!docSnap.data().onboardingComplete;
    } catch (e) {
        return false;
    }
}

// Simulate a readiness score based on filled data
export function calcReadiness(p: UserProfile): number {
    let score = 20;
    if (p.github) score += 10;
    if (p.leetcode) score += 10;
    if (p.leetcodeSolved >= 50) score += 10;
    if (p.leetcodeSolved >= 100) score += 10;
    if (p.skills.length >= 3) score += 8;
    if (p.skills.length >= 6) score += 7;
    if (p.projects.length >= 1) score += 10;
    if (p.projects.length >= 2) score += 5;
    if (p.cgpa && parseFloat(p.cgpa) >= 7) score += 5;
    if (p.bio && p.bio.length > 20) score += 5;
    return Math.min(score, 100);
}
