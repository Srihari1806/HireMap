import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { saveProfile, DEMO_PROFILE, hasProfile } from './profileStore';
import { auth, googleProvider, githubProvider } from './firebase';
import { FirebaseError } from 'firebase/app';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';

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

const OWNER_EMAIL = 'sriharibeesetti@gmail.com';
const OWNER_USER_ID = 'srihari_owner';

async function ensureOwnerProfile() {
    const exists = await hasProfile(OWNER_USER_ID);
    if (!exists) {
        await saveProfile(OWNER_USER_ID, { ...DEMO_PROFILE, onboardingComplete: true });
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ensureOwnerProfile();
        // Listen to Firebase Auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // If it's Srihari's email, map it directly to the predefined OWNER_USER_ID 
                // so your demo profile data is loaded perfectly.
                const isOwner = firebaseUser.email === OWNER_EMAIL;

                setUser({
                    id: isOwner ? OWNER_USER_ID : firebaseUser.uid,
                    name: firebaseUser.displayName || 'Student',
                    email: firebaseUser.email || '',
                    avatar: firebaseUser.photoURL || undefined,
                    provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' :
                        firebaseUser.providerData[0]?.providerId === 'github.com' ? 'github' : 'email',
                    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString()
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            let msg = 'Login failed.';
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    msg = 'Invalid email or password.';
                }
            }
            return { success: false, error: msg };
        }
    };

    const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        if (!name.trim()) return { success: false, error: 'Please enter your name.' };
        if (!email.includes('@')) return { success: false, error: 'Please enter a valid email.' };
        if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCred.user, { displayName: name.trim() });

            if (email === OWNER_EMAIL) {
                ensureOwnerProfile();
            }

            return { success: true };
        } catch (error) {
            let msg = 'Signup failed.';
            if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
                msg = 'An account with this email already exists.';
            }
            return { success: false, error: msg };
        }
    };

    const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
        try {
            // Actual Google OAuth popup
            const userCred = await signInWithPopup(auth, googleProvider);

            // Ensure data populates for owner
            if (userCred.user.email === OWNER_EMAIL) {
                ensureOwnerProfile();
            }
            return { success: true };
        } catch (error) {
            console.error(error);
            let msg = 'Google sign-in failed.';
            if (error instanceof FirebaseError && error.code === 'auth/popup-closed-by-user') {
                msg = 'Sign-in popup was closed.';
            } else {
                msg += ' Ensure Firebase config is added in .env';
            }
            return { success: false, error: msg };
        }
    };

    const loginWithGithub = async (): Promise<{ success: boolean; error?: string }> => {
        try {
            await signInWithPopup(auth, githubProvider);
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error: 'GitHub sign-in failed. Ensure config is added in .env' };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error', error);
        }
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
