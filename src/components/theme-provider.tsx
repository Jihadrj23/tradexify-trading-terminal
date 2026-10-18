import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({ theme: 'dark', setTheme: () => {} });
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => { const saved = localStorage.getItem('tradexify-theme'); if (saved === 'light' || saved === 'dark') setTheme(saved); }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('tradexify-theme', theme); }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
