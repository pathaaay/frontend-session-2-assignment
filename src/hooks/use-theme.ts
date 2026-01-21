import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("You are using useTheme outside of the ThemeProvider");

  return context;
};

export default useTheme;
