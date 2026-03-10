import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { saveProfile, DEMO_PROFILE } from './profileStore';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    provider: 'email' | 'google' | 'github';
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    loginWithGithub: () => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'hiremap_users';
const SESSION_KEY = 'hiremap_session';

// ─── Owner account ────────────────────────────────────────────────────────────
// Clicking "Google" on the auth page maps to this real email + loads full profile.
const OWNER_EMAIL = 'sriharibeesetti@gmail.com';
const OWNER_USER_ID = 'srihari_owner';

function ensureOwnerProfile() {
    const raw = localStorage.getItem('hiremap_profiles');
    const profiles = raw ? JSON.parse(raw) : {};
    if (!profiles[OWNER_USER_ID]) {
        saveProfile(OWNER_USER_ID, { ...DEMO_PROFILE, onboardingComplete: true });
    }
}
// ─────────────────────────────────────────────────────────────────────────────

function getUsers(): Record<string, { password: string; user: User }> {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    } catch {
        return {};
    }
}

function saveUsers(users: Record<string, { password: string; user: User }>) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): User | null {
    try {
        const s = localStorage.getItem(SESSION_KEY);
        return s ? JSON.parse(s) : null;
    } catch {
        return null;
    }
}

function saveSession(user: User | null) {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ensureOwnerProfile();
        const session = getSession();
        setUser(session);
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        await new Promise(r => setTimeout(r, 600));
        const users = getUsers();
        const key = email.toLowerCase();
        if (!users[key]) return { success: false, error: 'No account found with this email.' };
        if (users[key].password !== btoa(password)) return { success: false, error: 'Incorrect password.' };
        const loggedIn = users[key].user;
        setUser(loggedIn);
        saveSession(loggedIn);
        return { success: true };
    };

    const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        await new Promise(r => setTimeout(r, 700));
        if (!name.trim()) return { success: false, error: 'Please enter your name.' };
        if (!email.includes('@')) return { success: false, error: 'Please enter a valid email.' };
        if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
        const users = getUsers();
        const key = email.toLowerCase();
        if (users[key]) return { success: false, error: 'An account with this email already exists.' };
        const newUser: User = {
            id: `user_${Date.now()}`,
            name: name.trim(),
            email: key,
            provider: 'email',
            createdAt: new Date().toISOString(),
        };
        users[key] = { password: btoa(password), user: newUser };
        saveUsers(users);
        setUser(newUser);
        saveSession(newUser);
        return { success: true };
    };

    // ── Google sign-in ────────────────────────────────────────────────────────
    // The "Google" button on the auth page always signs in as the owner account
    // (sriharibeesetti@gmail.com) and loads the full Srihari profile from
    // profileStore. In production this would use the real Google OAuth flow.
    const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
        await new Promise(r => setTimeout(r, 800));
        ensureOwnerProfile();
        const ownerUser: User = {
            id: OWNER_USER_ID,
            name: 'Srihari Beesetti',
            email: OWNER_EMAIL,
            avatar: 'https://github.com/Srihari1806.png',
            provider: 'google',
            createdAt: '2026-01-01T00:00:00Z',
        };
        setUser(ownerUser);
        saveSession(ownerUser);
        return { success: true };
    };
    // ─────────────────────────────────────────────────────────────────────────

    const loginWithGithub = async (): Promise<{ success: boolean; error?: string }> => {
        await new Promise(r => setTimeout(r, 800));
        const mockUser: User = {
            id: `github_${Date.now()}`,
            name: 'GitHub User',
            email: 'github@hiremap.io',
            provider: 'github',
            createdAt: new Date().toISOString(),
        };
        setUser(mockUser);
        saveSession(mockUser);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        saveSession(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, loginWithGithub, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
