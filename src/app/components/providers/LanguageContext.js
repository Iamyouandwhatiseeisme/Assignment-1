"use client";
import { usePathname } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const localeContext = createContext();
let locales = ["en-US", "ka"];

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState();
  const pathname = usePathname();

  useEffect(() => {
    let currentLocale = locales.find((locale) =>
      pathname.includes(`/${locale}`)
    );
    setLocale(currentLocale);
  }, [locale]);

  return (
    <localeContext.Provider value={{ locale, setLocale }}>
      {children}
    </localeContext.Provider>
  );
};

export const useLocale = () => useContext(localeContext);