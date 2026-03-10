import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project configuration
// To get these:
// 1. Go to console.firebase.google.com
// 2. Create a project
// 3. Add a Web App to the project
// 4. Enable "Google" and "Email/Password" in Build -> Authentication -> Sign-in method
// 5. In Firebase Auth Settings -> Authorized domains, add 'srihari1806.github.io'
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDTPMItb9kK3g8kzjpT7uH08ghDTdgx96Y",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hiremap-5b45c.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hiremap-5b45c",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hiremap-5b45c.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "600825653181",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:600825653181:web:46df61a34356997f3914d4",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CPQ982DCM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
