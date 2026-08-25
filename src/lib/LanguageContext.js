"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("portfolio-lang");
    if (storedLang === "en" || storedLang === "id") {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang) => {
    if (lang === "en" || lang === "id") {
      setLanguageState(lang);
      localStorage.setItem("portfolio-lang", lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
