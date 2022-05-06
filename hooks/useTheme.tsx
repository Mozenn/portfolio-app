import { createContext, useContext } from 'react';
import useLocalStorage from './useLocalStorage';

interface ThemeContextInterface {
  theme: any;
  setTheme: any;
  toggleTheme: () => void;
  getFilterClass: () => string;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined
);

const ThemeProvider = ({
  children,
  initTheme = 'light',
}: {
  children: React.ReactNode;
  initTheme?: string;
}) => {
  const [theme, setTheme] = useLocalStorage('theme', initTheme, true);

  const toggleTheme = () => {
    const newTheme = theme == 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('darkTheme');
  };

  const getFilterClass = () => {
    return theme === 'light' ? 'lightFilter' : 'darkFilter';
  };

  const value: ThemeContextInterface = {
    theme,
    setTheme,
    toggleTheme,
    getFilterClass,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeContext');
  }
  return context;
};

export { ThemeProvider, ThemeContext, useTheme };
