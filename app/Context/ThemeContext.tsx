'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Define the Context structure
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create the context with a default (or null) value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Define the Provider Props
interface ThemeProviderProps {
  children: ReactNode;
}

// 4. Create the Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize state with 'dark' as a server-safe default
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // --- Theme Persistence and Initial Load ---
  useEffect(() => {
    // This runs only client-side
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
    
    setTheme(initialTheme);
    
    // Crucial step for Tailwind: Set the 'dark' class on the HTML element
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // --- Toggle Function ---
  const toggleTheme = () => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Crucial step for Tailwind: Toggle the 'dark' class on the HTML element
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5. Custom hook for easy consumption
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};