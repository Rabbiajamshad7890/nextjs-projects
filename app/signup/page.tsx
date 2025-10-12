"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// ========================================================================
// --- GLOBAL FIREBASE VARIABLES (Mandatory Canvas Environment Setup)
// ========================================================================
// These are available in the runtime environment
declare const __firebase_config: string;
declare const __initial_auth_token: string;
declare const __app_id: string;


// ========================================================================
// --- TYPE DEFINITIONS
// ========================================================================

type Theme = 'light' | 'dark';

interface AuthError {
    code: string;
    message: string;
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// ------------------------------------------------------------------------
// --- THEME CONTEXT DEFINITION (Required for a single-file React app)
// ------------------------------------------------------------------------
// Defining the ThemeContext and useTheme hook to make the file self-contained.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        // Fallback: If the App is somehow rendered outside the provider, default to dark theme.
        return { theme: 'dark', toggleTheme: () => console.warn('Theme context not provided.') };
    }
    return context;
};

// ------------------------------------------------------------------------
// --- MAIN APP COMPONENT (Renamed from SignupPage to App)
// ------------------------------------------------------------------------

const App: React.FC = () => {
    // 1. Theme and State
    const { theme } = useTheme(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSigningUp, setIsSigningUp] = useState(false);
    
    // 2. State for Firebase instances
    const [authInstance, setAuthInstance] = useState<Auth | null>(null);
    const [dbInstance, setDbInstance] = useState<Firestore | null>(null);
    const [isServiceLoading, setIsServiceLoading] = useState(true);

    // 3. Initialize Firebase Client-Side and perform initial auth
    useEffect(() => {
        setIsServiceLoading(true); 
        
        if (typeof __firebase_config !== 'undefined') {
            try {
                const firebaseConfig = JSON.parse(__firebase_config);
                const app: FirebaseApp = initializeApp(firebaseConfig);
                
                const auth: Auth = getAuth(app);
                const db: Firestore = getFirestore(app);

                // Initial authentication for environment setup (not the signup flow itself)
                const initializeAuth = async () => {
                    try {
                        if (typeof __initial_auth_token !== 'undefined') {
                            await signInWithCustomToken(auth, __initial_auth_token);
                        } else {
                            await signInAnonymously(auth);
                        }
                    } catch (authError) {
                         console.error("Initial Auth Error:", authError);
                    }
                }
                
                initializeAuth();
                
                setAuthInstance(auth);
                setDbInstance(db);

                console.log("Firebase services initialized.");
                
            } catch (e) {
                console.error("Error initializing Firebase:", e);
                setError("Failed to initialize authentication services. Check console for details.");
            }
        } else {
            console.warn("Canvas Firebase configuration not found. Signup functionality is disabled.");
        }
        
        setIsServiceLoading(false);
        
    }, []); 

    // 4. Theme-dependent styling logic
    const bgColor = theme === 'dark' ? 'bg-[#0d0617]' : 'bg-gray-50';
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const cardBg = theme === 'dark' ? 'bg-[#1a0f2b] border border-purple-700/50' : 'bg-white shadow-lg border border-gray-200';
    const inputStyle = theme === 'dark' ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-500' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400';
    
    // isReady is TRUE only if auth instance is non-null AND the initial loading phase is complete.
    const isReady = authInstance !== null && !isServiceLoading;
    const isDisabled = isSigningUp || !isReady;


    // 5. Handle form submission (The core signup function)
    const handleSubmit = async (e: React.FormEvent) => {
        // CRITICAL FIX: Ensure default form submission is prevented
        e.preventDefault(); 
        
        setError(null);
        setSuccessMessage(null); 

        // Check if authentication service is ready and basic validation passes
        if (!authInstance) {
            setError("Authentication service is not ready. Please try again.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setIsSigningUp(true);

        try {
            console.log('Attempting createUserWithEmailAndPassword...'); 
            
            // Firebase Signup using the initialized auth instance
            const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            
            const userId = userCredential.user.uid;
            console.log('Signup Successful! User:', userId);
            
            setSuccessMessage(`Success! Account created for user ID: ${userId}.`); 
            
            // Clear inputs after successful signup
            setEmail('');
            setPassword('');
            
        } catch (err) {
            console.log('Signup failed, entering catch block.'); 
            const firebaseError = err as AuthError;

            if (firebaseError.code) {
                console.error('Signup Error Code:', firebaseError.code); 
                // Display user-friendly errors
                if (firebaseError.code === 'auth/email-already-in-use') {
                    setError('This email address is already in use. Try logging in instead.');
                } else if (firebaseError.code === 'auth/weak-password') {
                    setError('The password is too weak. Please use 8 or more characters.');
                } else if (firebaseError.code === 'auth/invalid-email') {
                    setError('The email address format is invalid.');
                } else {
                    setError(`Signup failed: ${firebaseError.message}`);
                }
            } else {
                console.error('An unexpected error occurred:', err);
                setError('An unexpected error occurred during signup.');
            }
        } finally {
            console.log('--- Signup process finished ---'); 
            setIsSigningUp(false);
        }
    };

    return (
        <main className={`min-h-screen ${bgColor} ${textColor} flex items-center justify-center py-12 transition-colors duration-500 font-sans p-4`}>
            <div className={`w-full max-w-md p-8 rounded-xl ${cardBg} transition-all duration-500`}>
                <h1 className="text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Create Your Account
                </h1>
                <p className={`text-center mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Start your journey with us today.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${inputStyle}`}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Min 8 characters"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${inputStyle}`}
                        />
                    </div>

                    {/* Display Error Message */}
                    {error && (
                        <div className="mb-4 p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg dark:bg-red-900/50 dark:text-red-300 transition duration-300">
                            {error}
                        </div>
                    )}

                    {/* Display Success Message */}
                    {successMessage && (
                        <div className="mb-4 p-3 text-sm font-medium text-green-700 bg-green-100 rounded-lg dark:bg-green-900/50 dark:text-green-300 transition duration-300">
                            {successMessage}
                        </div>
                    )}
                    
                    <button
                        type="submit"
                        disabled={isDisabled} // Button is disabled if signing up or service isn't ready
                        className={`w-full py-3 text-lg font-bold rounded-lg shadow-xl text-white 
                                   bg-gradient-to-r from-blue-500 to-purple-600 
                                   transition duration-300 transform 
                                   ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-400 hover:to-purple-500 hover:scale-[1.01]'}`}
                    >
                        {
                            !isReady && isServiceLoading ? 'Loading Service...' :
                            isSigningUp ? (
                                <div className="flex justify-center items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing Up...
                                </div>
                            ) : (
                                'Sign Up'
                            )
                        }
                    </button>
                </form>
            </div>
        </main>
    );
};

// Set displayName for better debugging/linting
App.displayName = 'SignupFormApp';

// Default export wrapper to provide the ThemeContext
const Root = () => {
    // Note: Since this is a standalone file, we define theme state here for demonstration
    const [theme, setTheme] = useState<Theme>('dark'); 

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const contextValue: ThemeContextType = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={contextValue}>
            <App />
        </ThemeContext.Provider>
    );
};

export default Root;
