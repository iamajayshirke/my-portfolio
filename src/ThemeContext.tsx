import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'emerald' | 'purple';

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  colorTheme: Theme;
  setColorTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [colorTheme, setColorTheme] = useState<Theme>('default');

  useEffect(() => {
    // Toggle Dark Class
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    // Set Data Attribute for Color Theme
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [isDark, colorTheme]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark: () => setIsDark(!isDark), colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};