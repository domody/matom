// To use:
// 1. Import ThemeContext into desired component
// 2. Create useContext variable with theme and setTheme, as so:  const { theme, updateTheme } = useContext(ThemeContext);
// 'theme' is now a useable variable which can be used to determine the theme of the app, see Navbar.js for an example
// updateTheme("light/dark") can be used to change the theme of the app, though I dont see much usecase outside Navbar.js. Still required to create updateTheme variable when creating the useContext(ThemeContext) varaible.

"use client";
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
