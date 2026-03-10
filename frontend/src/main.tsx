import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './lib/auth';
import { ToastProvider } from './lib/toast';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ToastProvider>
                <App />
            </ToastProvider>
        </AuthProvider>
    </StrictMode>
);
