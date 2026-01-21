import { createContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const initialValue: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
};

export const ThemeContext = createContext(initialValue);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(initialValue.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme as ThemeType);
    else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.matches) setTheme("dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const localTheme = localStorage.getItem("theme");
    if (localTheme !== theme) localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
